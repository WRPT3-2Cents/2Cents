DELETE FROM Comments
WHERE comment_id = $1;

SELECT * FROM Comments;