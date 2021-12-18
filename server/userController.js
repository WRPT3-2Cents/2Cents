const getUsers = (req, res) => {
    const db = req.app.get('db');
    db.get_users()
    .then((users)=>{
        res.status(200).send(users)
    })
    .catch((e)=>console.log(e))
}

const addUsers = (req, res) => {
    const db = req.app.get('db')
    const {username, password, email, recommendations, watchlist} = req.body
    db.add_users(username, password, email, recommendations, watchlist)
    .then(()=> res.sendStatus(200))
    .catch((e)=>res.status(500).send(e))
}

const editUsers = (req, res) => {
    const db = req.app.get('db')
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
    addUsers,
    editUsers,
    deleteUsers
}