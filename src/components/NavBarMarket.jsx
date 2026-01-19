import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import logo from "../images/logo_w.png";
import "./NavBarMarket.css";
import CartWidget from "../CartWidget";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { contexto } from "./CartContext";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InstagramIcon from "@mui/icons-material/Instagram";

const pages = [
  { title: "Home", link: "/" },
  { title: "Über uns", link: "/about_us" },
  { title: "Produkte", link: "/category" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { carrito } = useContext(contexto);
  const cantidadTotal = carrito
    .map((item) => item.cantidad)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <AppBar positionFixed id="navbar">
      <Container className="navbarContainer" maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <div className="logo">
              <NavLink as={Link} to="/">
                {" "}
                <img src={logo} alt="logo" />
              </NavLink>
            </div>
          </Box>

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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography
                    className="NavBar_title"
                    textAlign="center"
                    as={Link}
                    to={page.link}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <div className="logo">
              <NavLink as={Link} to="/">
                <img src={logo} alt="logo" />
              </NavLink>
            </div>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Nav.Link
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                className="NavBar_title"
                as={Link}
                to={page.link}
              >
                {page.title}
              </Nav.Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Die Backpfeife Instagram">
              <a
                id="instagram"
                href="https://www.instagram.com/die_backpfeife/?hl=de"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
              >
                <InstagramIcon id="instaIcon" />
              </a>
            </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Admin Access">
              <Link id="admin" to="/admin_item_list">
                <AccountCircleIcon id="adminIcon" />
              </Link>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Cart">
              <Link id="carrito" to="/cart">
                <CartWidget />
                <span
                  className={
                    cantidadTotal > 0 ? "cantidadCarrito" : "carritoNoVisible"
                  }
                >
                  {cantidadTotal}
                </span>
              </Link>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
