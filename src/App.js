import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav/Nav';
import routes from './routes';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserSession } from './redux/reducer';


const App = ({getUserSession}) => {
  const [shouldLoad, setshouldLoad ] = useState(false)

  useEffect(()=> {
   axios.get('/api/me')
   .then(res => getUserSession(res))
   .catch(err=>console.log(err))
   .finally(()=> setshouldLoad(true))
  },[]) 


  return (
    shouldLoad && (
    <div className="App">
      <Nav />
        <section className='main'>
        {routes}
        </section>
      
    </div>)
  );

}

export default connect(null, {getUserSession})(App);
