import {React} from 'react'
import PrivateText from '../PrivateText/PrivateText'
import Navbar from '../NavBar/Navbar.jsx';
const Home = ({currUser,setCurrUser}) => {

  if(currUser) 
  return (
<div>
  <Navbar setCurrUser={setCurrUser}/>
  <main id="main" className="flexbox-col">
    <h2>Lorem ipsum!</h2>
      Hello {currUser.email}
      <PrivateText currUser={currUser}/>
  </main>
  <div id="body" className='flexbox-col'>

    <h1>hola amigo soy el cuerpe</h1>
  </div>

</div>
      )
      };
export default Home;