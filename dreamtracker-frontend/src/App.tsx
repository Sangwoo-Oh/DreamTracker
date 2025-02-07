import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Login from './Login'
import SignUp from './SignUp'
import { useNavigate } from 'react-router';
import { verifyToken, signOut, authGuard } from "./services/auth/auth.service";
import { Container, Typography } from '@mui/material';
import HeaderTitle from './Header';

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const verifiedToken = await verifyToken();
        if (!verifiedToken) {
          throw new Error("Token is invalid or missing");
        }
        console.log(verifiedToken);
        setUser(verifiedToken);
      } catch {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  
  const handleSignOut = () => {
    signOut()
    .then(() => {
      console.log("User signed out");
      setUser(null);
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
  }


  return (
    <>
      <h1 className='text-7xl font-bold'>This is Home!</h1>
      { user ? (
        <button
        onClick={handleSignOut}
        type="button"
        className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Sign out
        </button>
      ) : (
        <></>
      )}
    </>
  )
}

function App() {

  return (
    <BrowserRouter>
      <div className='App bg-gray-100'>
        <Container maxWidth="xs" className='bg-white'>
          <HeaderTitle />
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
