import React, { useState } from 'react';
import './home.css';
import List from '../List/List';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';
// import axios from 'axios'

const Home = () => {

    const [formStatus, setFormStatus] = useState(false);
    // const [useOptions, setOptions] =useState([])

    const testList = ['movie', 'tv show', 'book'];
    // getTitles => select all titles and set state to equal response
    //              response will then be put into List component for display

    // search => filter List and only display titles with the characters included in the search

    const toggleForm = () => {
        setFormStatus(!formStatus);
    }

    const fields = ['Name', 'Type', 'Length', 'Genre', 'Description'];

    return (
        <>  
            <section className='search-bar'>
                <h6>SEARCH...</h6>
                <h1 onClick={toggleForm}>+</h1>
            </section>

            <h1>Home</h1>

            <List list={testList} />

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