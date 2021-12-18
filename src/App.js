import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './components/Home/Home';
import Title from './components/Title/Title';
import Follows from './components/Follows/Follows';
import Profile from './components/Profile/Profile';
import Nav from './components/Nav/Nav';

const App = () => {

  return (
    <div className="App">
      <Nav />
      <Home />
      <Title />
      {/* <Follows /> */}
      {/* <Profile /> */}
    </div>
  );

}

export default App;
