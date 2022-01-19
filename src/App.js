import logo from './logo.svg';
import './App.css';
import React, {useEffect} from 'react';
import Nav from './components/Nav/Nav';
import routes from './routes';


const App = () => {
  
useEffect(() => {
  
},[])

  return (
    <div className="App">
      <Nav />
        <section className='main'>

        {routes}

        </section>
      
    </div>
  );

}

export default App;
