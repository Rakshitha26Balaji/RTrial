import React from "react";
import { Box, CssBaseline, Toolbar, AppBar, Typography } from "@mui/material";
import Sidebar from "./components/Sidebar/Sidebar";
import LeadsTable from "./components/LeadsTable/LeadsTable";

export default function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ backgroundColor: "#002b5c" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h5" noWrap>
            Leads Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <LeadsTable />
      </Box>
    </Box>
  );
}
