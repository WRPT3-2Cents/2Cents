UPDATE Comments
SET message = $1
WHERE
comment_id = $2;

SELECT * FROM Comments
WHERE title_id = $3;