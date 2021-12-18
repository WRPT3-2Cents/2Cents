UPDATE Comments
SET next_id = $2
WHERE comment_id = $1;