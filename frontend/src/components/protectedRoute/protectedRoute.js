import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/");
  };
  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "15%", color: "darkred" }}>
        <div>
          <h1>404 Not Found</h1>
          <div>
            <Button variant="contained" color="warning" onClick={login}>
              Go to Signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return children;
};

export default ProtectedRoute;
