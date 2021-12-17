import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useForm from '../../utils/useForm';
import './form.css';

const Form = ({fields, toggleForm}) => {
    const [values, handleChange] = useForm();
    // const [categories, setCategories] = useState([]);

    const info = (e) => {
        e.preventDefault();
        // axios.post(`/api/${page}`, values)
        //     .then(res => {
        //         console.log(res.data);
        //         toggleForm();
        //         setValues(res.data)
        //     })
        console.log(values);
    }

    return (
        <>
            <form className='form' noValidate>
                {fields.map((field, i) => {
                    return (
                        <div key={i}>
                            <label>{field.toUpperCase()}</label>:
                            <input value={values.field} 
                                name={field}
                                onChange={handleChange}
                                required
                                />
                        </div>
                    )
                })
            }
                <button className='form-btn' onClick={info}>SUBMIT</button>
            </form>
            <button className='form-btn' onClick={toggleForm}>CLOSE</button>
        </>
    )
}

export default Form;