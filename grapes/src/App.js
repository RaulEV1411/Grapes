import './App.css';
import Register from './components/register/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/signup' element={<Register />} />
      </Routes>
    </Router >
    </div>
  );
}

export default App;
