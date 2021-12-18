UPDATE Titles
SET name = $2, type = $3, summary = $4, genre = $5, length = $6, recommendations = $7, non_recommendations = $8
WHERE title_id = $1;

SELECT * FROM Titles;