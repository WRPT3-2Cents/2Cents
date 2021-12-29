const getUsers = (req, res) => {
    const db = req.app.get('db');
    db.get_users()
    .then((users)=>{
        res.status(200).send(users)
    })
    .catch((e)=>console.log(e))
}


const editUsers = (req, res) => {
    const db = req.app.get('db')
    const {
        user_id,
        username,
        password,
        email,
        recommendations,
        watchlist,
        follows
    } = req.body
    db.edit_users(
        user_id,
        username,
        password,
        email,
        recommendations,
        watchlist,
        follows
    )
    .then((users) => res.status(200).send(users))
    .catch((e) => console.log(e));
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