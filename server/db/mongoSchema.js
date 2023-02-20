const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = 'mongodb://localhost/sdc';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to database!'))
  .catch((err) => console.error('error connecting to database: ', err));

const ReviewMeta = new Schema({
  product_id: {type: Number, unique: true},
  recommended: {
    'false': Number,
    'true': Number,
  },
  ratings: {
      1: Number,
      2: Number,
      3: Number,
      4: Number,
      5: Number,
  },
  characteristics: {
    size: {
      id: {type: Number, unique: true},
      value: Number,
    },
    width: {
      id: {type: Number, unique: true},
      value: Number,
    },
    comfort: {
      id: {type: Number, unique: true},
      value: Number,
    },
    quality: {
      id: {type: Number, unique: true},
      value: Number,
    },
    length: {
      id: {type: Number, unique: true},
      value: Number,
    },
    fit: {
      id: {type: Number, unique: true},
      value: Number,
    },
  },
});

const Reviews = new Schema({
  id: {type: Number, unique: true},
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  photos: Array,
});

const ReviewMetaModel = mongoose.model('ReviewMeta', ReviewMeta);
const ReviewsModel = mongoose.model('Reviews', Reviews);

// module.exports = db;

