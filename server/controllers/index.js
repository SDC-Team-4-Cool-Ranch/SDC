const db = require('../models');

const controllers = {
  fetchReviews: (req, res) => {
    if (!req.query.product_id) {
      res.sendStatus(400);
      return;
    }

    db.fetchReviews(req.query)
      .then(reviews => res.status(200).send(JSON.stringify(reviews)))
      .catch(err => {
        console.error('error fetching reviews: ', err);
        res.sendStatus(500);
      });
  },

  fetchMeta: (req, res) => {
    if (!req.query.product_id) {
      res.sendStatus(400);
      return;
    }

    db.fetchMeta(req.query.product_id)
      .then(meta => res.status(200).send(JSON.stringify(meta)))
      .catch(err => {
        console.error('error fetching meta: ', err);
        res.sendStatus(500);
      });
  },

  addReview: (req, res) => {
    if (!req.body.product_id) {
      res.sendStatus(400);
      return;
    }

    db.addReview(req.body)
      .then(() => res.sendStatus(201))
      .catch(err => {
        console.error('error adding new review: ', err);
        res.sendStatus(500);
      });
  },

  markHelpful: (req, res) => {
    if (!req.params.review_id) {
      res.sendStatus(400);
      return;
    }

    db.markHelpful(req.params.review_id)
      .then(() => res.sendStatus(204))
      .catch(err => {
        console.error('error marking helpful: ', err);
        res.sendStatus(500);
      });
  },

  reportReview: (req, res) => {
    if (!req.params.review_id) {
      res.sendStatus(400);
      return;
    }

    db.reportReview(req.params.review_id)
      .then(() => res.sendStatus(204))
      .catch(err => {
        console.error('error reporting review: ', err);
        res.sendStatus(500);
      });
  }
}

module.exports = controllers;
