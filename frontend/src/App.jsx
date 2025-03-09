import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/pages/Home/Home'
import AdminProfile from './components/pages/Admin/AdminProfile';
import About from './components/pages/AboutUs/About';
import Login from './components/pages/Admin/Login';
import Signup from './components/pages/Admin/Signup';
import Volunteers from './components/pages/AboutUs/Volunteers';
import ForgotPassword from './components/pages/Admin/ForgotPassword';
import Activities from './components/pages/Events/Activities';
import Farewell from './components/pages/Events/Farewell';
import Festival from './components/pages/Events/Festival';
import Induction from './components/pages/Events/Induction';
import Students from './components/pages/AboutUs/Students';
import ClothDonation from './components/pages/Donation_Drive/ClothDonation';
import Gallery from './components/pages/Gallery/Gallery';
import Alumni from './components/pages/AboutUs/Alumni';
import Sports from './components/pages/Events/Sports';
import Drawing from './components/pages/Events/Drawing';
import Origami from './components/pages/Events/Origami';

function App() {
  return(
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/adminProfile' element={<AdminProfile/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/volunteers' element={<Volunteers/>}/>
      
      <Route path="/activities" element={<Activities />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/drawing" element={<Drawing />} />
      <Route path="/origami" element={<Origami />} />

      <Route path="/farewell" element={<Farewell />} />
      <Route path="/festival" element={<Festival />} />
      <Route path="/induction" element={<Induction />} />
      <Route path="/students" element={<Students />} />
      <Route path="/donation" element={<ClothDonation />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/alumni" element={<Alumni />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
