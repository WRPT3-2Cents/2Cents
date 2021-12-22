DELETE FROM Comments
WHERE comment_id = $1;

SELECT * FROM Comments
WHERE title_id = $2;