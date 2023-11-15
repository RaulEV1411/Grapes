import './App.css';
import Singup from './components/SingUp/singup.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import User from './components/User/user.jsx'


function App() {
  const [currUser, setCurrUser]=useState(null);

  return (
    <div className='first'>
      <div className='Routes'>
    <Router>
      <Routes>
        <Route path='/signup' element={<Singup/>} />
      </Routes>
    </Router >
      </div>
      <div>
      {/* <User currUser={currUser} setCurrUser={setCurrUser} /> */}
      </div>


    </div>
    
  );
}

export default App;
