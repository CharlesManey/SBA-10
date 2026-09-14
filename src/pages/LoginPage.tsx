import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";



function LoginPage() {
  const navigate = useNavigate();

  const {login} =  useAuth();

  const handleClick = () => {
    login();
    navigate('/');
  };

  return(
    <div>
      <h2>Login Page</h2>

      <button onClick={handleClick}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;