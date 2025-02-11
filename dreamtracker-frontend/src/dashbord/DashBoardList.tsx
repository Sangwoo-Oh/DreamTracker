import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  deleteBucketListItem,
  updateBucketListItemAchieved,
  updateBucketListItemTitle,
} from "../services/bucketlist/bucketlist.service";
import { useState } from "react";

interface DashBoardListProps {
  goals: {
    id: number;
    title: string;
    progress: number;
    is_public: boolean;
    is_achieved: boolean;
    likes: number;
  }[];
  setListItems: (value: any[]) => void;
}

export default function DashBoardList({
  goals,
  setListItems,
}: DashBoardListProps) {
  return (
    <>
      <List>
        {goals.map((goal) => (
          <DashBoardListItem
            key={goal.id}
            goal={goal}
            goals={goals}
            setListItems={setListItems}
          />
        ))}
      </List>
    </>
  );
}

interface DashBoardListItemProps {
  goal: {
    id: number;
    title: string;
    progress: number;
    is_public: boolean;
    is_achieved: boolean;
    likes: number;
  };
  goals: {
    id: number;
    title: string;
    progress: number;
    is_public: boolean;
    is_achieved: boolean;
    likes: number;
  }[];
  setListItems: (value: any[]) => void;
}
function DashBoardListItem(props: DashBoardListItemProps) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editGoal, setEditGoal] = useState(props.goal.title);

  const handleDelete = async (id: number) => {
    try {
      setDeleteLoading(true);
      await deleteBucketListItem(id);
      props.setListItems(props.goals.filter((goal) => goal.id !== id));
      setDeleteLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("DeleteBucketListItem Error:", error.message);
      } else {
        console.error("Unexpected error", error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateBucketListItemTitle(props.goal.id, editGoal);
      props.setListItems(
        props.goals.map((goal) => {
          if (goal.id === props.goal.id) goal.title = editGoal;
          return goal;
        })
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("UpdateBucketListItem Error:", error.message);
      } else {
        console.error("Unexpected error", error);
      }
    } finally {
      setIsEditing(false);
    }
  };

  const onToggleAchieved = async (id: number) => {
    try {
      await updateBucketListItemAchieved(id, !props.goal.is_achieved);
      props.setListItems(
        props.goals.map((goal) => {
          if (goal.id === id) goal.is_achieved = !goal.is_achieved;
          return goal;
        })
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("UpdateBucketListItemAchieved Error:", error.message);
      } else {
        console.error("Unexpected error", error);
      }
    }
  };
  return (
    <>
      <ListItem className="mb-3">
        <Checkbox
          onChange={() => onToggleAchieved(props.goal.id)}
          checked={props.goal.is_achieved}
        />
        {isEditing ? (
          <>
            <TextField
              fullWidth={true}
              value={editGoal}
              onChange={(e) => setEditGoal(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  padding: "6px",
                },
              }}
            />
            <Tooltip title="Save">
              <IconButton onClick={handleSaveClick} disabled={editGoal === ""}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Box className="flex items-center justify-between">
              <Typography fontWeight={"fontWeightBold"}>
                {props.goal.title}
              </Typography>
            </Box>
            <Tooltip title="Edit">
              <IconButton onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </>
        )}

        {deleteLoading ? (
          <CircularProgress />
        ) : (
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(props.goal.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </ListItem>
    </>
  );
}
