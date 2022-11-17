import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoadingIcon from "../loading/loading";

export default function InteractiveList({
  seteditValue,
  seteditIndex,
  itemArray,
  editflag,
  setEditflag,
  setEditPreviousValue,
  refreshDB,
  setRefreshDB,
  setEditSerialValue,
  load,
  setLoad,
}) {
  const deleteItem = async (itemId) => {
    setLoad(true);
    const response = await fetch(`http://localhost:5000/list/${itemId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    await response.json();
    // console.log(res);
    setRefreshDB(!refreshDB);
  };

  const editItem = (indexId, item) => {
    setEditPreviousValue(item.item);
    seteditValue(item.item);
    seteditIndex(item.id);
    setEditSerialValue(indexId);
    setEditflag(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <Box
          sx={{
            flexGrow: 1,
            mb: 2,
            backgroundColor: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            border: "2px solid black",
          }}
        >
          <Typography
            sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
            variant="h4"
            component="div"
          >
            Current List
          </Typography>
          {load && <LoadingIcon></LoadingIcon>}
          {!load && (
            <div>
              <hr></hr>
            </div>
          )}
          <List>
            {itemArray.map((item, index) => (
              <ListItem
                key={item.id}
                sx={{
                  border: "2px dotted white",
                  borderRadius: "25px",
                  margin: "10px 0px",
                  backgroundColor: "black",
                  color: "white",
                }}
                secondaryAction={
                  <div>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      style={{ marginRight: "5px" }}
                      onClick={() => editItem(index, item)}
                    >
                      <EditIcon sx={{ color: "primary.dark" }} />
                    </IconButton>
                    {!editflag && (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        style={{ marginRight: "5px" }}
                        onClick={() => deleteItem(item.id)}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    )}
                  </div>
                }
              >
                <h3 style={{ margin: "15px 40px" }}>{index + 1}</h3>

                <ListItemText primary={item.item} />
              </ListItem>
            ))}
          </List>
          {!load && (
            <div>
              <hr></hr>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
}
