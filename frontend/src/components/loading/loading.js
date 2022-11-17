import * as React from "react";
// import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function LoadingIcon() {
  return (
    <Box sx={{ textAlign: "center", my: 1 }}>
      <LinearProgress color="warning" />
    </Box>
  );
}
