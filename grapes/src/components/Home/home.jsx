import { React } from 'react'
import PrivateText from '../PrivateText/PrivateText'
import Navbar from '../NavBar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './Home.css';
const Home = ({ currUser, setCurrUser }) => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar setCurrUser={setCurrUser} />
      <div className="App">
        <header className="App-header">
          <h1>Bienvenido a Tu Sitio Web</h1>
          <p></p>
        </header>
        <main className="App-main">
          <h2>Sobre Nosotros</h2>
          <p>Aquí puedes escribir más sobre ti y tu sitio web.</p>
          {currUser && <p>Hello {currUser.email}</p>}
          <PrivateText currUser={currUser} />
        </main>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;