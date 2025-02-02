import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './Login'
import SignUp from './SignUp'
import { useNavigate } from 'react-router';
import { auth, onAuthStateChanged, signOut } from "./services/auth/firebase";

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      console.log("User signed out");
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
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
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
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
