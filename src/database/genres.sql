INSERT INTO genres (name) VALUES
('Ciencia ficción'),
('Distopía'),
('Realismo mágico'),
('Terror'),
('Suspenso'),
('Misterio'),
('Ficción histórica'),
('Desarrollo personal'),
('Finanzas'),
('Infantil'),
('Fantasía'),
('Clásico'),
('Aventura');

-- 1984
INSERT INTO book_genres (id_book, id_genre)
SELECT b.id, g.id FROM books b JOIN genres g ON g.name IN ('Ciencia ficción','Distopía') WHERE b.title = '1984';

-- Cien Años de Soledad
INSERT INTO book_genres (id_book, id_genre)
SELECT b.id, g.id FROM books b JOIN genres g ON g.name = 'Realismo mágico' WHERE b.title = 'Cien Años de Soledad';

-- El Resplandor
INSERT INTO book_genres (id_book, id_genre)
SELECT b.id, g.id FROM books b JOIN genres g ON g.name IN ('Terror','Suspenso') WHERE b.title = 'El Resplandor';

-- La Sombra del Viento
INSERT INTO book_genres (id_book, id_genre)
SELECT b.id, g.id FROM books b JOIN genres g ON g.name IN ('Misterio','Ficción histórica') WHERE b.title = 'La Sombra del Viento';

-- Padre Rico Padre Pobre
INSERT INTO book_genres (id_book, id_genre)
SELECT b.id, g.id FROM books b JOIN genres g ON g.name IN ('Finanzas','Desarrollo personal') WHERE b.title = 'Padre Rico Padre Pobre';

-- Los Intocables
INSERT INTO book_genres (id_book, id_genre)
SELECT b.id, g.id FROM books b JOIN genres g ON g.name IN ('Ficción histórica','Suspenso') WHERE b.title = 'Los Intocables';

-- Dr. Sueño
INSERT INTO book_genres (id_book, id_genre)
SELECT b.id, g.id FROM books b JOIN genres g ON g.name IN ('Terror','Fantasía') WHERE b.title = 'Dr. Sueño';

-- El Principito
INSERT INTO book_genres (id_book, id_genre)
SELECT b.id, g.id FROM books b JOIN genres g ON g.name IN ('Infantil','Fantasía') WHERE b.title = 'El Principito';

-- Don Quijote de la Mancha
INSERT INTO book_genres (id_book, id_genre)
SELECT b.id, g.id FROM books b JOIN genres g ON g.name IN ('Clásico','Aventura') WHERE b.title = 'Don Quijote de la Mancha';

-- Los Juegos del Hambre
INSERT INTO book_genres (id_book, id_genre)
SELECT b.id, g.id FROM books b JOIN genres g ON g.name IN ('Distopía','Aventura') WHERE b.title = 'Los Juegos del Hambre';

-- Hábitos Atómicos
INSERT INTO book_genres (id_book, id_genre)
SELECT b.id, g.id FROM books b JOIN genres g ON g.name = 'Desarrollo personal' WHERE b.title = 'Hábitos Atómicos';

-- El Código Da Vinci
INSERT INTO book_genres (id_book, id_genre)
SELECT b.id, g.id FROM books b JOIN genres g ON g.name IN ('Misterio','Suspenso') WHERE b.title = 'El Código Da Vinci';

