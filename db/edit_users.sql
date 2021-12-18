UPDATE Users;
SET username = $2 , password = $3, email = $4, recommendations = $4, watchlist = $5
WHERE user_id = $1;

SELECT * FROM Users;