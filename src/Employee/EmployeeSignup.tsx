import { SideFade } from "../components/PageTransition";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import {
  Diversity3,
  Google,
  KeyboardArrowRight,
  Password,
  Person,
  Phone,
} from "@mui/icons-material";
import logo from "../assets/images/Logo-easework.png";
import { useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalSnackbarContext } from "../context/GlobalSnackbarContext";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

export default function EmployeeSignup() {
  interface AdminTypes {
    data: any;
    isLoading: boolean;
  }

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL as string;

  const { openSnack, setOpenSnack } = useContext(GlobalSnackbarContext);

  const { uid } = useParams();

  const emailRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const positionRef = useRef<HTMLInputElement>();
  const passwordRef1 = useRef<HTMLInputElement>();
  const passwordRef2 = useRef<HTMLInputElement>();

  const AdminDetailsQF = () => {
    return axios.post(baseURL + `admin/getadmindetails/${uid}`);
  };

  const { data: AdminData, isLoading: isAdminLoading }: AdminTypes = useQuery(
    "admin-details",
    AdminDetailsQF,
    {
      onError: (err: any) => {
        setOpenSnack({
          open: true,
          message: err?.response.data,
          severity: "error",
        });
      },
      select(data: any) {
        return data.data;
      },
    }
  );

  const EmployeeSignupQF = (EmpSignupQueryData: any) => {
    return axios.post(baseURL + "employee/signup", EmpSignupQueryData);
  };

  const { mutate, isLoading } = useMutation(EmployeeSignupQF, {
    onSuccess: (data) => {
      localStorage.setItem("employee-token", JSON.stringify(data.data.token));
      localStorage.setItem("user", JSON.stringify(data.data.user));
      navigate("/employee/dashboard");
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
        message: err?.response.data,
        severity: "error",
      });
    },
  });

  //   email, name, phone, companyName, password, employeeOf, position

  function HandleSubmit(e: Event) {
    e.preventDefault();
    if (passwordRef1.current?.value === passwordRef2.current?.value) {
      const EmpSignupQueryData: any = {
        email: emailRef.current?.value,
        name: nameRef.current?.value,
        phone: phoneRef.current?.value,
        employeeOf: uid,
        companyName: AdminData?.companyName,
        position: positionRef.current?.value,
        password: passwordRef2.current?.value,
      };
      mutate(EmpSignupQueryData);
    } else {
      setOpenSnack({
        open: true,
        message: "Passwords does not match!",
        severity: "error",
      });
    }
  }

  return (
    <>
      <SideFade>
        <Box
          sx={{
            ...FlexBox,
            width: "100vw",
            minHeight: "100vh",
            gap: 4,
          }}
        >
          <Box
            sx={{ width: { xs: "50vw", lg: "15vw" } }}
            component="img"
            src={logo}
            alt="logo"
          />

          {/* ADMIN DETAILS BOX */}
          {isAdminLoading ? (
            <CircularProgress />
          ) : (
            <Box
              className="cssPop"
              sx={{
                ...FlexBox,
                flexDirection: "column",
                width: "100%",
                gap: 1,
              }}
            >
              <Typography textAlign="center" variant="h5">
                Employee Signup for{" "}
                <span style={{ color: "#4285F4" }}>
                  {AdminData?.companyName}
                </span>
              </Typography>
              <Typography variant="subtitle2">under</Typography>
              <Avatar src={AdminData?.picture} />
              <Typography variant="h5">
                The Team of{" "}
                <span style={{ color: "#4285F4" }}>{AdminData?.name}</span>
              </Typography>
            </Box>
          )}

          <Grid
            container
            sx={{ width: { xs: "90%", lg: "50%" } }}
            component="form"
            onSubmit={(e: any) => HandleSubmit(e)}
            spacing={5}
          >
            <Grid item xs={12} lg={6}>
              <TextField
                inputRef={emailRef}
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "auto", height: "auto", pr: 2 }}
                      position="start"
                    >
                      <Google />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                required
                sx={{
                  width: "100%",
                }}
                label="Email"
                placeholder="Enter Your Email"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                inputRef={nameRef}
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "auto", height: "auto", pr: 2 }}
                      position="start"
                    >
                      <Person />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                required
                sx={{
                  width: "100%",
                }}
                label="Name"
                placeholder="Enter Your Name"
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                inputRef={phoneRef}
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "auto", height: "auto", pr: 2 }}
                      position="start"
                    >
                      <Phone />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                required
                sx={{
                  width: "100%",
                }}
                label="Phone"
                placeholder="Enter Your Phone Number"
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                inputRef={positionRef}
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "auto", height: "auto", pr: 2 }}
                      position="start"
                    >
                      <Diversity3 />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                required
                sx={{
                  width: "100%",
                }}
                label="Position"
                placeholder="Enter Your Position in the Company"
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                inputRef={passwordRef1}
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "auto", height: "auto", pr: 2 }}
                      position="start"
                    >
                      <Password />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                required
                sx={{
                  width: "100%",
                }}
                type="password"
                label="Password"
                placeholder="Enter Your Password"
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                inputRef={passwordRef2}
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "auto", height: "auto", pr: 2 }}
                      position="start"
                    >
                      <Password />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                required
                sx={{
                  width: "100%",
                }}
                type="password"
                label="Confirm Password"
                placeholder="Enter Your Password Again"
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <Box
                sx={{
                  ...FlexBox,
                  mt: 3,
                  gap: 3,
                }}
              >
                {isLoading == true ? (
                  <CircularProgress />
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    sx={{
                      width: { xs: "75vw", lg: "20vw" },
                    }}
                    variant="contained"
                  >
                    SIGNUP
                  </Button>
                )}

                <Typography color={"GrayText"} variant="subtitle2">
                  ALREADY HAVE AN ACCOUNT?
                </Typography>

                <Button
                  disabled={isLoading}
                  onClick={() => navigate("/employee")}
                  sx={{
                    width: { xs: "55vw", lg: "15vw" },
                    backgroundColor: "#011638",
                  }}
                  endIcon={<KeyboardArrowRight />}
                  variant="contained"
                >
                  LOGIN
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </SideFade>
    </>
  );
}
