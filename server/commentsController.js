const getComments = (req, res) => {
    const db = req.app.get('db');
    db.get_comments()
    .then((comments)=>{
        res.status(200).send(comments)
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