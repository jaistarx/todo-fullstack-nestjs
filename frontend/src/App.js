import InputList from "./components/inputlist/InputList";
import Login from "./components/login/login";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import SignUp from "./components/signup/signup";

window.addEventListener("storage", () => {
  localStorage.clear();
  window.location.reload();
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") || false
  );
  const [buttonLoad, setButtonLoad] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginClicked = async () => {
    if (userName === "" || password === "") {
      alert("Please input all the fields!!!");
    } else {
      setButtonLoad(true);
      const response = await fetch(`http://localhost:5000/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });
      const res = await response.json();
      // console.log(res);
      setButtonLoad(false);
      setIsLoggedIn(res.status);
      if (res.status) {
        localStorage.setItem("loggedIn", res.status);
        localStorage.setItem("id", res.id);
        localStorage.setItem("username", res.username);
        navigate("/list");
      } else {
        alert("wrong credentials!!!");
      }
    }
  };

  return (
    <div>
      <div className="appouter"></div>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              setUserName={setUserName}
              setPassword={setPassword}
              loginClicked={loginClicked}
              buttonLoad={buttonLoad}
            ></Login>
          }
        ></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route
          path="/*"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <InputList
                userName={userName}
                setUserName={setUserName}
                setIsLoggedIn={setIsLoggedIn}
              ></InputList>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
