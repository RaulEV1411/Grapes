import { React } from 'react'
import Navbar from '../NavBar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import './Home.css';
const Home = ({ setCurrUser }) => {
  return (
    <div className="home-container">
      <Navbar setCurrUser={setCurrUser} />
      <div className="App">
        <header className="App-header">
          <h1>Bienvenido a Tu Sitio Web </h1>
          <p></p>
        </header>
        <main className="App-main">
          <h2>Sobre Nosotros</h2>
          <p>Aquí puedes escribir más sobre ti y tu sitio web.</p>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;