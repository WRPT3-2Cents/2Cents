import axios from 'axios';
import React, { useState } from 'react';
// import useForm from '../../utils/useForm';

const EditCommentForm = ({comment, toggle, setComments}) => {
    const [message, setMessage] = useState(comment.message);

    // const [categories, setCategories] = useState([]);

    const info = (e) => {
        e.preventDefault();
        // axios.post(`/api/${page}`, values)
        //     .then(res => {
        //         console.log(res.data);
        //         toggleForm();
        //         setValues(res.data)
        //     })
        // console.log(values);
        console.log(message);
        axios.put(`/api/comments/${comment.comment_id}`, {message})
            .then(res => {
                toggle();
                setComments(res.data)
            })
            .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        // console.log(e.target.value);
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