import {React} from 'react'
import PrivateText from '../PrivateText/PrivateText'
import Logout from '../Logout/logout'
import Navbar from '../NavBar/Navbar.jsx';
const Home = ({currUser, setCurrUser}) => {
  if(currUser) 
  return (
<div>
  <Navbar/>
  <main id="main" className="flexbox-col">
  <h2>Lorem ipsum!</h2>
  Hello {currUser.email}
          <PrivateText currUser={currUser}/>
          <Logout setCurrUser={setCurrUser}/>
</main>

          </div>
      )
      };
export default Home;