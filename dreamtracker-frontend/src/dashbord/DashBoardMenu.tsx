import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useNavigate } from "react-router"; 

interface DashBoardMenuProps {
  user: {
    email: string;
  };
}

export default function DashBoardMenu({user}: DashBoardMenuProps) {
    const navigate = useNavigate();
    return (
        <>
            <Box className="mb-3" onClick={() => navigate("/completed-goals")}>
              <Typography fontWeight={"fontWeightBold"}  className="cursor-pointer hover:underline">
                <CheckCircleOutlineIcon />
                Completed goals
              </Typography>
            </Box>
            <Box className="mb-3" onClick={() => navigate("/total-goals")}>
              <Typography fontWeight={"fontWeightBold"} className="cursor-pointer hover:underline">
                <ChecklistIcon />
                Total goals
              </Typography>
            </Box>
        </>
    )
}