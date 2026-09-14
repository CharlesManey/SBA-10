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
    <nav style={{display: 'flex', justifyContent: 'center', gap: '20px', paddingBottom: '10px'}}>
      {/* Nav to home page */}
      <NavLink 
      to='/'
      className={({isActive}) => isActive ? 'text-amber-400' : 'text-amber-100 hover:text-lg'}
      >Home</NavLink>
      {/* Nav to category page */}
      <NavLink 
      to='/categories'
      className={({isActive}) => isActive ? 'text-amber-400' : 'text-amber-100 hover:text-lg'}
      >Categories</NavLink>
      {/* Nav to favorites page appears when authenticated */}
      {isAuthenticated && 
      <NavLink 
      to='/favorites'
      className={({isActive}) => isActive ? 'text-amber-400' : 'text-amber-100 hover:text-lg'}
      >Favorites</NavLink>
      }
      {/* Nav to login page or signout button when logged in */}
      {isAuthenticated ? 
      <button className="text-amber-100 border rounded-md border-black px-2 p-0.5 
      bg-amber-900 
      hover:drop-shadow-sm 
      hover:drop-shadow-amber-600 
      hover:text-amber-400" 
      onClick={onLogout}>Sign Out</button>
      : <NavLink 
      to='/login'
      className={({isActive}) => isActive ? 'text-amber-400' : 'text-amber-100 hover:text-lg'}
      >Login</NavLink>}
    </nav>
  );
}

export default NavBar;