const getTitles = (req,res) => {
    const db = req.app.get('db');
    db.get_titles()
    .then((titles)=>{
        res.status(200).send(titles);
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