import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBucketListItem } from "../services/bucketlist/bucketlist.service";
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

  return (
    <>
      <ListItem className="mb-3">
        <Box className="flex items-center justify-between">
          <Typography fontWeight={"fontWeightBold"}>
            {props.goal.title}
          </Typography>
        </Box>
        {deleteLoading ? (
          <CircularProgress />
        ) : (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon onClick={() => handleDelete(props.goal.id)} />
            </IconButton>
          </Tooltip>
        )}
      </ListItem>
    </>
  );
}
