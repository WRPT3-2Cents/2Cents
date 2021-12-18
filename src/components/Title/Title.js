import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import List from '../List/List';
import './title.css';

const Title = () => {

    const [newTopLevelComment, setNewTopLevelComment] = useState('');
    const [comments, setComments] = useState([]);

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

    useEffect(() => {
        setComments(mockComments)
    }, []);

    const displayNewComment = () => {

        const newComment = {
            comment_id: comments.length,
            message: newTopLevelComment,
            date: Date().split('GMT')[0],
        }
        
        const newComments = [
            ...comments,
            newComment
        ]
        setComments(newComments);

        axios.post(`/api/comments`, newComment)
            .then(res => {
                console.log(res.data)
                // setComments(res.data)
            }).catch(err => console.log(err))

        setNewTopLevelComment('');
    }

    const handleChange = (e) => {
        setNewTopLevelComment(e.target.value);
    }

    return (
        <>
            <section className='header'>
                <h1> TITLE </h1>

                <section className='action-btns'>
                    <button>W</button>
                    <button>F </button>
                    <button> ^</button>
                    <button> v</button>
                </section>

            </section>

            <section className='add-comment-section'>
                <textarea onChange={handleChange} value={newTopLevelComment} />
                <button className='add-comment-btn' onClick={displayNewComment}>SUBMIT</button>
            </section>

            {comments.map(comment => {
                return (
                    <div className='comment-box'>
                        <p>{comment.message}</p>
                        <h6>{comment.date}</h6>
                    </div>
                )
            })}
        </>
    )
}

export default Title;