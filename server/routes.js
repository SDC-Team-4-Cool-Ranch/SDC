const router = require('express').Router();
const controllers = require('./controllers');

// HTTP ROUTE HANDLERS
router.get('/reviews', controllers.fetchReviews);
router.get('/reviews/meta', controllers.fetchMeta);
router.post('/reviews', controllers.addReview);
router.put('/reviews/:review_id/helpful', controllers.markHelpful);
router.put('/reviews/:review_id/report', controllers.reportReview);

module.exports = router;
