Titles (
    title_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(30),
    summary TEXT,
    genre VARCHAR(30),
    length INT,
    recommendations INT,
    non_recommendations INT
Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password TEXT,
    email VARCHAR(50),
    recommendations VARCHAR(100)[],
    watchlist VARCHAR(100)[],
    follows VARCHAR(100)[]
Comments (
    comment_id SERIAL PRIMARY KEY,
    message TEXT,
    date DATE,
    user_id INT REFERENCES Users (user_id),
    title_id INT REFERENCES Titles (title_id),
    previous_id INT,
    next_id INT