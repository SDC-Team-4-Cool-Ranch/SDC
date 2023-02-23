const { Transform, pipeline } = require('stream');
const Papa = require('papaparse');
const csv = require('csvtojson');
const fs = require('fs');

///// PARSES CSV TO JSON /////
const parser = csv();
const chars = ['id', 'product_id', 'name'];

///// READ AND WRITE STREAMS /////
const input = fs.createReadStream('../original/chars.csv');
const output = fs.createWriteStream('../cleaned/chars.csv');

///// TRANSFORM FUNCTION /////
const transformOneChar = (char) => {
  char = JSON.parse(char);

  //remove any whitespace
  char.id = Number(char.id.replace(/\s/g, ''));
  char.product_id = Number(char.product_id.replace(/\s/g, ''));
  char.name = char.name.replace(/\s/g, '');

  //fix capitalization on name property
  char.name = char.name.toLowerCase();
  char.name = char.name[0].toUpperCase() + char.name.slice(1);

  let csv = Papa.unparse([char], { dynamicTyping: true, header: false });
  // console.log(csv);
  // csv = `${JSON.stringify(csv)}\n`
  return csv;
};

///// TRANSFORM STREAM /////
const transformChars = new Transform ({
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
pipeline(input, parser, transformChars, output, err => {
  if (err) {
    console.error('error in chars pipeline: ', err);
  } else {
    console.log('finished: chars pipeline');
  }
})