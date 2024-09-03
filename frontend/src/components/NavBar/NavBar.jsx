import React, { useContext, useEffect, useState } from 'react';
import './NavBar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const NavBar = ({ setShowLogin }) => {
  let [menu, setMenu] = useState("home");

  let { getTotalCartAmount, token, setToken, url } = useContext(StoreContext);
  let [role, setRole] = useState(null);
  const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

  let navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (token) {
        try {
          const response = await axios.get(`${url}/api/user/role`, {
            headers: { token }
          });
          if (response.data) {
            setRole(response.data.role);
          } else {
            console.error('Response data is undefined');
          }
        } catch (error) {
          console.error('Error in getting role:', error);
        }
      }
    };  
    fetchUserRole();
  }, [url, token]);  

  let logout = () => {
    setToken("");
    localStorage.removeItem('token');
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='/#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='/#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-all</a>
        <a href='/#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
        {role === 'admin' && (
          <Link to={ADMIN_URL}> Admin Panel</Link>
        )}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-seach-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token
          ? <button onClick={() => { setShowLogin(true) }}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>}
      </div>
    </div>
  );
};

export default NavBar;