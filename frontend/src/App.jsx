import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/pages/Home/Home'
import AdminProfile from './components/pages/Admin/AdminProfile';
import About from './components/pages/AboutUs/About';
import ResetPassword from './components/pages/Admin/ResetPassword';
import Login from './components/pages/Admin/Login';
import Signup from './components/pages/Admin/Signup';
import ForgotPassword from './components/pages/Admin/ForgotPassword';
import ChangePassword from './components/pages/Admin/ChangePassword';
import UpdateAdmin from './components/pages/Admin/UpdateAdmin';
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/resetPassword' element={<ResetPassword/>}/>
      <Route path='/adminProfile' element={<AdminProfile/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/changepassword' element={<ChangePassword/>}/>

      <Route path='/updateadmin' element={<UpdateAdmin/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
