-- TERMINAL COMMANDS FOR CREATING AND CONNECTING TO NEW DATABASE
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

CREATE INDEX reviews_product_id_idx ON reviews (product_id);


-- PHOTOS
DROP TABLE IF EXISTS "photos";

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL REFERENCES reviews(id),
  url TEXT NOT NULL
);

CREATE INDEX photos_review_id_idx ON photos (review_id);


-- CHARACTERISTICS
DROP TABLE IF EXISTS "characteristics";

CREATE TABLE "characteristics" (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name TEXT NOT NULL
);

CREATE INDEX characteristics_product_id_idx ON characteristics (product_id);


-- CHARACTERISTIC VALUES
DROP TABLE IF EXISTS "char_values";

CREATE TABLE "char_values" (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL REFERENCES characteristics(id),
  review_id INTEGER NOT NULL REFERENCES reviews(id),
  value INTEGER NOT NULL
);

CREATE INDEX char_values_product_id_idx ON char_values (characteristic_id);
CREATE INDEX char_values_review_id_idx ON char_values (review_id);


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


-- FIX AUTO_INCREMENTING IDS
-- Get the maximum id value for each table
SELECT MAX(id) FROM reviews; -- 5774952
SELECT MAX(id) FROM photos; -- 2742540
SELECT MAX(id) FROM characteristics -- 3347679;
SELECT MAX(id) FROM char_values -- 19327575;
