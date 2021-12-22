INSERT INTO Comments
(message, date, user_id, title_id, previous_id, next_id)
VALUES
($1, $2, $3, $4, $5, $6);

SELECT * FROM Comments
WHERE title_id = $4;