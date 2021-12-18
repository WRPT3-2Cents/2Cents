const getComments = (req, res) => {
    // const db = req.app.get('db');
    // db.get_comments()
    //     .then((comments)=>{
    //         res.status(200).send(comments)
    //     }).catch((e)=>console.log(e));

    // for testing purposes until we have data in our database
    const mockComments = [ {
        comment_id: 0,
        message: 'This was a great movie!',
        date: '12-16-2021',
        previous_id: undefined,
        next_id: 1
    },
    {
        comment_id: 1,
        message: 'Totally agree!',
        date: '12-16-2021',
        previous_id: 0,
        next_id: undefined
    }
    ];

    res.status(200).send(mockComments);
}

const addComment = (req,res) => {
    
    console.log(req.body);

    const mockComments = [ {
        comment_id: 0,
        message: 'This was a great movie!',
        date: '12-16-2021',
        previous_id: undefined,
        next_id: 1
    },
    {
        comment_id: 1,
        message: 'Totally agree!',
        date: '12-16-2021',
        previous_id: 0,
        next_id: undefined
    }
    ];

    const newComment = {
        comment_id: mockComments.length,
        message: req.body.message,
        date: Date().split('GMT')[0]
    };
    
    mockComments.push(newComment);
    res.status(200).send(mockComments);

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