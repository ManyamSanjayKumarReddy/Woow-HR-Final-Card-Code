import './App.css';
import CertificateContainer from './components/certificate/CertificateContainer';
import html2pdf from 'html2pdf.js';
import LinkedinLogin from './components/LinkedinLogin/LinkedinLogin';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';


import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route index element={<LinkedinLogin/>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='ProudMemberCard' element={<CertificateContainer></CertificateContainer>}></Route>
      </Routes>
    </div>
  );
}

export default App;
