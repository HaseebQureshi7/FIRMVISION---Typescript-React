import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FadeIn } from "../components/PageTransition";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import logo from "../assets/images/Logo-easework.png";
import invite from "../assets/images/invite.png";
import manage from "../assets/images/manage.png";
import assign from "../assets/images/assign.png";
import complete from "../assets/images/complete.png";
import {
  AlternateEmail,
  CheckCircle,
  CorporateFare,
  Password,
  Phone,
} from "@mui/icons-material";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { GlobalSnackbarContext } from "../context/GlobalSnackbarContext";
import google from "../types/GoogleType";

export default function AdminSignup() {
  const [userDetails, setUserDetails] = useState<any>({});
  const [phase, setPhase] = useState<String>("GoogleStage");

  const navigate = useNavigate();
  const { openSnack, setOpenSnack } = useContext(GlobalSnackbarContext);

  const companyNameRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const password1Ref = useRef<HTMLInputElement>();
  const password2Ref = useRef<HTMLInputElement>();

  function HandleCallbackResponse(res: any) {
    const decoded = jwt_decode(res.credential);
    setUserDetails(decoded);
    setPhase("SignupPhase");
  }

  interface signupQFTypes {
    email: string | undefined;
    name: string | undefined;
    phone: string | undefined;
    picture: string | undefined;
    companyName: string | undefined;
    password: string | undefined;
  }

  const signupQF = (signupQueryData: signupQFTypes) => {
    return axios.post(
      import.meta.env.VITE_BASE_URL + "admin/signup",
      signupQueryData
    );
  };

  const { mutate, isLoading } = useMutation(signupQF, {
    onSuccess: (data) => {
      setOpenSnack({
        open: true,
        message: "Signup was Successful",
        severity: "success",
      });
      navigate("admin/dashboard");
      console.log(data);
      localStorage.setItem("admin-token", JSON.stringify(data.data.token));
    },
    onError: (err: any) => {
      setOpenSnack({
        open: true,
        message: err.response.data,
        severity: "error",
      });
    },
  });

  function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const signupQueryData: signupQFTypes = {
      email: userDetails.email,
      name: userDetails.name,
      phone: phoneRef?.current?.value,
      picture: userDetails.picture,
      companyName: companyNameRef?.current?.value,
      password: password1Ref?.current?.value,
    };
    console.log(signupQueryData);
    if (password1Ref?.current?.value === password2Ref?.current?.value) {
      mutate(signupQueryData);
    } else {
      setOpenSnack({
        open: true,
        message: "Passwords do not match!",
        severity: "error",
      });
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CID,
      callback: HandleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignupButton"),
      {
        theme: "filled_blue",
        text: "signup_with",
        size: "large",
        shape: "rectangular",
      }
    );
  }, []);

  return (
    <FadeIn>
      <Box
        sx={{
          ...FlexBox,
          backgroundColor: "background.default",
          p: { xs: 2, lg: 5 },
        }}
      >
        {/* SECTION 1 */}
        <Box
          sx={{
            ...FlexBox,
            flexDirection: { xs: "column-reverse", lg: "row" },
            gap: 2,
            mb: 2.5,
          }}
        >
          <Box
            sx={{
              width: { xs: "50vw", lg: "15vw" },
              height: "auto",
              float: { xs: "left", lg: "right" },
            }}
            component="img"
            src={logo}
          />
        </Box>

        {/* SECTION 2 */}

        {phase === "GoogleStage" ? (
          // PHASE 1
          <Box sx={{ ...FlexBox, gap: 0 }}>
            <Typography
              sx={{ fontWeight: 700, color: "text.secondary" }}
              variant="body2"
            >
              Step
            </Typography>
            <Typography sx={{ fontWeight: 700, mb: 5 }} variant="h6">
              1 of 2
            </Typography>
            <div id="googleSignupButton"></div>
            <Typography
              sx={{
                fontWeight: 700,
                color: "text.secondary",
                mt: 10,
                textTransform: "uppercase",
              }}
              variant="body2"
            >
              Get started with only 2 steps
            </Typography>
          </Box>
        ) : (
          // PHASE 2
          <Box
            component="form"
            onSubmit={(e: any) => HandleSubmit(e)}
            sx={{
              ...FlexBox,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Box sx={{ ...FlexBox, gap: 0 }}>
              <Avatar
                sx={{ mb: 1 }}
                variant="circular"
                src={userDetails?.picture}
              />
              <Typography
                sx={{ fontWeight: 700, color: "text.secondary" }}
                variant="body2"
              >
                Step
              </Typography>
              <Typography sx={{ fontWeight: 700 }} variant="h6">
                2 of 2
              </Typography>
            </Box>
            <Grid
              sx={{ width: { xs: "100%", lg: "75%" } }}
              container
              spacing={2.5}
            >
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  inputRef={companyNameRef}
                  sx={{ width: { xs: "100%", lg: "100%" } }}
                  placeholder="Organization Name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        sx={{ width: "auto", height: "auto" }}
                        position="start"
                      >
                        <CorporateFare sx={{ p: 0.15, mr: 1 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  type="number"
                  inputRef={phoneRef}
                  sx={{ width: { xs: "100%", lg: "100%" } }}
                  placeholder="Phone Number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        sx={{ width: "auto", height: "auto" }}
                        position="start"
                      >
                        <Phone sx={{ p: 0.15, mr: 1 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  inputRef={password1Ref}
                  required
                  sx={{ width: { xs: "100%", lg: "100%" } }}
                  placeholder="Choose a password"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        sx={{ width: "auto", height: "auto" }}
                        position="start"
                      >
                        <Password sx={{ p: 0.15, mr: 1 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  inputRef={password2Ref}
                  required
                  sx={{ width: { xs: "100%", lg: "100%" } }}
                  placeholder="Confirm your password"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        sx={{ width: "auto", height: "auto" }}
                        position="start"
                      >
                        <Password sx={{ p: 0.15, mr: 1 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              startIcon={<CheckCircle />}
              sx={{ p: "8px 50px", fontWeight: 700 }}
              variant="contained"
              color="secondary"
            >
              Complete Signup
            </Button>
          </Box>
        )}

        {/* SECTION 3 */}
        <Box
          sx={{
            ...FlexBox,
            // display: { xs: "none", lg: "flex" },
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: { xs: 15, lg: 5 },
          }}
        >
          <Box sx={{ ...FlexBox }}>
            <Box
              sx={{ width: "10vw", height: "auto" }}
              component="img"
              src={invite}
            />
            <Typography
              sx={{
                color: "primary.light",
                fontWeight: 700,
                display: { xs: "none", lg: "flex" },
              }}
              variant="h6"
            >
              Invite
            </Typography>
          </Box>
          <Box sx={{ ...FlexBox }}>
            <Box
              sx={{ width: "10vw", height: "auto" }}
              component="img"
              src={manage}
            />
            <Typography
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                display: { xs: "none", lg: "flex" },
              }}
              variant="h6"
            >
              Manage
            </Typography>
          </Box>
          <Box sx={{ ...FlexBox }}>
            <Box
              sx={{ width: "10vw", height: "auto" }}
              component="img"
              src={assign}
            />
            <Typography
              sx={{
                color: "primary.dark",
                fontWeight: 700,
                display: { xs: "none", lg: "flex" },
              }}
              variant="h6"
            >
              Assign
            </Typography>
          </Box>
          <Box sx={{ ...FlexBox }}>
            <Box
              sx={{ width: "10vw", height: "auto" }}
              component="img"
              src={complete}
            />
            <Typography
              sx={{
                color: "crimson",
                fontWeight: 700,
                display: { xs: "none", lg: "flex" },
              }}
              variant="h6"
            >
              Complete
            </Typography>
          </Box>
        </Box>
      </Box>
    </FadeIn>
  );
}
