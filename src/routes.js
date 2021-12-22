import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Follows from './components/Follows/Follows';
import Title from './components/Title/Title';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

// Right now the default page is 'Home' but this will need to change once we have registration working
// A logged in user should default to 'Follows' after they log in
// A guest should default to 'Home' and should only have limited functionality available to them

export default (
    <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='Title/:title_name/:title_id' element={<Title />} />
        <Route path='Profile' element={<Profile/>} />
        <Route path='Follows' element={<Follows />} />
        <Route path='About' element={<About />} />
        <Route path="/Sign-up" element={<Register/>} />
        <Route path="/Login" element={<Login/>} />
    </Routes>
)
