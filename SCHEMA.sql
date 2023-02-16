-- Globals

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- Table 'Reviews'
DROP TABLE IF EXISTS "Reviews";

CREATE TABLE "Reviews" (
"id" SERIAL PRIMARY KEY,
"rating" INTEGER,
"summary" VARCHAR(255),
"recommend" BOOLEAN,
"response" TEXT,
"body" TEXT,
"date" DATE,
"reported" BOOLEAN DEFAULT false,
"reviewer" VARCHAR(255),
"email" VARCHAR(255),
"product_id_meta" INTEGER REFERENCES "meta"("product_id")
);

-- Table 'photos'
DROP TABLE IF EXISTS "photos";

CREATE TABLE "photos" (
"id" SERIAL PRIMARY KEY,
"url" VARCHAR(255),
"id_Reviews" INTEGER REFERENCES "Reviews"("id")
);

-- Table 'meta'
DROP TABLE IF EXISTS "meta";

CREATE TABLE "meta" (
"product_id" SERIAL PRIMARY KEY,
"recommended" INTEGER,
"not_recommended" INTEGER,
"1" INTEGER,
"2" INTEGER,
"3" INTEGER,
"4" INTEGER,
"5" INTEGER,
"id_characteristics" INTEGER REFERENCES "characteristics"("id")
);

-- Table 'characteristics'
DROP TABLE IF EXISTS "characteristics";

CREATE TABLE "characteristics" (
"id" SERIAL PRIMARY KEY,
"size_id" SERIAL UNIQUE,
"size" INTEGER,
"width_id" SERIAL UNIQUE,
"width" INTEGER,
"comfort_id" SERIAL UNIQUE,
"comfort" INTEGER,
"quality_id" SERIAL UNIQUE,
"quality" INTEGER,
"length_id" SERIAL UNIQUE,
"length" INTEGER,
"fit_id" SERIAL UNIQUE,
"fit" INTEGER
);

-- Foreign Keys

-- ALTER TABLE "Reviews" ADD FOREIGN KEY (product_id_meta) REFERENCES "meta" ("product_id");
-- ALTER TABLE "photos" ADD FOREIGN KEY (id_Reviews) REFERENCES "Reviews" ("id");
-- ALTER TABLE "meta" ADD FOREIGN KEY (id_characteristics) REFERENCES "characteristics" ("id");

-- Table Properties

-- ALTER TABLE "Reviews" OWNER TO "your_username";
-- ALTER TABLE "photos" OWNER TO "your_username";
-- ALTER TABLE "meta" OWNER TO "your_username";
-- ALTER TABLE "characteristics" OWNER TO "your_username";

-- Test Data

-- INSERT INTO "Reviews" ("id","rating","summary","recommend","response","body","date","reported","reviewer","email","product_id_meta") VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO "photos" ("id","url","id_Reviews") VALUES
-- ('','','');
-- INSERT INTO "meta" ("product_id","recommended","not_recommended","1","2","3","4","5","id_characteristics") VALUES
-- ('','','','','','','','','');
-- INSERT INTO "characteristics" ("id","size_id","size","width_id","width","comfort_id","comfort","quality_id","quality","length_id","length","fit_id","fit") VALUES
-- ('','','','','','','','','','','','','');
