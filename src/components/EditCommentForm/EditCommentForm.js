import axios from 'axios';
import React, { useState } from 'react';
import { MDBCol, MDBIcon } from "mdbreact";


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
        <MDBCol>
            <button className='form-btn' onClick={toggleForm}><MDBIcon icon="times-circle" /></button>
            <form className='form' noValidate>
                <label>Message: </label>
                    <textarea value={message} 
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                                name='message'
                                onChange={handleChange}
                                required
                                />
                <div className='text-center'>
                <button className='button-register' onClick={info}>POST</button>
                </div>
            </form>
            </MDBCol>
        </>
    )
}

export default EditCommentForm;