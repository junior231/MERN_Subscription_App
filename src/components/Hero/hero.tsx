import styled from "styled-components";
import {
  AppBar,
  Box,
  Button,
  Typography,
  IconButton,
  Toolbar,
  Grid,
} from "@mui/material";
import Modal from "../Modal/modal";

const HeroBackground = styled.header`
  padding: 5rem 0;
  height: 60vh;
  background-image: url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const HeroContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 2rem;
  color: white;
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 4rem;
`;

const hero = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <HeroBackground>
          <Grid item xl={4} xs={12} sx={{ padding: 10 }}>
            <HeroContainer>
              <Typography fontSize="4rem">
                Feed Your Mind with the best.
              </Typography>
              <Typography
                sx={{ margin: "1rem 0", fontWeight: 400, fontSize: "1rem" }}
              >
                Grow, Learn, and become more successful by reading some of the
                top articles by renowned individuals.
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Modal text="Sign Up" buttonColor="primary" isSignUp={true} />

                <Modal text="Login" buttonColor="error" isSignUp={false} />
              </Box>
            </HeroContainer>
          </Grid>
        </HeroBackground>
      </Grid>
    </Grid>
  );
};

export default hero;
