const { Transform, pipeline } = require('stream');
const csv = require('csvtojson');
const fs = require('fs');

///// PARSES CSV TO JSON /////
const parser = csv();

///// READ AND WRITE STREAMS /////
const input = fs.createReadStream('../original/reviews.csv');
const output = fs.createWriteStream('../cleaned/reviews.ndjson');

///// TRANSFORM FUNCTION /////
const transformOneReview = (review) => {
  review = JSON.parse(review);

  //remove and trim whitespace depending on property value
  review.id = Number(review.id.replace(/\s/g, ''));
  review.product_id = Number(review.product_id.replace(/\s/g, ''));
  review.rating = Number(review.rating.replace(/\s/g, ''));
  review.date = Number(review.date.replace(/\s/g, ''));
  review.summary = review.summary.trim();
  review.body = review.body.trim();
  review.recommend = review.recommend.replace(/\s/g, '');
  review.reported = review.reported.replace(/\s/g, '');
  review.reviewer_name = review.reviewer_name.trim();
  review.reviewer_email = review.reviewer_email.replace(/\s/g, '');
  review.response = review.response.trim();
  review.helpfulness = Number(review.helpfulness.replace(/\s/g, ''));

  //ensure boolean values are in place
  if (review.recommend === 'true') review.recommend = true;
  else if (review.recommend === 'false') review.recommend = false;
  else review.recommend = false;

  if (review.reported === 'true') review.reported = true;
  else if (review.reported === 'false') review.reported = false;
  else review.reported = false;

  if (!review.response.length) review.response = null;
  else if (review.response === 'null') review.response = null;

  const cleaned = `${JSON.stringify(review)}\n`;
  return cleaned;
};

///// TRANSFORM STREAM /////
const transformReviews = new Transform({
  transform(review, encoding, cb) {
    try {
      const cleanedReview = transformOneReview(review);
      cb(null, cleanedReview);
    } catch (err) {
      cb(err);
    }
  }
});

///// RUN THE PIPELINE TO TRANSFORM DATA /////
pipeline(input, parser, transformReviews, output, err => {
  if (err) {
    console.error('error in reviews pipeline: ', err);
  } else {
    console.log('finished: reviews pipeline');
  }
})
