import axios from 'axios';
import React, { useState } from 'react';
// import useForm from '../../utils/useForm';

const EditCommentForm = ({comment, toggle, setComments, titleId}) => {
    const [message, setMessage] = useState(comment.message);

    const info = (e) => {
        e.preventDefault();
        axios.put(`/api/comments/${comment.comment_id}`, {message, titleId})
            .then(res => {
                toggle();
                setComments(res.data)
            })
            .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const toggleForm = () => {
        toggle();
    }

    return (
        <>
            <form className='form' noValidate>
                <label>Message: </label>
                    <textarea value={message} 
                                name='message'
                                onChange={handleChange}
                                required
                                />
                <button className='form-btn' onClick={info}>SUBMIT</button>
            </form>
            <button className='form-btn' onClick={toggleForm}>CLOSE</button>
        </>
    )
}

export default EditCommentForm;