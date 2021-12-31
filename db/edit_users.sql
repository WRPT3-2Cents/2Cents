UPDATE Users
SET username = $2 , email = $3, recommendations = $4, watchlist = $5, follows = $6
WHERE user_id = $1;

SELECT * FROM Users;