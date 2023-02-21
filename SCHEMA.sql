-- Terminal commands for connecting to and creating new database.
-- psql
-- DROP DATABASE IF EXISTS sdc
-- CREATE DATABASE sdc
-- \c sdc

-- REVIEWS
DROP TABLE IF EXISTS "reviews";

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT FALSE,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  response TEXT DEFAULT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0
);


-- PHOTOS
DROP TABLE IF EXISTS "photos";

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL REFERENCES reviews(id),
  url TEXT NOT NULL
);



-- CHARACTERISTICS
DROP TABLE IF EXISTS "characteristics";

CREATE TABLE "characteristics" (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name TEXT NOT NULL
);


-- CHARACTERISTIC VALUES
DROP TABLE IF EXISTS "char_values";

CREATE TABLE "char_values" (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL REFERENCES characteristics(id),
  review_id INTEGER NOT NULL REFERENCES reviews(id),
  value INTEGER NOT NULL
);


-- COPY STATEMENTS TO MIGRATE DATA INTO DATABASE
COPY reviews
FROM '/Users/jerrodvarney/HackReactor/sdc/reviews_jerrod/data/original/reviews.csv'
DELIMITER ',' CSV HEADER NULL AS 'null';

COPY photos (id, review_id, url)
FROM '/Users/jerrodvarney/HackReactor/sdc/reviews_jerrod/data/original/photos.csv'
DELIMITER ',' CSV HEADER NULL AS 'null';

COPY characteristics (id, product_id, name)
FROM '/Users/jerrodvarney/HackReactor/sdc/reviews_jerrod/data/original/chars.csv'
DELIMITER ',' CSV HEADER NULL AS 'null';

COPY char_values (id, characteristic_id, review_id, value)
FROM '/Users/jerrodvarney/HackReactor/sdc/reviews_jerrod/data/original/char_data.csv'
DELIMITER ',' CSV HEADER NULL AS 'null';
