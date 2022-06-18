import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  DialogContentText,
  Stack,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

interface ModalProps {
  text: string;
  buttonColor: "primary" | "secondary" | "error";
  isSignUp: boolean;
}

const ModalComponent: React.FC<ModalProps> = (props) => {
  const { text, buttonColor, isSignUp } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [userState, setUserState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    let response;
    if (isSignUp) {
      const { data: signUpData } = await axios.post(
        "http://localhost:8080/auth/signup",
        {
          email,
          password,
        }
      );
      response = signUpData;
    } else {
      const { data: loginData } = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        }
      );
      response = loginData;
    }

    if (response.errors.length) {
      return setErrorMsg(response.errors[0].msg);
    }

    // if user is logged in, set user state in Usercontext
    setUserState({
      data: {
        id: response.data.user.id,
        email: response.data.user.email,
      },
      loading: false,
      error: null,
    });

    // if login is successful, store user assigned token in localstorage
    localStorage.setItem("token", response.data.token);

    //set default axios header
    axios.defaults.headers.common[
      "authorization"
    ] = `Bearer ${response.data.token}`;
    // navigate to articles page
    navigate("/articles");
  };
  return (
    <div>
      <Button
        variant="contained"
        color={buttonColor}
        onClick={handleClickOpen}
        size="large"
        sx={{ marginRight: 2 }}
      >
        {text}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{text}</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={text === "Login" ? { display: "none" } : { display: "block" }}
          >
            To subscribe to this website, please enter your email address and
            password here.
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              //   p: 3,
              //   m: 2,
            }}
          >
            <TextField
              sx={{ width: "80%", m: 1 }}
              label="Email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ width: "80%" }}
              label="Password"
              placeholder="Email"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleClick}>
            {text === "Sign Up" ? "Subscribe" : "Login"}
          </Button>
        </DialogActions>
        {errorMsg && (
          <Stack sx={{ width: "100%", pt: 1, pb: 1 }}>
            <Alert sx={{ p: 1, m: 1 }} severity="error">
              {errorMsg}
            </Alert>
          </Stack>
        )}
      </Dialog>
    </div>
  );
};

export default ModalComponent;
