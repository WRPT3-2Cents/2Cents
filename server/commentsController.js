const getComments = (req, res) => {
    const db = req.app.get('db');
    db.get_comments()
    .then((Comments)=>{
        res.status(200).send(Comments)
    })
    .catch((e)=>console.log(e));
}

const addComment = (req,res) => {

}

const editComment = (req ,res) => {

}

const deleteComment = (req, res) => {

}

module.exports = {
    getComments,
    addComment,
    editComment,
    deleteComment
}