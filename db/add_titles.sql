INSERT INTO Titles
(name, type, summary, genre, length)
VALUES
($1, $2, $3 , $4, $5);

SELECT * FROM Titles;