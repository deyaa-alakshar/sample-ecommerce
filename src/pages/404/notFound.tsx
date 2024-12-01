import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h2" component="h2" textAlign="center">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" textAlign="center" mt={2}>
        The page you are looking for could not be found.
      </Typography>
      <Button variant="contained" color="primary" sx={{ marginTop: 4 }}>
        <Link to="/">Go Back Home</Link>
      </Button>
    </Box>
  );
};

export default NotFound;
