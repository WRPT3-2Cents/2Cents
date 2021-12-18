const getTitles = (req,res) => {
    const db = req.app.get('db');
    db.get_titles()
    .then((Titles)=>{
        res.status(200).send(Titles);
    })
    .catch((e)=> console.log(e));
}

const addTitle = (req, res) => {

}

const editTitle = (req, res) => {

}

const deleteTitle = (req, res) => {

}

module.exports = {
    getTitles,
    addTitle,
    editTitle,
    deleteTitle
}