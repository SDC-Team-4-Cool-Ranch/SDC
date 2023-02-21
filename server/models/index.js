//CREATE DATABASE CONNECTION
const { Client } = require('pg');
const conn = new Client({
  user: 'jerrodvarney',
  host: 'localhost',
  database: 'sdc',
  password: '',
  port: 5432
});
conn.connect((err) => {
  if (err) console.error('error connecting to database: ', err);
  else console.log('connected');
});



const db = {
  fetchReviews: async ({ id, page = 1, count = 5, sort = 'newest' }) => {
    ///////  NOT DONE YET, NEED TO IMPLEMENT PHOTO FETCHING
    const reviewQuery = `SELECT * FROM reviews WHERE product_id = ${id} AND reported = false`;
    const reviews = await conn.query(reviewQuery);

    return reviews.rows;
  },

  fetchMeta: async (id) => {

  },

  addReview: async (product_id, rating, summary, body, recommend, name, email, photos, characteristics) => {
    /////// NOT DONE YET NEED TO IMPLEMENT ADDING PHOTOS AND CHARACTERISTICS
    const date = new Date();
    const mainQuery =
    `INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, helpfulness)
    VALUES (${product_id}, ${rating}, ${date}, ${summary}, ${body}, ${recommend}, ${name}, ${email}, 0)`;
  },

  markHelpful: async (id) => {
    const query = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${id}`;
    const result = await conn.query(query);

    //throws error if update failed
    if (result.rowCount !== 1) {
      throw new Error;
    }
  },

  reportReview: async (id) => {
    const query = `UPDATE reviews SET reported = true WHERE id = ${id}`;
    const result = await conn.query(query);

    //throws error if update failed
    if (result.rowCount !== 1) {
      throw new Error;
    }
  }
};

module.exports = db;
