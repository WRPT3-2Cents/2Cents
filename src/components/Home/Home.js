import React, { useEffect, useState } from 'react';
import './home.css';
import List from '../List/List';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Home = () => {

    const [formStatus, setFormStatus] = useState(false);
    const [titles, setTitles] = useState([]);

    const testList = ['movie', 'tv show', 'book'];

    useEffect(() => {
        axios.get(`/api/titles`)
            .then(res => {
                setTitles(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    // search => filter List and only display titles with the characters included in the search

    const toggleForm = () => {
        setFormStatus(!formStatus);
    }

    const fields = ['Name', 'Type', 'Length', 'Genre', 'Description'];

    return (



        <>  
            <section className='search-bar'>
                {/* <h6>SEARCH...</h6> */}
                <button onClick={toggleForm}>Add New Title</button>
            </section>

            <h1>Home</h1>

            {/* <List list={testList} /> */}

            {titles.map(title => {
                return (
                    <li className='titles' key={title.title_id}>
                    <Link to={`Title/${title.name}/${title.title_id}`}>
                        <h2>{title.name}</h2>
                        <h6>{title.genre}</h6>
                        <h6>{title.type}</h6>
                    </Link>
                    </li>
                )
            })}


            {formStatus  && <Modal>
                                <Form
                                    toggleForm={toggleForm}
                                    fields={fields}
                                    />
                            </Modal>}
        </>
    )
}

export default Home;