import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/pages/Home/Home'
import AdminProfile from './components/pages/Admin/AdminProfile';
import About from './components/pages/AboutUs/About';
import ResetPassword from './components/pages/Admin/ResetPassword';
import Login from './components/pages/Admin/Login';
import Signup from './components/pages/Admin/Signup';
import ForgotPassword from './components/pages/Admin/ForgotPassword';
import ChangePassword from './components/pages/Admin/ChangePassword';
import PendingApproval from './components/pages/Admin/PendingApproval';
import UpdateAdmin from './components/pages/Admin/UpdateAdmin';
import Activities from './components/pages/Events/Activities';
import Farewell from './components/pages/Events/Farewell';
import Origami from './components/pages/Events/Origami';
import Drawing from './components/pages/Events/Drawing';
import Sports from './components/pages/Events/Sports';
import Festival from './components/pages/Events/Festival';
import Induction from './components/pages/Events/Induction';
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
      <Route path='/pendingapproval' element={<PendingApproval/>}/>
      <Route path='/updateadmin' element={<UpdateAdmin/>}/>
      
      <Route path='/activities' element={<Activities/>}/>
      <Route path="/sports" element={<Sports />} />
      <Route path="/drawing" element={<Drawing />} />
      <Route path="/origami" element={<Origami />} />

      <Route path='/farewell' element={<Farewell/>}/>
      <Route path="/festival" element={<Festival />} />
      <Route path="/induction" element={<Induction />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
