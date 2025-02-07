import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./Login";
import SignUp from "./SignUp";

import { Container } from "@mui/material";
import HeaderTitle from "./Header";
import DashBoard from "./dashbord/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-gray-100">
        <Container maxWidth="xs" className="bg-white">
          {/* <HeaderTitle /> */}
          <Routes>
            <Route path="/*" element={<DashBoard />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
