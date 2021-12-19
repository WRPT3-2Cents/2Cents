

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
        
        if (previous_id !== null){
            // if comment has a previous_id
            const updatedComments = comments.map((comment, i, arr) => {
                if (comment.message === message){
                    const parent = findParentComment(arr, comment.previous_id);
                    // console.log(parent);
                    // parent.next_id = comment.comment_id;
                    db.update_comment_id(parent.comment_id, comment.comment_id);
                } 
                return comment;
            });
            return res.status(200).send(updatedComments)
        }
        // console.log(updatedComments);
        return res.status(200).send(comments);
    } catch (err){
        console.log(`Error adding new comment: ${err}`);
    }

};

const editComment = async (req ,res) => {
    const db = req.app.get('db');
    // console.log(req.body);
    // console.log(req.params);
    try {
        const comments = await db.edit_comment([req.body.message, req.params.comment_id]);
        res.status(200).send(comments);
    } catch (err) {
        console.log(err);
    }
}

const deleteComment = async (req, res) => {
    const db = req.app.get('db');

    try {

        const comment = await db.find_comment(req.params.comment_id);
        console.log(comment);

        if (comment[0].next_id === null){
            const comments = await db.true_delete_comment(req.params.comment_id)
            console.log(comments);
            return res.status(200).send(comments);
        } 
        
        const comments = await db.delete_comment(req.params.comment_id)
        // console.log(comments);
        return res.status(200).send(comments);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getComments,
    addComment,
    editComment,
    deleteComment
}