import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {
  let [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <div className='nav'>
      <Link to='/' onClick={() => { setMenu("shop") }} style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="logo" />
        <p>Desi Connect</p>
      </Link>

      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link to='/'>Shop</Link>{menu === "shop" && <hr />}</li>
        <li onClick={() => setMenu("mens")}><Link to='/mens'>Apparel</Link>{menu === "mens" && <hr />}</li>
        <li onClick={() => setMenu("womens")}><Link to='/womens'>Accessories</Link>{menu === "womens" && <hr />}</li>
        <li onClick={() => setMenu("kids")}><Link to='/kids'>Festivities</Link>{menu === "kids" && <hr />}</li>
      </ul>

      {/* 🔍 Search Bar */}
      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/"); }}>Logout</button>
        ) : (
          <Link to='/login'><button>Login</button></Link>
        )}
        <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

export default Navbar;
