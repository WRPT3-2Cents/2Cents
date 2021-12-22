

const getComments = async (req, res) => {
    
    const { title_id } = req.params;
    const db = req.app.get('db');

    try {
        const comments = await db.get_comments(title_id);
        res.status(200).send(comments);
    } catch(err) {
        console.log(`Error retrieving comments: ${err}`);
    }
}

const addComment = async (req,res) => {
    
    
    const { message, date, previous_id, next_id, title_id } = req.body;
    const db = req.app.get('db');

    // helper function
    const findParentComment = (comments, findMe) => {
        return comments.find(comment => comment.comment_id === findMe);
    }

    // try catch block for adding new comments and reply comments

    try {
        const comments = await db.add_new_comment([message, date, null,title_id,previous_id, next_id]);
        
        
        if (previous_id !== null){
            const updatedComments = comments.map((comment, i, arr) => {
                if (comment.message === message){
                    const parent = findParentComment(arr, comment.previous_id);
                    db.update_comment_id(parent.comment_id, comment.comment_id);
                } 
                return comment;
            });
            return res.status(200).send(updatedComments)
        }
        return res.status(200).send(comments);
    } catch (err){
        console.log(`Error adding new comment: ${err}`);
    }

};

const editComment = async (req ,res) => {
    const db = req.app.get('db');
    const { message, title_id} = req.body;

    try {
        const comments = await db.edit_comment([message, req.params.comment_id, title_id]);
        res.status(200).send(comments);
    } catch (err) {
        console.log(err);
    }
}

const deleteComment = async (req, res) => {
    const db = req.app.get('db');
    const { comment_id, title_id } = req.params;

    try {

        const comment = await db.find_comment(comment_id);

        if (comment[0].next_id === null){
            const comments = await db.true_delete_comment(comment_id, title_id)
            return res.status(200).send(comments);
        } 
        
        const comments = await db.delete_comment(comment_id, title_id)
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