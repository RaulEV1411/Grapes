import {React} from 'react'
import PrivateText from '../PrivateText/PrivateText'
import Navbar from '../NavBar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
  const Home = ({ currUser, setCurrUser }) => {
    return (
      <div className="home-container">
        {/* Navbar */}
        <Navbar setCurrUser={setCurrUser} />
  
        {/* Contenido principal */}
        <main id="main" className="flexbox-col">
          <h2>Lorem ipsum!</h2>
          {/* Saludo al usuario actual */}
          {currUser && <p>Hello {currUser.email}</p>}
          
          {/* Componente privado */}
          <PrivateText currUser={currUser}/>
        </main>
  
        {/* Cuerpo adicional */}
        <div id="body" className='flexbox-col'>
          <h1>hola amigo soy el cuerpo</h1>
        </div>
  
        {/* Footer */}
        <Footer />
      </div>
    );
  };
  
  export default Home;