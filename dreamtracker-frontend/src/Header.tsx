import { Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function HeaderTitle() {
  const location = useLocation();
  const titleMap: any = {
    "/": "Home",
    "/login": "Login",
    "/signup": "Sign Up",
  };

  return (
    <Typography variant="h6" component="h1">
      {titleMap[location.pathname] || "Not Found"}
    </Typography>
  );
}
