import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import List from '../List/List';
import './title.css';

const Title = () => {

    const [newTopLevelComment, setNewTopLevelComment] = useState('');
    const [replyComment, setReplyComment] = useState('');
    const [comments, setComments] = useState([]);

    const orderComments = (commentsArr) => {
        console.log(commentsArr);

        const findChildren = (parentComment) => {
            if (parentComment.next_id === undefined){
                console.log(parentComment);
                return parentComment;
            } else {
                const child = commentsArr.find(comment => comment.comment_id === parentComment.nextId);
                console.log(child);
                findChildren(child);
            }
        }

        commentsArr.map(parentComment => {
            console.log(parentComment);
            // orderedComments.push(parentComment);
            const children = findChildren(parentComment);
            console.log(children);
        })
    }

    useEffect(() => {
        axios.get(`/api/comments/title_id`)
            .then(res => {
                orderComments(res.data);
                // setComments(res.data);
                // console.log(res.data);
            })
            .catch(err => console.log(err))

    }, []);

    const displayNewComment = () => {
        const newComment = {
            message: newTopLevelComment,
            date: Date().split('GMT')[0],
            previous_id: null,
            next_id: null
        }

        axios.post(`/api/comments`, newComment)
            .then(res => {
                console.log(res.data)
                setComments(res.data)
            }).catch(err => console.log(err))

        setNewTopLevelComment('');
    }

    const submitReply = (parentComment) => {

        const newReplyComment = {
            message: replyComment,
            date: Date().split('GMT')[0],
            previous_id: parentComment.comment_id,
            next_id: null
        }

        axios.post(`/api/comments`, newReplyComment)
            .then(res => {
                console.log(res.data)
                setComments(res.data)
            }).catch(err => console.log(err))
        
        setReplyComment('');
    }

    const handleChange = (e) => {
        setNewTopLevelComment(e.target.value);
    }

    const handleReplyChange = (e) => {
        setReplyComment(e.target.value);
    }

    const addReplyComment = (e) => {
        e.target.parentNode.childNodes[3].classList.toggle('hidden');
    }

    return (
        <>
            <section className='header'>
                <h1> TITLE </h1>

                <section className='action-btns'>
                    <button>W</button>
                    <button>F </button>
                    <button>^</button>
                    <button>v</button>
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
                        <button onClick={addReplyComment}>Reply</button>
                        
                        <div className='reply-area hidden'>
                                <textarea onChange={handleReplyChange} value={replyComment} />
                                <button className='add-reply-btn' onClick={() => submitReply(comment)}>SUBMIT</button>
                            </div>
                    </div>
                )
            })}
        </>
    )
}

export default Title;