import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import VerifyAccount from './pages/VerifyAccount/VerifyAccount';
import Signup from './pages/Signup/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup/>}/>
          <Route exact path="/verify" element={<VerifyAccount/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
