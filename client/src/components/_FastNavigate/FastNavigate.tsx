import { useNavigate } from 'react-router-dom';
import './FastNavigate.css'

const FastNavigate = () => {
  const navigate = useNavigate();

  return (
    <div className='divStyle'>
      <button 
        className='buttonStyle' 
        onClick={() => navigate("/auth/login")}
      >
        Login
      </button>
      <button 
        className='buttonStyle' 
        onClick={() => navigate("/handbook")}
      >
        Handbook
      </button>
      <button 
        className='buttonStyle' 
        onClick={() => navigate("/employee/:id")}
      >
        Employee
      </button>
      <button 
        className='buttonStyle' 
        onClick={() => navigate("/tree")}
      >
        Tree
      </button>
      <button 
        className='buttonStyle' 
        onClick={() => navigate("/applications")}
      >
        Applications
      </button>
      <button 
        className='buttonStyle' 
        onClick={() => navigate("/newslist")}
      >
        News List
      </button>
      <button 
        className='buttonStyle' 
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <button 
        className='buttonStyle' 
        onClick={() => navigate("/chat")}
      >
        Chat
      </button>
    </div>
  );
};


export default FastNavigate;