import '../styles/App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Choix from './Choix';
import NavbarHome from './NavbarHome';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import TestRand from './TestRand';


function App() {
  return (
    <div>
    <NavbarHome/>
    <Routes>
      <Route path="/" element={<Choix />}/>
      <Route path="/test" element={<TestRand />}/>
    </Routes>
  </div>
  );
}

export default App;
