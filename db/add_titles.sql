INSERT INTO Titles
(name, type, summary, genre, length, poster)
VALUES
($1, $2, $3 , $4, $5, $6);

SELECT * FROM Titles;