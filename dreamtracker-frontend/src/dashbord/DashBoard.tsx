import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { verifyToken, signOut } from "../services/auth/auth.service";
import { Box, Button, CircularProgress, Typography, TextField, List, ListItem } from "@mui/material";
import DashBoardMenu from "./DashBoardMenu";
import DashBoardList from "./DashBoardList";
import AddGoal from "./AddGoal";
import { getBucketListItems } from "../services/bucketlist/bucketlist.service";
import AISuggestion from "../suggestion/AISuggestion";

export default function DashBoard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);
  const navigate = useNavigate();
  const [listItems, setListItems] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchBucketListItems = async () => {
      try {
        const data = await getBucketListItems();
        setListItems(data);
        console.log(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("FetchBucketListItems Error:", error.message);
        } else {
          console.error("Unexpected error", error);
        }
      } finally {
        setItemsLoading(false);
      }
    };

    fetchBucketListItems();
  }, [setListItems]);

  const handleSignOut = () => {
    signOut()
      .then(() => {
        console.log("User signed out");
        setUser(null);
        navigate("/login");
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
            <Typography variant="h5">Welcome, {user?.displayName}</Typography>
          </Box>

          <Box className="mb-6">
            <Box className="mb-6">
              <AddGoal goals={listItems} setListItems={setListItems}/>
            </Box>

            <Box className="mb-6">
              <AISuggestion/>
            </Box>

            <Box className="mb-6">
              <Typography fontWeight={"fontWeightBold"} variant="h6" className="font-semibold">
                Bucketlist Summary
              </Typography>
            </Box>

            {/* <Routes>
              <Route path="/" element={<DashBoardMenu user={user}/>} />
              <Route path="/completed-goals" element={<DashBoardList goals={mockData}/>} />
              <Route path="/total-goals" element={<DashBoardList type="total"/>} />
            </Routes> */}

            {itemsLoading ? (
              <div className="flex justify-center items-center h-40">
                <CircularProgress />
              </div>
            ) : (
              <DashBoardList goals={listItems} setListItems={setListItems}/>
            )}
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
