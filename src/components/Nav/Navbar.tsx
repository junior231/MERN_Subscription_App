import {
  AppBar,
  Box,
  Button,
  Typography,
  IconButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context";

const Navbar = () => {
  const [userState, setUserState] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserState({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            style={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
            to="/"
          >
            Home
          </Link>
          {userState.data && (
            // <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            //   Logout
            // </Link>
            <Button
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              color="inherit"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
