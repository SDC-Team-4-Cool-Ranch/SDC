const { Transform, pipeline } = require('stream');
const csv = require('csvtojson');
const fs = require('fs');

///// PARSES CSV TO JSON /////
const parser = csv();

///// READ AND WRITE STREAMS /////
const input = fs.createReadStream('../original/photos.csv');
const output = fs.createWriteStream('../cleaned/photos.ndjson');

///// TRANSFORM FUNCTION /////
const transformOnePhoto = (photo) => {
  photo = JSON.parse(photo);

  //remove any whitespace
  photo.id = Number(photo.id.replace(/\s/g, ''));
  photo.review_id = Number(photo.review_id.replace(/\s/g, ''));
  photo.url = photo.url.replace(/\s/g, '');

  const cleaned = `${JSON.stringify(photo)}\n`
  return cleaned;
};

///// TRANSFORM STREAM /////
const transformPhotos = new Transform({
  transform(photo, encoding, cb) {
    try {
      const cleanedPhoto = transformOnePhoto(photo);
      cb(null, cleanedPhoto);
    } catch (err) {
      cb(err);
    }
  }
});

///// RUN THE PIPELINE TO TRANSFORM DATA /////
pipeline(input, parser, transformPhotos, output, err => {
  if (err) {
    console.error('error in photos pipeline: ', err);
  } else {
    console.log('finished: photos pipeline');
  }
})