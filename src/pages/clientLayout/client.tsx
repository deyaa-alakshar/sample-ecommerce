import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge } from "@mui/material";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "state/store";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { fetchCategories } from "state/getCategories";
import LogoutIcon from "@mui/icons-material/Logout";

const pages = ["products"];

const Client = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { card } = useSelector((state: RootState) => state.card);
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const { categories } = useSelector((state: RootState) => state.categories);
  const router = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenNavMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    },
    [anchorElNav]
  );

  const handleOpenUserMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    [anchorElUser]
  );

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, [anchorElNav]);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, [anchorElUser]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    router("/");
    handleCloseUserMenu();
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <AppBar
        className="p-2 bg-blue-200"
        position="static"
        sx={{
          marginBottom: "160px",
          backgroundColor: "rgb(226 232 240 / var(--tw-bg-opacity, 1))",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{ minHeight: "48px !important", height: "auto" }}
          >
            <LocalMallIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MI STORE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link className="text-white" to={{ pathname: page }}>
                      {page[0].toUpperCase() + page.slice(1)}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <LocalMallIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 1,
                    color: "white",
                    display: "block",
                    textTransform: "capitalize",
                  }}
                >
                  <Link to={{ pathname: page }}>
                    {page[0].toUpperCase() + page.slice(1)}
                  </Link>
                </Button>
              ))}
            </Box>
            <Link to={"/home/products/favorites"}>
              <Badge
                badgeContent={favorites?.length}
                color="primary"
                className="mx-4 cursor-pointer"
              >
                <FavoriteBorderOutlinedIcon fontSize="large" />
              </Badge>
            </Link>
            <Link to={"/home/products/basket"}>
              <Badge
                badgeContent={card?.length}
                color="primary"
                className="mr-6 cursor-pointer"
              >
                <LocalGroceryStoreOutlinedIcon fontSize="large" />
              </Badge>
            </Link>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleLogout}>
                  <div className="flex gap-3">
                    <span>Log out</span>
                    <LogoutIcon />
                  </div>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
          <Toolbar
            disableGutters
            sx={{ minHeight: "48px !important", height: "auto" }}
          >
            <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
              <Link
                key={"all"}
                to={`/home/products?category=all`}
                className="block mx-2"
              >
                all
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/home/products?category=${category}`}
                  className="block mx-2"
                >
                  {category}
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
export default Client;
