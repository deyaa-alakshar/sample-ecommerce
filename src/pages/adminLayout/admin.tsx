import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Outlet, useNavigate } from "react-router-dom";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useNavigate();
  return (
    <div className="flex gap-6">
      <Sidebar className="h-screen" collapsed={collapsed}>
        <Menu>
          <MenuItem
            onClick={() => setCollapsed((e) => !e)}
            icon={<MenuOutlinedIcon fontSize="medium" />}
            >
            <LocalMallIcon fontSize="large" />
          </MenuItem>

          <MenuItem
              icon={<CategoryOutlinedIcon fontSize="medium" />}
            onClick={() => {
              router("/dashboard/products");
            }}
          >
            Products
          </MenuItem>
          <MenuItem
            icon={<LogoutOutlinedIcon />}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("type");
              router('/');
            }}
          >
            Log out
          </MenuItem>
        </Menu>
      </Sidebar>
      <Outlet />
    </div>
  );
};

export default Admin;
