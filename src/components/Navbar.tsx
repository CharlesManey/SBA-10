import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";



function NavBar() {

  const {isAuthenticated, logout} = useAuth();

  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return(
    <nav style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
      {/* Nav to home page */}
      <NavLink 
      to='/'
      style={({isActive}) => ({color: isActive ? 'red' : 'white'})}
      >Home</NavLink>
      {/* Nav to category page */}
      <NavLink 
      to='/category'
      style={({isActive}) => ({color: isActive ? 'red' : 'white'})}
      >Categories</NavLink>
      {/* Nav to favorites page appears when authenticated */}
      {isAuthenticated && 
      <NavLink 
      to='/favorites'
      style={({isActive}) => ({color: isActive ? 'red' : 'white'})}
      >Favorites</NavLink>
      }
      {/* Nav to login page or signout button when logged in */}
      {isAuthenticated ? <button onClick={onLogout}>Sign Out</button>
      : <NavLink 
      to='/login'
      style={({isActive}) => ({color: isActive ? 'red' : 'white'})}
      >Login</NavLink>}
    </nav>
  );
}

export default NavBar;