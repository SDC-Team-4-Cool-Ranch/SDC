const conn = require('../db/config.js');

module.exports = {
  fetchReviews: async ({ product_id, page = 1, count = 5, sort = 'newest' }) => {
    // doesnt sort or get correct page/count
    const query = `
      SELECT
        jsonb_build_object(
          'product_id', ${product_id},
          'page', ${page},
          'count', ${count},
          'results', (
            SELECT jsonb_agg(
              jsonb_build_object(
                'review_id', r.id,
                'rating', r.rating,
                'date', to_char(to_timestamp(r.date / 1000), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
                'summary', r.summary,
                'body', r.body,
                'recommend', r.recommend,
                'reviewer_name', r.reviewer_name,
                'response', r.response,
                'helpfulness', r.helpfulness,
                'photos', (
                  SELECT jsonb_agg(
                    jsonb_build_object(
                      'id', p.id,
                      'url', p.url
                    )
                  ) FROM photos p WHERE p.review_id = r.id
                )
              )
            ) FROM reviews r
              WHERE r.product_id = ${product_id}
              AND reported = false
          )
        ) AS result`;

    const { rows } = await conn.query(query);
    const reviews = rows[0].result

    if (!reviews.results) {
      rows[0].result.results = [];
    }

    //need to make it slice for proper page and count - also need to implement sorting
    count >= reviews.results.length ? reviews.count = reviews.results.length: null;

    // fix null value for photos
    reviews.results.map(review => {
      if (!review.photos) {
        review.photos = [];
      }
    });

    return reviews;
  },

  fetchMeta: async (product_id) => {
    const ratingQuery = `SELECT rating, count(*) FROM reviews WHERE product_id = ${product_id} GROUP BY rating`;
    const recommendQuery = `SELECT recommend, count(*) FROM reviews WHERE product_id = ${product_id} GROUP BY recommend`;
    const charQuery = `
      SELECT c.name, c.id, ROUND(AVG(cv.value), 4)
      FROM characteristics AS c
      INNER JOIN char_values AS cv
      ON c.id = cv.characteristic_id
      WHERE c.product_id = ${product_id}
      GROUP BY c.name, c.id`;

      const ratings = await conn.query(ratingQuery);
      const reco = await conn.query(recommendQuery);
      const chars = await conn.query(charQuery);

    // build meta object to send to client
    const metaFormatted = {
      product_id: product_id,
      ratings: {},
      recommended: {0: 0, 1: 0},
      characteristics: {}
    };

    ratings.rows.map(val => {
      metaFormatted.ratings[val.rating] = val.count;
    });

    reco.rows.map(val => {
      if (val.recommend === false) metaFormatted.recommended['0'] = val.count;
      if (val.recommend === true) metaFormatted.recommended['1'] = val.count;
    });

    chars.rows.map(info => {
      metaFormatted.characteristics[info.name] = {};
      metaFormatted.characteristics[info.name].id = info.id;
      metaFormatted.characteristics[info.name].value = info.round;
    });

    return metaFormatted;
  },

  addReview: async ({ product_id, rating, summary, body, recommend, name, email, photos, characteristics }) => {
    try {
      await conn.query('BEGIN');

      const date = Date.now();
      const query = `
        INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
        VALUES (${product_id}, ${rating}, ${date}, '${summary}', '${body}', ${recommend}, '${name}', '${email}')
        RETURNING id`;

      const reviewResult = await conn.query(query);
      const reviewId = reviewResult.rows[0].id;

      for (let photo of photos) {
        await conn.query(`INSERT INTO photos (review_id, url) VALUES (${reviewId}, '${photo}')`);
      };

      for (const [charName, charValue] of Object.entries(characteristics)) {
        const charQuery = `
          INSERT INTO characteristics (product_id, name)
          VALUES (${product_id}, '${charName}')
          RETURNING id`;
        const charResult = await conn.query(charQuery);
        const charId = charResult.rows[0].id;

        await conn.query(`INSERT INTO char_values (characteristic_id, review_id, value)
          VALUES (${charId}, ${reviewId}, ${charValue})`);
      }

      await conn.query('COMMIT');
    } catch (error) {
      await conn.query('ROLLBACK');
      throw error;
    }
  },

  markHelpful: (review_id) => {
    const query = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`;
    return conn.query(query);
  },

  reportReview: (review_id) => {
    const query = `UPDATE reviews SET reported = true WHERE id = ${review_id}`;
    return conn.query(query);
  }
};
