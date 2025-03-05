import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/pages/Home/Home'
import AdminProfile from './components/pages/Admin/AdminProfile';
import About from './components/pages/AboutUs/About';
import Login from './components/pages/Admin/Login';
import Signup from './components/pages/Admin/Signup';
import Volunteers from './components/pages/AboutUs/Volunteers';
import ForgotPassword from './components/pages/Admin/ForgotPassword';
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/AdminProfile' element={<AdminProfile/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/volunteers' element={<Volunteers/>}/>
      <Route path='/Home' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
