import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { FadeIn } from "../components/PageTransition";
import { FlexBox } from "./../components/StyleExtensions.tsx/FlexBox";
import logo from "../assets/images/Logo-easework.png";
import invite from "../assets/images/invite.png";
import manage from "../assets/images/manage.png";
import assign from "../assets/images/assign.png";
import complete from "../assets/images/complete.png";
import { CheckCircle, AlternateEmail, Password } from "@mui/icons-material";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalSnackbarContext } from "../context/GlobalSnackbarContext";
import { useContext, useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import google from "../types/GoogleType";

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const { openSnack, setOpenSnack } = useContext(GlobalSnackbarContext);

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  interface loginQDTypes {
    email: string | undefined;
    password: string | undefined;
  }

  // CONVENTIONAL LOGIN
  const loginQF = (loginQueryData: loginQDTypes) => {
    return axios.post(
      import.meta.env.VITE_BASE_URL + "employee/login",
      loginQueryData
    );
  };

  // CONVENTIONAL LOGIN QF
  const { mutate, isLoading } = useMutation(loginQF, {
    onSuccess: (data) => {
      setOpenSnack({
        open: true,
        message: "Logged in successfully!",
        severity: "success",
      });
      navigate("/employee/dashboard");
      // console.log(data.data.token);
      localStorage.setItem("employee-token", JSON.stringify(data.data.token));
      localStorage.setItem("user", JSON.stringify(data.data.user));
      // SET LAST LOGIN TIME
      const date = new Date();
      localStorage.setItem(
        "last-login",
        date.toLocaleTimeString([], {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      );
    },
    onError: (err: any) => {
      setOpenSnack({
        open: true,
        message: err.response.data,
        severity: "error",
      });
    },
  });

  // LOGIN WITH GOOGLE
  const loginWithGoogleQF = (loginWGQueryData: any) => {
    return axios.post(
      import.meta.env.VITE_BASE_URL + "employee/loginwithgoogle",
      loginWGQueryData
    );
  };

  // LOGIN WITH GOOGLE QF
  const { mutate: mutateLoginWG } = useMutation(loginWithGoogleQF, {
    onSuccess: (data) => {
      setOpenSnack({
        open: true,
        message: "Logged in successfully!",
        severity: "success",
      });
      navigate("/employee/dashboard");
      console.log(data.data);
      localStorage.setItem("employee-token", JSON.stringify(data.data.token));
      localStorage.setItem("user", JSON.stringify(data.data.user));
      // SET LAST LOGIN TIME
      const date = new Date();
      localStorage.setItem(
        "last-login",
        date.toLocaleTimeString([], {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      );
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
    const loginQueryData: loginQDTypes = {
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
    };
    console.log(loginQueryData);
    mutate(loginQueryData);
  }

  function HandleCallbackResponse(res: any) {
    const decoded: any = jwt_decode(res.credential);
    console.log(decoded?.email);
    mutateLoginWG({ email: decoded?.email });
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
        text: "continue_with",
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
          minHeight: "100vh",
          p: { xs: 2, lg: 5 },
        }}
      >
        {/* SECTION 1 */}
        <Box
          sx={{
            ...FlexBox,
            flexDirection: { xs: "column-reverse", lg: "row" },
            gap: 2,
            mb: 5,
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
        <Box
          component="form"
          onSubmit={(e: any) => HandleSubmit(e)}
          sx={{
            ...FlexBox,
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Typography variant="h5" fontWeight={700} color="text.secondary">
            Login
          </Typography>
          <TextField
            required
            inputRef={emailRef}
            sx={{ width: { xs: "75vw", lg: "30vw" } }}
            placeholder="Enter your registered email"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  sx={{ width: "auto", height: "auto" }}
                  position="start"
                >
                  <AlternateEmail sx={{ p: 0.15, mr: 1 }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            inputRef={passwordRef}
            required
            sx={{ width: { xs: "75vw", lg: "30vw" } }}
            placeholder="Enter your password"
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
          <Box sx={{ ...FlexBox, gap: 2.5, justifyContent: "center" }}>
            <Button
              type="submit"
              startIcon={<CheckCircle />}
              sx={{ p: "8px 50px", fontWeight: 700 }}
              variant="contained"
              color="primary"
            >
              Log into your Account
            </Button>
            <div id="googleSignupButton"></div>
          </Box>
        </Box>
        {/* SECTION 3 */}
        <Box
          sx={{
            ...FlexBox,
            // display: { xs: "none", lg: "flex" },
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: { xs: 25, lg: 10 },
          }}
        >
          <Box sx={{ ...FlexBox }}>
            <Box
              sx={{ width: "5vw", height: "auto" }}
              component="img"
              src={invite}
            />
            <Typography
              sx={{
                color: "primary.light",
                fontWeight: 700,
                display: { xs: "none", lg: "flex" },
              }}
              variant="body1"
            >
              Invite
            </Typography>
          </Box>
          <Box sx={{ ...FlexBox }}>
            <Box
              sx={{ width: "5vw", height: "auto" }}
              component="img"
              src={manage}
            />
            <Typography
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                display: { xs: "none", lg: "flex" },
              }}
              variant="body1"
            >
              Manage
            </Typography>
          </Box>
          <Box sx={{ ...FlexBox }}>
            <Box
              sx={{ width: "5vw", height: "auto" }}
              component="img"
              src={assign}
            />
            <Typography
              sx={{
                color: "primary.dark",
                fontWeight: 700,
                display: { xs: "none", lg: "flex" },
              }}
              variant="body1"
            >
              Assign
            </Typography>
          </Box>
          <Box sx={{ ...FlexBox }}>
            <Box
              sx={{ width: "5vw", height: "auto" }}
              component="img"
              src={complete}
            />
            <Typography
              sx={{
                color: "crimson",
                fontWeight: 700,
                display: { xs: "none", lg: "flex" },
              }}
              variant="body1"
            >
              Complete
            </Typography>
          </Box>
        </Box>
      </Box>
    </FadeIn>
  );
}
