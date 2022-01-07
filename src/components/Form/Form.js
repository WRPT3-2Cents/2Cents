import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useForm from '../../utils/useForm';
import './form.css';

const Form = ({toggleForm, setTitles}) => {
    const [values, handleChange] = useForm();

    const info = (e) => {
        e.preventDefault();
        axios.get (`http://www.omdbapi.com/?i=tt3896198&apikey=d92c4380&t=${values.name}`)
            .then(res => {
                const poster = res.data.Poster 
                const newTitle = { ...values, poster}
                axios.post(`/api/titles`, newTitle)
                    .then(res => {
                        toggleForm();
                        setTitles(res.data)
                    })
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <form className='form' noValidate>
                <div>
                    <label>Name: </label>
                    <input value={values.name}
                        name='name'
                        onChange={handleChange}
                        required
                        />
                </div>
                <div>
                    <label>Type: </label>
                    <select value={values.type} 
                        onChange={handleChange}
                        name='type'>
                            <option selected>Select One</option>
                            <option value='Movie'>Movie</option>
                            <option value='TV Show'>TV Show</option>
                            <option value='Book'>Book</option>
                        </select>
                </div>
                <div>
                    <label>Summary: </label>
                    <input value={values.summary}
                        name='summary'
                        onChange={handleChange}
                        required
                        />
                </div>
                <div>
                    <label>Genre: </label>
                    <input value={values.genre}
                        name='genre'
                        onChange={handleChange}
                        required
                        />
                </div>
                <div>
                    <label>Length: </label>
                    <input value={values.length}
                        name='length'
                        onChange={handleChange}
                        required
                        />
                </div>
                <button className='form-btn' onClick={info}>SUBMIT</button>
            </form>
            <button className='form-btn' onClick={toggleForm}>CLOSE</button>
        </>
    )
}

export default Form;