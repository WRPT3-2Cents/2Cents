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
    const [searchParams, setSearchParams] = useState('');

    useEffect(() => {
        axios.get(`/api/titles`)
            .then(res => {
                setTitles(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    
    const handleChange = (e) => {
        setSearchParams(e.target.value);
    }
    

    const toggleForm = () => {
        setFormStatus(!formStatus);
    }

    const filteredTitles = titles.filter(title => title.name.toLowerCase().includes(searchParams));

    return (
        
        <>  
            <section className='search-bar'>
                <input value={searchParams} onChange={handleChange} placeholder='Search...'/>
                <button onClick={toggleForm}>Add New Title</button>
            </section>

            {/* <List /> */}

            {filteredTitles.map(title => {
                return (
                    <li className='titles' key={title.title_id}>
                    <Link to={`Title/${title.name}/${title.title_id}`} className='title-details'>
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
                                    setTitles={setTitles}
                                    />
                            </Modal>}
        </>
    )
}

export default Home;