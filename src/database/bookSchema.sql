CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  cover TEXT DEFAULT NULL
  price NUMERIC(10,2) NOT NULL,
  stock INT NOT NULL,
  details TEXT DEFAULT NULL,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100),
  nationality VARCHAR(100)
);

CREATE TABLE genres (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL
);

CREATE TABLE book_authors (
  id_book UUID REFERENCES books(id) ON DELETE CASCADE,
  id_author UUID REFERENCES authors(id) ON DELETE CASCADE,
  PRIMARY KEY (id_book, id_author)
);

CREATE TABLE book_genres (
  id_book UUID REFERENCES books(id) ON DELETE CASCADE,
  id_genre UUID REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (id_book, id_genre)
);