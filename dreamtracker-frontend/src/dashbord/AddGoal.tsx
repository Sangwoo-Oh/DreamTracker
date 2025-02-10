import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { createBucketListItem } from "../services/bucketlist/bucketlist.service";

interface AddGoalProps {
    goals: { 
      title: string;
      progress: number;
      is_public: boolean;
      is_achieved: boolean;
      likes: number;
    }[],
    setListItems: (value: any[]) => void;
  }

export default function AddGoal({goals, setListItems}: AddGoalProps) {
    const [newGoal, setNewGoal] = useState("");

    const handleAddGoal = async () => {

        try {
            const data = await createBucketListItem(newGoal);
            setListItems([data, ...goals]);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("AddGoal Error:", error.message);
            } else {
                console.error("Unexpected error", error);
            }
        }

        setNewGoal("");
    }


    return (
        <>
            <Box className="mb-6">
              <TextField value={newGoal} onChange={e=>setNewGoal(e.target.value)} className="!mb-5" label="New goal" variant="outlined" fullWidth />
              <Button onClick={handleAddGoal} fullWidth variant="contained" color="primary">
                Add New Goals
              </Button>
            </Box>
        </>
    )
}