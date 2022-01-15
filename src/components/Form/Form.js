import axios from 'axios';
import React from 'react';
import useForm from '../../utils/useForm';
import './form.css';
import { MDBCol, MDBInput, MDBIcon } from "mdbreact";
const Form = ({toggleForm, setTitles}) => {
    const [values, handleChange] = useForm();

    const info = (e) => {
        e.preventDefault();
        if (values.type === 'Book'){
                    axios.get(`http://openlibrary.org/search.json?title=${values.name}`)
                    .then(({data}) => {
                        const poster = `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`
                        const newTitle = { ...values, poster}
                            axios.post(`/api/titles`, newTitle)
                                    .then(res => {
                                        toggleForm();
                                        setTitles(res.data)
                                    })
                             })
                        .catch(err => console.log(err))
        } else {
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
    }
    return (
        <>
            <MDBCol>
            <button className='form-btn' onClick={toggleForm}><MDBIcon icon="times-circle" /></button>
            <form className='form' noValidate>
                <h2 className='text-center'>Start a discussion about your favorite Movie, TV Show, or Book.</h2>
                <div>
                    {/* <label>Title: </label> */}
                    <MDBInput value={values.name}
                        name='name'
                        onChange={handleChange}
                        required
                        label='Title:'
                        size='lg'
                        />
                </div>
                <div>
                    {/* <label>Genre: </label> */}
                    <MDBInput value={values.genre}
                        name='genre'
                        onChange={handleChange}
                        required
                        label='Genre:'
                        size='lg'
                        />
                </div>
                <div>
                    {/* <label>Length: </label> */}
                    <MDBInput value={values.length}
                        name='length'
                        onChange={handleChange}
                        required
                        label='Length:'
                        size='lg'
                        />
                </div>
                <div>
                    <label>Type: </label>
                    <select value={values.type} 
                        onChange={handleChange}
                        name='type' className="browser-default custom-select">
                            <option selected>Select One</option>
                            <option value='Movie'>Movie</option>
                            <option value='TV Show'>TV Show</option>
                            <option value='Book'>Book</option>
                        </select>
                </div>
                <div>
                    <label>Summary: </label>
                    <textarea value={values.summary}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                        name='summary'
                        onChange={handleChange}
                        required
                        />
                </div>
                <button className='form-btn-submit' onClick={info}>SUBMIT</button>
            </form>
            </MDBCol>
        </>
    )
}

export default Form;