import '../styles/App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Choix from './Choix';
import NavbarHome from './NavbarHome';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
    <NavbarHome/>
    <Routes>
      <Route path="/" element={<Choix />}/>
    </Routes>
  </div>
  );
}

export default App;