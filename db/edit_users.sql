UPDATE Users;
SET username = $2 , password = $3, email = $4, recommendations = $5, watchlist = $6
WHERE user_id = $1;

SELECT * FROM Users;