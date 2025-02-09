import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { verifyToken, signOut } from "../services/auth/auth.service";
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import DashBoardMenu from "./DashBoardMenu";
import DashBoardList from "./DashBoardList";

const mockData = [
  {
    title: "Travel to Paris",
    category: "Travel",
    progress: 100,
    is_public: true,
    likes: 100,
  },
  {
    title: "Learn to code",
    category: "Education",
    progress: 50,
    is_public: true,
    likes: 50,
  },
  {
    title: "Start a business",
    category: "Business",
    progress: 10,
    is_public: false,
    likes: 10,
  },
]

export default function DashBoard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userCredential = await verifyToken();
        if (!userCredential) {
          throw new Error("Token is invalid or missing");
        }
        console.log("User signed in:", userCredential);
        setUser(userCredential);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
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
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <Box>
          <Box className="mb-10">
            <Typography variant="h5">Welcome, {user?.email}</Typography>
          </Box>

          <Box className="mb-6">
            <Box className="mb-6">
              <Button fullWidth variant="contained" color="primary">
                Add New Goals
              </Button>
            </Box>
            <Box className="mb-6">
              <Typography fontWeight={"fontWeightBold"} variant="h6" className="font-semibold">
                Bucketlist Summary
              </Typography>
            </Box>
            <Routes>
              <Route path="/" element={<DashBoardMenu user={user}/>} />
              <Route path="/completed-goals" element={<DashBoardList goals={mockData}/>} />
              {/* <Route path="/total-goals" element={<DashBoardList type="total"/>} /> */}
            </Routes>
          </Box>
        </Box>

        {user ? (
          <Button fullWidth variant="contained" color="primary" onClick={handleSignOut}>
            Sign out
          </Button>
        ) : null}
      </div>
    </div>
  );
}
