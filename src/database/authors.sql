INSERT INTO authors (name, lastname, nationality) VALUES
('George', 'Orwell', 'Británico'),
('Gabriel', 'García Márquez', 'Colombiano'),
('Stephen', 'King', 'Estadounidense'),
('Carlos', 'Ruiz Zafón', 'Español'),
('Robert', 'Kiyosaki', 'Estadounidense'),
('Eliot', 'Ness', 'Estadounidense'),
('Antoine', 'de Saint-Exupéry', 'Francés'),
('Miguel', 'de Cervantes', 'Español'),
('Suzanne', 'Collins', 'Estadounidense'),
('James', 'Clear', 'Estadounidense'),
('Dan', 'Brown', 'Estadounidense');

-- 1984
INSERT INTO book_authors (id_book, id_author)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = '1984' AND a.lastname = 'Orwell';

-- Cien Años de Soledad
INSERT INTO book_authors (id_book, id_author)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'Cien Años de Soledad' AND a.lastname = 'García Márquez';

-- El Resplandor
INSERT INTO book_authors (id_book, id_author)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'El Resplandor' AND a.lastname = 'King';

-- La Sombra del Viento
INSERT INTO book_authors (id_book, id_author)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'La Sombra del Viento' AND a.lastname = 'Ruiz Zafón';

-- Padre Rico Padre Pobre
INSERT INTO book_authors (id_book, id_author)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'Padre Rico Padre Pobre' AND a.lastname = 'Kiyosaki';

-- Los Intocables
INSERT INTO book_authors (id_book, id_author)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'Los Intocables' AND a.lastname = 'Ness';

-- Dr. Sueño
INSERT INTO book_authors (id_book, id_author)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'Dr. Sueño' AND a.lastname = 'King';

-- El Principito
INSERT INTO book_authors (id_book, id_author)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'El Principito' AND a.lastname = 'de Saint-Exupéry';

-- Don Quijote de la Mancha
INSERT INTO book_authors (id_book, id_author)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'Don Quijote de la Mancha' AND a.lastname = 'de Cervantes';

-- Los Juegos del Hambre
INSERT INTO book_authors (id_book, id_author)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'Los Juegos del Hambre' AND a.lastname = 'Collins';

-- Hábitos Atómicos
INSERT INTO book_authors (id_book, id_author)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'Hábitos Atómicos' AND a.lastname = 'Clear';

-- El Código Da Vinci
INSERT INTO book_authors (id_book, id_author)
SELECT b.id, a.id
FROM books b, authors a
WHERE b.title = 'El Código Da Vinci' AND a.lastname = 'Brown';