const { Transform } = require('stream');
const { unparse } = require('papaparse');

///// HEADERS /////
const photos = ['id', 'review_id', 'url'];
const chars = ['id', 'product_id', 'name'];
const char_data = ['id', 'characteristic_id', 'review_id', 'value'];
const reviews = [
  'id',
  'product_id',
  'rating',
  'date',
  'summary',
  'body',
  'recommend',
  'reported',
  'reviewer_name',
  'reviewer_email',
  'response',
  'helpfulness'
];

///// JSON TO CSV STREAM /////
const jsonToCsv = new Transform({
  writableObjectmode: true,
  transform(chunk, encoding, cb) {
    try {
      const parser = new Parser({ fields: chars });
      const csv = parser.parse(JSON.stringify(chunk));
      cb(null, csv);
    } catch (err) {
      cb(err);
    }
  }
});

module.exports = jsonToCsv;
