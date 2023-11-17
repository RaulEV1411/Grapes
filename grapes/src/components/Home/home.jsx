import {React, useState} from 'react'
import PrivateText from '../PrivateText/PrivateText'
import Logout from '../Logout/logout'
import Navbar from '../NavBar/Navbar.jsx';
const Home = ({currUser, setCurrUser}) => {
  const [show, setShow]=useState(true)
  if(currUser) 
  return (
<div>
  <Navbar/>
  <main id="main" class="flexbox-col">
  <h2>Lorem ipsum!</h2>
  Hello {currUser.email}
          <PrivateText currUser={currUser}/>
          <Logout setCurrUser={setCurrUser}/>
</main>

          </div>
      )
      };
export default Home;