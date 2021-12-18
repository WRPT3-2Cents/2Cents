

const getComments = (req, res) => {
    const db = req.app.get('db');
    db.get_comments()
        .then((comments)=>{
            res.status(200).send(comments)
        }).catch((e)=>console.log(e));
}

const addComment = async (req,res) => {
    
    console.log(req.body);
    const { message, date, previous_id, next_id } = req.body;
    const db = req.app.get('db');

    // helper function
    const findParentComment = (comments, findMe) => {
        return comments.find(comment => comment.comment_id === findMe);
    }

    // try catch block for adding new comments and reply comments

    try {
        const comments = await db.add_new_comment([message, date, null,null ,previous_id, next_id]);
        // console.log({comments});
        const updatedComments = comments.map((comment, i, arr) => {
            if (comment.message === message){
                const parent = findParentComment(arr, comment.previous_id);
                // console.log(parent);
                parent.next_id = comment.comment_id;
            } 
            return comment;
        });
        // console.log(updatedComments);
        return res.status(200).send(updatedComments);
    } catch (err){
        console.log(`Error adding new comment: ${err}`);
    }

};

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