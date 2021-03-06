import React, { useEffect, useState } from 'react';
import './home.css';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBIcon } from 'mdbreact';

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
            <section className='search-bar' >
                <input value={searchParams} onChange={handleSearch} className="form-control form-control-sm ml-3 w-40" type="text" placeholder="Search..." aria-label="Search"/>
                <div>
                    <label className='filter-label'>Filter</label>
                    <select value={typeToFilterBy} 
                        onChange={handleChange}
                        name='type'
                        className='filter-drop'>
                            <option defaultValue>Select One</option>
                            <option value='Movie'>Movie</option>
                            <option value='TV Show'>TV Show</option>
                            <option value='Book'>Book</option>
                        </select>
                </div>
                {loggedInStatus &&  <button onClick={toggleForm} className='add-new-title-btn'><MDBIcon icon="plus-circle" /></button>}
            </section>


            <section className='flex-box'>
            {filteredTitles.map(title => {

                if (typeToFilterBy){
                    if (typeToFilterBy === title.type){
                        return (
                            <li className='titles' key={title.title_id}>
                            <Link to={`Title/${title.name}/${title.title_id}`} className='title-details'>
                                <img src={title.poster} alt = "title poster" className='img-title'/>
                                <h2>{title.name}</h2>
                                <h6>{title.genre}</h6>
                                <h6>{title.type}</h6>
                            </Link>
                            </li> )
                    } else if (typeToFilterBy === 'Select One'){
                        return (
                            <li className='titles' key={title.title_id}>
                            <Link to={`Title/${title.name}/${title.title_id}`} className='title-details'>
                                <img src={title.poster} alt = "title poster" className='img-title'/>
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
                            <img src={title.poster} alt = "title poster" className='img-title'/>
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