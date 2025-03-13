import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
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
import Alumni from './components/pages/AboutUs/Alumni';
import Students from './components/pages/AboutUs/Students';
import Volunteers from './components/pages/AboutUs/Volunteers';
import ClothDonation from './components/pages/Donation_Drive/ClothDonation';
import Activities from './components/pages/Events/Activities';
import Farewell from './components/pages/Events/Farewell';
import Festival from './components/pages/Events/Festival';
import Induction from './components/pages/Events/Induction';
import Gallery from './components/pages/Gallery/Gallery';
import Events from './components/pages/Events/Events';
import Error from './components/pages/Error/Error';
import Origami from './components/pages/Events/Origami';
import Sports from './components/pages/Events/Sports';
import Profile from './components/pages/Profile/Profile';
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/about/alumni' element={<Alumni/>}/>
      <Route path='/about/students' element={<Students/>}/>
      <Route path='/about/volunteers' element={<Volunteers/>}/>
      <Route path='/resetPassword' element={<ResetPassword/>}/>
      <Route path='/admin/adminProfile' element={<AdminProfile/>}/>
      <Route path='/admin/login' element={<Login/>}/>
      <Route path='/admin/signup' element={<Signup/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/changepassword' element={<ChangePassword/>}/>
      <Route path='/admin/pendingapproval' element={<PendingApproval/>}/>
      <Route path='/admin/updateadmin' element={<UpdateAdmin/>}/>
      <Route path='/donation' element={<ClothDonation/>}/>
      <Route path='/events' element={<Events/>}/>
      <Route path='/events/activities' element={<Activities/>}/>
      <Route path='/events/farewell' element={<Farewell/>}/>
      <Route path='/events/origami' element={<Origami/>}/>
      <Route path='/events/sports' element={<Sports/>}/>
      <Route path='/events/festivals' element={<Festival/>}/>
      <Route path='/events/induction' element={<Induction/>}/>
      <Route path='/gallery' element={<Gallery/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='*' element={<Error/>}/>


    </Routes>
    </BrowserRouter>
  )
}

export default App
