import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CircularLoading from "../circularloading/circularloading";
function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonLoad, setButtonLoad] = useState(false);
  const signUpClicked = async () => {
    if (userName === "" || email === "" || password === "") {
      alert("Please input all the fields");
    } else {
      setButtonLoad(true);
      const response = await fetch(`http://localhost:5000/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName,
          email: email,
          password: password,
        }),
      });
      const res = await response.json();
      console.log(response);
      setButtonLoad(false);
      if (res.errno === 1062) {
        alert("User already exist!!!");
      } else if (res.errno===200) {
        navigate("/");
      } else {
        alert("Cannot create user!!!");
      }
    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loggedIn")) === true) {
      navigate("/list");
    }
  });
  return (
    <>
      <Grid container spacing={2} sx={{ px: 3 }}>
        <Grid item xs></Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div className="signupOuter">
            <h1>SignUp</h1>

            <div>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                color="warning"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                color="warning"
                sx={{ my: 3 }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                color="warning"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={signUpClicked}
                sx={{ mt: 3 }}
                disabled={buttonLoad}
              >
                submit
                {buttonLoad && (
                  <div style={{ position: "absolute" }}>
                    <CircularLoading></CircularLoading>
                  </div>
                )}
              </Button>
              <div style={{ marginTop: "15px" }}>
                Already have an account? <Link to="/"> Login</Link>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  );
}

export default SignUp;
