import React, { useState } from "react";
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Sidebar.css";

const drawerWidth = 200;

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 60,
          transition: "0.3s",
          overflowX: "hidden",
          backgroundColor: "#002b5c",
          color: "white",
        },
      }}
    >
      <Toolbar className="sidebar-toolbar">
        <IconButton onClick={() => setOpen(!open)} sx={{ color: "white" }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Divider sx={{ backgroundColor: "white" }} />

      <List>
        {["Defence Leads", "Civil Leads"].map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              {open && <ListItemText primary={item} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
