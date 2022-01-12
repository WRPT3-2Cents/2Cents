import React, { useEffect, useState } from 'react';
import './home.css';
import List from '../List/List';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = (props) => {

    const [formStatus, setFormStatus] = useState(false);
    const [titles, setTitles] = useState([]);
    const [searchParams, setSearchParams] = useState('');
    const [loggedInStatus, setLoggedInStatus] = useState(false);
    const [typeToFilterBy, setTypeToFilterBy] = useState('');

    useEffect(() => {
        axios.get(`/api/titles`)
            .then(res => {
                setTitles(res.data)
            })
            .catch(err => console.log(err))
        setLoggedInStatus(props.state.loggedIn);
    }, []);

    
    const handleChange = (e) => {
        console.log(e.target.value);
        setTypeToFilterBy(e.target.value);
    }
    
    const handleSearch = (e) => {
        setSearchParams(e.target.value);
    }

    const toggleForm = () => {
        setFormStatus(!formStatus);
    }

    const filteredTitles = titles.filter(title => title.name.toLowerCase().includes(searchParams.toLowerCase()));

    return (
        
        <>  
            <section className='search-bar'>
                <input value={searchParams} onChange={handleSearch} placeholder='Search...'/>
                <div>
                    <label>Filter</label>
                    <select value={typeToFilterBy} 
                        onChange={handleChange}
                        name='type'>
                            <option selected>Select One</option>
                            <option value='Movie'>Movie</option>
                            <option value='TV Show'>TV Show</option>
                            <option value='Book'>Book</option>
                        </select>
                </div>
                {loggedInStatus &&  <button onClick={toggleForm} className='add-new-title-btn'>+</button>}
            </section>

            {/* <List /> */}

            <section className='flex-box'>
            {filteredTitles.map(title => {

                if (typeToFilterBy){
                    if (typeToFilterBy === title.type){
                        return (
                            <li className='titles' key={title.title_id}>
                            <Link to={`Title/${title.name}/${title.title_id}`} className='title-details'>
                                <div className='img-container'></div>
                                <img src={title.poster} alt = "title poster" />
                                <h2>{title.name}</h2>
                                <h6>{title.genre}</h6>
                                <h6>{title.type}</h6>
                            </Link>
                            </li> )
                    } else if (typeToFilterBy === 'Select One'){
                        return (
                            <li className='titles' key={title.title_id}>
                            <Link to={`Title/${title.name}/${title.title_id}`} className='title-details'>
                                <div className='img-container'></div>
                                <img src={title.poster} alt = "title poster" />
                                <h2>{title.name}</h2>
                                <h6>{title.genre}</h6>
                                <h6>{title.type}</h6>
                            </Link>
                            </li> )
                    }
                } else {
                    return (
                        <li className='titles' key={title.title_id}>
                        <Link to={`Title/${title.name}/${title.title_id}`} className='title-details'>
                            <div className='img-container'></div>
                            <img src={title.poster} alt = "title poster" />
                            <h2>{title.name}</h2>
                            <h6>{title.genre}</h6>
                            <h6>{title.type}</h6>
                        </Link>
                        </li> 
                    )
                }
                }) }
            </section>


            {formStatus  && <Modal>
                                <Form
                                    toggleForm={toggleForm}
                                    setTitles={setTitles}
                                    />
                            </Modal>}
        </>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        state: reduxState
    }
}

export default connect(mapStateToProps)(Home);