import logo from './logo.svg';
import './App.css';
import React from 'react';
import Nav from './components/Nav/Nav';
import routes from './routes';


const App = () => {

  return (
    <div className="App">
      <Nav />

        {routes}
      
    </div>
  );

}

export default App;
