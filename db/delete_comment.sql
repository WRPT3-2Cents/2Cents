UPDATE Comments
SET message='This comment has been deleted.'
WHERE comment_id = $1;

SELECT * FROM Comments
WHERE title_id = $2;