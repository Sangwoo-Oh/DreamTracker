import { Box, List, ListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router"; 

interface DashBoardListProps {
  goals: { 
    title: string;
    progress: number;
    is_public: boolean;
    likes: number;
  }[],
}

export default function DashBoardList({ goals }: DashBoardListProps) {
    const navigate = useNavigate();
    return (
        <>
          <Typography className="mb-3 cursor-pointer hover:underline" onClick={()=> navigate('/')}>{"<"} Back</Typography>
          <List>
            {goals.map((goal, index) => (
              <ListItem key={index} className="mb-3" onClick={() => navigate(`goal/${index}`)}>
                <Box className="flex items-center justify-between">
                  <Typography fontWeight={"fontWeightBold"}>{goal.title}</Typography>
                  <Typography>{goal.category}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </>
    )
}