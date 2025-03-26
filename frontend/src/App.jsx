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
import PendingApproval from './components/pages/Admin//AdminPanel/PendingApproval';
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
import AddStudentForm from './components/pages/Admin/AdminPanel/AddStudentForm';
import AddVolunteer from './components/pages/Admin/AdminPanel/AddVolunteer';
import Error from './components/pages/Error/Error';
import AddAlumni from './components/pages/Admin/AdminPanel/AddAlumni';
import Dashboard from './components/pages/Admin/Dashboard';
import AddActivities from './components/pages/Admin/AdminPanel/AddActivities';
import AddFestivals from './components/pages/Admin/AdminPanel/AddFestivals';
import AddInduction from './components/pages/Admin/AdminPanel/AddInduction';
import AddFarewell from './components/pages/Admin/AdminPanel/AddFarewell';
import AddHomePageImage from './components/pages/Admin/AdminPanel/AddHomePageImage';
import Feedback from './components/pages/Admin//AdminPanel/Feedback';
import AddNotification from './components/pages/Admin/AdminPanel/AddNotification';
import Notification from './components/pages/Admin/Notification';
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/about/alumni' element={<Alumni/>}/>
      <Route path='/about/students' element={<Students/>}/>
      <Route path='/about/volunteers' element={<Volunteers/>}/>
      <Route path='/reset-password/:resetToken' element={<ResetPassword/>}/>
      <Route path='/admin/profile' element={<AdminProfile/>}/>
      <Route path='/admin/dashboard'element={<Dashboard/>}/>
      <Route path='/admin/login' element={<Login/>}/>
      <Route path='/admin/signup' element={<Signup/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/changepassword' element={<ChangePassword/>}/>
      <Route path='/admin/dashboard/pending-approvals' element={<PendingApproval/>}/>
      <Route path='/admin/updateadmin' element={<UpdateAdmin/>}/>
      <Route path='/cloth-donations' element={<ClothDonation/>}/>
      <Route path='/events/activities' element={<Activities/>}/>
      <Route path='/events/farewell' element={<Farewell/>}/>
      <Route path='/events/festivals' element={<Festival/>}/>
      <Route path='/events/induction' element={<Induction/>}/>
      <Route path='/gallery' element={<Gallery/>}/>
      <Route path='/admin/dashboard/add-students' element={<AddStudentForm/>}/>
      <Route path='/admin/dashboard/add-volunteers' element={<AddVolunteer/>}/>
      <Route path='/admin/dashboard/add-alumni' element={<AddAlumni/>}/>
      <Route path='/admin/dashboard/add-activities' element={<AddActivities/>}/>
      <Route path='/admin/dashboard/add-festivals' element={<AddFestivals/>}/>
      <Route path='/admin/dashboard/add-freshersInduction' element={<AddInduction/>}/>
      <Route path='/admin/dashboard/add-farewell' element={<AddFarewell/>}/>
      <Route path='/admin/dashboard/add-homePageImage' element={<AddHomePageImage/>}/>
      <Route path='/admin/dashboard/feedback' element={<Feedback/>}/>
      <Route path='/admin/dashboard/add-notification' element={<AddNotification/>}/>
      <Route path='/home/notification' element={<Notification/>}/>
      <Route path='*' element={<Error/>}/>


    </Routes>
    </BrowserRouter>
  )
}

export default App
