import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { verifyToken, signOut } from "./services/auth/auth.service";
import { Box, Button, Paper, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChecklistIcon from "@mui/icons-material/Checklist";

export default function DashBoard() {
  const [user, setUser] = useState<any>(null);
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

  return (
    <>
      <div className="flex justify-center h-screen">
        <div className="w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
          <Box>
            <Box className="mb-10">
              <Typography variant="h5">Welcome, {user?.email}</Typography>
            </Box>

            <Box className="mb-6">
              {/* <Box className="mb-6">
                        <Typography 
                            fontWeight={'fontWeightBold'}
                            variant="h6"
                            >Goal Progress</Typography>
                        <Box className="border border-gray-300 rounded p-1">
                            <span className='text-xs'>Completion rate</span>
                        </Box>
                    </Box> */}
              <Box className="mb-6">
                <Box className="mb-6">
                  <Button fullWidth variant="contained" color="primary">
                    Add New Goals
                  </Button>
                </Box>
                <Box className="mb-6">
                  <Typography
                    fontWeight={"fontWeightBold"}
                    variant="h6"
                    className="font-semibold"
                  >
                    Bucketlist Summary
                  </Typography>
                </Box>
                <Box className="mb-3">
                  <Typography
                    fontWeight={"fontWeightBold"}
                    className="font-semibold"
                  >
                    <CheckCircleOutlineIcon />
                    Completed goals
                  </Typography>
                </Box>
                <Box className="mb-3">
                  <Typography
                    fontWeight={"fontWeightBold"}
                    className="font-semibold"
                  >
                    <ChecklistIcon />
                    Total goals
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          {user ? (
            <>
              <Button
                fullWidth={true}
                variant="contained"
                color="primary"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
