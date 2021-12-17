import React, { useState } from 'react';
import './home.css';
import List from '../List/List';

const Home = () => {

    const [formStatus, setFormStatus] = useState(false);

    const testList = ['movie', 'tv show', 'book'];
    // getTitles => select all titles and set state to equal response
    //              response will then be put into List component for display

    // search => filter List and only display titles with the characters included in the search

    const toggleForm = () => {
        setFormStatus(!formStatus);
    }

    return (
        <>  
            <section className='search-bar'>
                <h6>SEARCH...</h6>
                <h6 onClick={toggleForm}>+</h6>
            </section>

            <h1>Home</h1>

            <List list={testList} />

            {formStatus  && <Modal>
                </Modal>}
        </>
    )
}

export default Home;