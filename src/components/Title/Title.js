import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import List from '../List/List';
import Modal from '../Modal/Modal';
import EditCommentForm from '../EditCommentForm/EditCommentForm';

import './title.css';

const Title = () => {

    const [newTopLevelComment, setNewTopLevelComment] = useState('');
    const [replyComment, setReplyComment] = useState('');
    const [comments, setComments] = useState([]);
    const [editCommentStatus, setEditCommentStatus] = useState(false);
    const [targetComment, setTargetComment] = useState({});

    const orderComments = (commentsArr) => {
        const orderedComments = [];

        const findChildren = (parentComment) => {
            orderedComments.push(parentComment);
            if (parentComment.next_id !== 0 && parentComment.next_id !== null){
                const child = commentsArr.find(comment => comment.comment_id === parentComment.next_id);
                findChildren(child);
            }
        }

        commentsArr.sort((a, b) => (a.comment_id - b.comment_id)).map(parentComment => {
            // helper function for recursive search
            findChildren(parentComment);
        })
        
        const finalCommentOrder = [];
        
        orderedComments.map(comment => {
                if (!finalCommentOrder.includes(comment))
                    finalCommentOrder.push(comment);
            })
        setComments(finalCommentOrder);
    }

    useEffect(() => {
        axios.get(`/api/comments/title_id`)
            .then(res => {
                orderComments(res.data);
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
                setComments(res.data)
            }).catch(err => console.log(err))
        
        setReplyComment('');
    }

    const handleChange = (e) => {
        setNewTopLevelComment(e.target.value);
    }

    const handleReplyChange = (e) => {
        setReplyComment(e.target.value);
        e.target.parentNode.childNodes[4].classList.toggle('hidden');
    }

    const addReplyComment = (e) => {
        e.target.parentNode.childNodes[4].classList.toggle('hidden');
    }

    const toggleEditCommentForm = () => {
        setEditCommentStatus(!editCommentStatus);
    }

    const editComment = (comment) => {
        setTargetComment(comment);
        toggleEditCommentForm();
    }

    const deleteMe = (e, comment) => {
        e.stopPropagation();
        
        axios.delete(`/api/comments/${comment.comment_id}`)
            .then(res => {
                orderComments(res.data)
            })
            .catch(err => console.log(err));
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
                const date = comment.date.split('T')[0];

                if (comment.previous_id !== 0 && comment.previous_id !== null){
                        return (
                            <div className='comment-box reply' key={comment.comment_id}>
                                <p onClick={() => editComment(comment)}>{comment.message}</p>
                                <h6>{date}</h6>
                                <button onClick={addReplyComment}>Reply</button>
                                <button onClick={(e) => deleteMe(e, comment)}> DELETE </button>
                                
                                <div className='reply-area hidden'>
                                        <textarea onChange={handleReplyChange} value={replyComment} />
                                        <button className='add-reply-btn' onClick={() => submitReply(comment)}>SUBMIT</button>
                                    </div>
                            </div>
                        )
                }
                return (
                    <div className='comment-box' key={comment.comment_id}>
                        <p onClick={() => editComment(comment)}>{comment.message}</p>
                        <h6>{date}</h6>
                        <button onClick={addReplyComment}>Reply</button>
                        <button onClick={(e) => deleteMe(e, comment)}> DELETE </button>
                        
                        <div className='reply-area hidden'>
                                <textarea onChange={handleReplyChange} value={replyComment} />
                                <button className='add-reply-btn' onClick={() => submitReply(comment)}>SUBMIT</button>
                            </div>
                    </div>
                )
            })}

            {editCommentStatus && <Modal>
                                        <EditCommentForm 
                                            comment={targetComment} 
                                            toggle={toggleEditCommentForm}
                                            setComments={orderComments}/>
                                    </Modal>}



        </>
    )
}

export default Title;