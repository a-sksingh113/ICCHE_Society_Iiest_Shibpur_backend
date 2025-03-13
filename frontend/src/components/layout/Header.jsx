import { Link } from "react-router-dom";
import Style from "../cssFiles/header.module.css";

const Header = () => {
  return (
    <header className={Style.header}>
      <div className={Style.container}>
        <Link to="/" className={Style.logo}>
          <img src="../assets/logo.png" alt="Logo" className={Style.logoImage} />
        </Link>

        <nav className={Style.nav}>
          <ul className={Style.navList}>
            <li><Link to="/overview" className={Style.navItem}>Overview</Link></li>
            <li><Link to="/inventory" className={Style.navItem}>Inventory</Link></li>
            <li><Link to="/customers" className={Style.navItem}>Customers</Link></li>
            <li><Link to="/products" className={Style.navItem}>Products</Link></li>
          </ul>
        </nav>

        <div className={Style.rightSection}>
          <input type="search" className={Style.search} placeholder="Search..." />

          <div className={Style.profileDropdown}>
            <img src="https://github.com/mdo.png" alt="User" className={Style.profileImage} />
            <ul className={Style.dropdownMenu}>
              <li><a href="#">New project...</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Profile</a></li>
              <li><hr /></li>
              <li><a href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
