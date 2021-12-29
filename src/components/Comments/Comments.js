import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import EditCommentForm from '../EditCommentForm/EditCommentForm';
import axios from 'axios';
import './comments.css';

const Comments = ({title_id}) => {

    const [newTopLevelComment, setNewTopLevelComment] = useState('');
    const [comments, setComments] = useState([]);
    const [replyComment, setReplyComment] = useState('');
    const [editCommentStatus, setEditCommentStatus] = useState(false);
    const [targetComment, setTargetComment] = useState({});

    useEffect(() => {
        axios.get(`/api/comments/${title_id}`)
            .then(res => {
                orderComments(res.data);
            })
            .catch(err => console.log(err))

    }, []);

    const displayNewComment = () => {
        
        const newComment = {
            message: newTopLevelComment,
            date: Date().split('GMT')[0],
            title_id: title_id,
            previous_id: null,
            next_id: null
        }

        axios.post(`/api/comments`, newComment)
            .then(res => {
                setComments(res.data)
            }).catch(err => console.log(err))

        setNewTopLevelComment('');
    }

    const handleChange = (e) => {
        setNewTopLevelComment(e.target.value);
    }

    const orderComments = (commentsArr) => {
        const orderedComments = [];

        // helper function for creating list of comments to include replies
        const findChildren = (parentComment) => {
            orderedComments.push(parentComment);
            if (parentComment.next_id !== 0 && parentComment.next_id !== null){
                const child = commentsArr.find(comment => comment.comment_id === parentComment.next_id);
                if (child) {
                    findChildren(child)
                };
            }
        }

        commentsArr.sort((a, b) => (a.comment_id - b.comment_id)).forEach(parentComment => {
            // helper function for recursive search
            findChildren(parentComment);
        })
        
        const finalCommentOrder = [];
        
        // helper function to remove duplicates
        orderedComments.forEach(comment => {
                if (!finalCommentOrder.includes(comment))
                    finalCommentOrder.push(comment);
        })

        setComments(finalCommentOrder);
    }

    const addReplyComment = (e) => {
        e.target.parentNode.childNodes[4].classList.toggle('hidden');
    }

    const submitReply = (e, parentComment) => {

        e.target.parentNode.classList.toggle('hidden');

        const newReplyComment = {
            message: replyComment,
            date: Date().split('GMT')[0],
            title_id: title_id,
            previous_id: parentComment.comment_id,
            next_id: null
        }

        axios.post(`/api/comments`, newReplyComment)
            .then(res => {
                setComments(res.data)
            }).catch(err => console.log(err))
        
        setReplyComment('');
    }

    const handleReplyChange = (e) => {
        setReplyComment(e.target.value);
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
        
        axios.delete(`/api/comments/${title_id}/${comment.comment_id}`)
            .then(res => {
                orderComments(res.data)
            })
            .catch(err => console.log(err));
    }

    const loggedInStatus = true;

    return (
        <>
            {loggedInStatus && <section className='add-comment-section'>
                <textarea onChange={handleChange} value={newTopLevelComment} placeholder='What are your thoughts?'/>
                {newTopLevelComment && <button className='add-comment-btn' onClick={displayNewComment}>SUBMIT</button>}
            </section> }

            {comments.map(comment => {
                const date = comment.date.split('T')[0];

                if (comment.previous_id !== 0 && comment.previous_id !== null){
                        return (
                            <div className='comment-box reply' key={comment.comment_id}>
                                <p onClick={() => editComment(comment)}>{comment.message}</p>
                                <h6>{date}</h6>
                                {loggedInStatus && <>
                                <button onClick={addReplyComment}>Reply</button>
                                <button onClick={(e) => deleteMe(e, comment)}> DELETE </button>
                                
                                <div className='reply-area hidden'>
                                        <textarea onChange={handleReplyChange} value={replyComment} />
                                        <button className='add-reply-btn' onClick={(e) => submitReply(e, comment)}>SUBMIT</button>
                                    </div>
                                    </>
                                }
                            </div>
                        )
                }
                return (
                    <div className='comment-box' key={comment.comment_id}>
                        <p onClick={() => editComment(comment)}>{comment.message}</p>
                        <h6>{date}</h6>
                        {loggedInStatus && <>
                        <button onClick={addReplyComment}>Reply</button>
                        <button onClick={(e) => deleteMe(e, comment)}> DELETE </button>
                        
                        <div className='reply-area hidden'>
                                <textarea onChange={handleReplyChange} value={replyComment} />
                                <button className='add-reply-btn' onClick={(e) => submitReply(e, comment)}>SUBMIT</button>
                            </div>
                        </>
            }
                    </div>
                )
            })}

            {editCommentStatus && <Modal>
                                        <EditCommentForm 
                                            comment={targetComment} 
                                            toggle={toggleEditCommentForm}
                                            setComments={orderComments}
                                            titleId={title_id}/>
                                    </Modal>}
        </>
    )
}

export default Comments;