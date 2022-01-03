const getUsers = async (req, res) => {
    const db = req.app.get('db');

    try {
        const users = await db.get_users();
        res.status(200).send(users[0]);
    } catch(err){
        console.log(`Error retrieving users: ${err}`);
        res.status(500).send(err);
    }
}


const editUsers = async (req, res) => {
    const db = req.app.get('db')
    const { id, username, email, recommendations, watchlist, follows} = req.body
    const user_id = +id;

    try {
        const users = await db.edit_users([user_id, username, email, recommendations, watchlist, follows]);
        res.status(200).send(users[0]);
    } catch(err){
        console.log(`Error updating user: ${err}`);
        res.status(400).send(err);
    }
}

const deleteUsers = (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params;
    db.delete_users(id)
    .then(()=> res.sendStatus(200))
    .catch((e)=> console.log(e))
}

module.exports = {
    getUsers,
    editUsers,
    deleteUsers
}