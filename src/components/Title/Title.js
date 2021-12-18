import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import List from '../List/List';
import './title.css';

const Title = () => {

    const [newTopLevelComment, setNewTopLevelComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`/api/comments/title_id`)
            .then(res => setComments(res.data))
            .catch(err => console.log(err))
    }, []);

    const displayNewComment = () => {
        const newComment = {
            message: newTopLevelComment,
        }
        
        console.log(newTopLevelComment);

        axios.post(`/api/comments`, newComment)
            .then(res => {
                console.log(res.data)
                setComments(res.data)
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
                    <div className='comment-box' key={comment.comment_id}>
                        <p>{comment.message}</p>
                        <h6>{comment.date}</h6>
                        <button>Reply</button>
                    </div>
                )
            })}
        </>
    )
}

export default Title;