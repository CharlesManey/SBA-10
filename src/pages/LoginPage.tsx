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
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-5">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-900 tracking-tight">Login Page</h1>

        <button onClick={handleClick}
        className="text-amber-100 border rounded-md border-black px-2 p-0.5 
        bg-amber-900 
        hover:drop-shadow-sm 
        hover:drop-shadow-amber-600 
        hover:text-amber-400">
          Login
        </button>
      </div>
    </div>
  );
}


export default LoginPage;