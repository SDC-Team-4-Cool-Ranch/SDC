const { Transform, pipeline } = require('stream');
const csv = require('csvtojson');
const fs = require('fs');

///// PARSES CSV TO JSON /////
const parser = csv();

///// READ AND WRITE STREAMS /////
const input = fs.createReadStream('../original/char_data.csv');
const output = fs.createWriteStream('../cleaned/char_data.ndjson');

///// TRANSFORM FUNCTION /////
const transformOneChar = (char) => {
  char = JSON.parse(char);

  //remove any whitespace
  char.id = Number(char.id.replace(/\s/g, ''));
  char.characteristic_id = Number(char.characteristic_id.replace(/\s/g, ''));
  char.review_id = Number(char.review_id.replace(/\s/g, ''));
  char.value = Number(char.value.replace(/\s/g, ''));

  const cleaned = `${JSON.stringify(char)}\n`
  return cleaned;
};

///// TRANSFORM STREAM /////
const transformCharData = new Transform ({
  transform(char, encoding, cb) {
    try {
      const cleanedChar = transformOneChar(char);
      cb(null, cleanedChar);
    } catch (err) {
      cb(err);
    }
  }
});

///// RUN THE PIPELINE TO TRANSFORM DATA /////
pipeline(input, parser, transformCharData, output, err => {
  if (err) {
    console.error('error in char_data pipeline: ', err);
  } else {
    console.log('finished: char_data pipeline');
  }
})