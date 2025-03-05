import React from 'react'
import {Link} from 'react-router-dom'
import userImage from "./../assets/user.png"; 
import Logo from "./../assets/logo.png"; 
const Header = () => {
  return (
    <header className="p-3 mb-3 border-bottom">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link to='/' className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
        <img src={Logo} alt="mdo" width="100" height="70"  />
        
        </Link>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to='/'className="nav-link px-2 link-secondary">Home</Link></li>
          <li><Link to='/gallery' className="nav-link px-2 link-body-emphasis">Gallery</Link></li>
          <li><Link to='/events' className="nav-link px-2 link-body-emphasis">Events</Link></li>
          <li><Link to='/donation' className="nav-link px-2 link-body-emphasis">Donation Drive</Link></li>
          <li><Link to='/about' className="nav-link px-2 link-body-emphasis">About Us</Link></li>
        </ul>

        <div className="dropdown text-end">
          <Link to = '/adminProfile' className="d-block link-body-emphasis text-decoration-none"  aria-expanded="false">
          <img src={userImage} alt="mdo" width="32" height="32" className="rounded-circle" />
          </Link>
          
        </div>
      </div>
    </div>  
  </header>
  )
}

export default Header
