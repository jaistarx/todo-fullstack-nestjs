import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import ItemList from "../itemlist/Itemlist";
import Grid from "@mui/material/Grid";
import "./InputList.css";
import { useNavigate } from "react-router-dom";
const InputList = ({ setUserName, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("id")) || -1
  );
  const [itemArray, setItemArray] = useState([]);
  const [input, setInput] = useState("");
  const [editflag, setEditflag] = useState(false);
  const [editIndex, seteditIndex] = useState(0);
  const [editSerialValue, setEditSerialValue] = useState(0);
  const [editValue, seteditValue] = useState("");
  const [editPreviousValue, setEditPreviousValue] = useState("");
  const [refreshDB, setRefreshDB] = useState(false);
  const [load, setLoad] = useState(false);
  const add = async () => {
    if (input === "") {
      alert("Input value cannot be empty!");
    } else {
      setLoad(true);
      const response = await fetch(`http://localhost:5000/list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: input, user: userId }),
      });
      await response.json();
      // console.log(res);
      setRefreshDB(!refreshDB);
      setInput("");
    }
  };
  const edit = async () => {
    if (editValue === "") {
      alert("Edit value cannot be empty!");
      seteditValue(editPreviousValue);
    } else {
      setLoad(true);
      const response = await fetch(`http://localhost:5000/list/${editIndex}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: editValue }),
      });
      await response.json();
      // console.log(res);
      setRefreshDB(!refreshDB);
      setEditflag(false);
      seteditValue("");
    }
  };
  const logout = () => {
    localStorage.clear();
    setUserName("");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoad(true);
      const response = await fetch(
        `http://localhost:5000/list/user/${userId}`,
        {
          headers: { accept: "application/json" },
        }
      );
      const res = await response.json();
      setItemArray(res);
      setLoad(false);
    };
    fetchData();
  }, [refreshDB]);

  return (
    <>
      <Grid container spacing={2} sx={{ px: 3 }}>
        <Grid item xs></Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div className="listOuter">
            <div className="unameOuter">
              <div>Hello {localStorage.getItem("username")}</div>
              <div>
                <Button
                  variant="contained"
                  color="error"
                  onClick={logout}
                  size="small"
                >
                  Logout
                </Button>
              </div>
            </div>
            {!editflag && (
              <div>
                <TextField
                  id="filled-basic"
                  label="Add Item"
                  variant="outlined"
                  color="warning"
                  size="small"
                  sx={{ my: 2, backgroundColor: "white" }}
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  autoFocus
                  autoComplete="off"
                  fullWidth
                />
                <div>
                  <Button variant="contained" color="secondary" onClick={add}>
                    Add
                  </Button>
                </div>
              </div>
            )}

            {editflag && (
              <div>
                <TextField
                  id="outlined-basic"
                  label={"Edit Item " + parseInt(editSerialValue + 1)}
                  variant="outlined"
                  color="warning"
                  onChange={(e) => seteditValue(e.target.value)}
                  size="small"
                  sx={{ my: 2, backgroundColor: "white" }}
                  value={editValue}
                  autoFocus
                  autoComplete="off"
                  fullWidth
                />
                <div>
                  <Button variant="contained" color="secondary" onClick={edit}>
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>

          <ItemList
            seteditValue={seteditValue}
            seteditIndex={seteditIndex}
            itemArray={itemArray}
            editflag={editflag}
            setEditflag={setEditflag}
            setEditPreviousValue={setEditPreviousValue}
            refreshDB={refreshDB}
            setRefreshDB={setRefreshDB}
            setEditSerialValue={setEditSerialValue}
            load={load}
            setLoad={setLoad}
          ></ItemList>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  );
};
export default InputList;
