const getUsers = (req, res) => {
    const db = req.app.get('db');
    db.get_users()
    .then((Users)=>{
        res.status(200).send(Users)
    })
    .catch((e)=>console.log(e))
}

const addUsers = (req, res) => {

}

const editUsers = (req, res) => {

}

const deleteUsers = (req, res) => {

}

module.exports = {
    getUsers,
    addUsers,
    editUsers,
    deleteUsers
}