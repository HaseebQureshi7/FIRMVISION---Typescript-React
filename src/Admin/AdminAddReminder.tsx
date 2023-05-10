import {
  Accessible,
  AlternateEmail,
  Badge,
  Cancel,
  CheckCircle,
  ForwardToInbox,
  Info,
  Send,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { SideFade } from "../components/PageTransition";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import AdminPagesContainer from "./AdminPagesContainer";
import assign from "../assets/images/assign.png";
import { useNavigate } from "react-router-dom";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { GlobalSnackbarContext } from "../context/GlobalSnackbarContext";
import { useMutation } from "react-query";
import axios from "axios";
import isXSmall from "../components/isXSmall";

export default function AdminAddReminder() {
  const navigate = useNavigate();

  const user: any | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  const { openSnack, setOpenSnack } = useContext(GlobalSnackbarContext);

  const { isXS } = isXSmall();

  const nameRef = useRef<HTMLInputElement>();
  const detailsRef = useRef<HTMLInputElement>();
  const [date, setDate] = useState<any>();

  const authToken = localStorage.getItem("admin-token");
  const Authheaders = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const setRemQF = (addRemData: any) => {
    return axios.post(
      import.meta.env.VITE_BASE_URL + "reminder/createreminder",
      addRemData,
      Authheaders
    );
  };

  // SET REMINDER MUTATION FUNCTION
  const { mutate } = useMutation<any>(setRemQF, {
    onSuccess: () => {
      setOpenSnack({
        open: true,
        message: "New Reminder Added!",
        severity: "success",
      });
      navigate("/admin/dashboard");
    },
    onError: (err: any) => {
      setOpenSnack({
        open: true,
        message: err.response.data,
        severity: "error",
      });
    },
  });

  function HandleSubmit(e: Event) {
    e.preventDefault();
    if (date == undefined) {
      setOpenSnack({
        open: true,
        message: "Add a Date to Proceed!",
        severity: "warning",
      });
    } else {
      const addRemData: any = {
        setBy: user._id,
        setDate: date,
        name: nameRef?.current?.value,
        details: detailsRef?.current?.value,
      };
      console.log(addRemData);
      mutate(addRemData);
    }
  }

  return (
    <AdminPagesContainer>
      <SideFade>
        <Box
          sx={{
            ...FlexBox,
            width: { xs: "100vw", lg: "95vw" },
            p: { xs: 2.5, lg: 5 },
          }}
        >
          {/* HEADER */}
          <Box sx={{ ...FlexBox, alignItems: "flex-start" }}>
            <Typography
              sx={{ fontWeight: 500 }}
              variant={isXS ? "h4" : "h3"}
              color="text.primary"
            >
              Add Reminder
            </Typography>
            <Divider sx={{ width: "100%" }} />
          </Box>
          <Box
            sx={{
              ...FlexBox,
              alignItems: { xs: "center", lg: "flex-start" },
              flexDirection: { xs: "column-reverse", lg: "row" },
              p: { xs: 0, lg: 10 },
            }}
          >
            {/* LEFT SIDE */}
            <Box
              component="form"
              onSubmit={(e: any) => HandleSubmit(e)}
              sx={{
                ...FlexBox,
                flex: 1,
                alignItems: { xs: "center", lg: "flex-start" },
              }}
            >
              <Typography
                sx={{ fontWeight: 500 }}
                variant="h4"
                color="text.primary"
              >
                Set a Reminder
              </Typography>

              <Grid container spacing={2.5}>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    inputRef={nameRef}
                    sx={{ width: { xs: "100%", lg: "100%" } }}
                    placeholder="Name of the Reminder"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          sx={{ width: "auto", height: "auto" }}
                          position="start"
                        >
                          <Badge sx={{ p: 0.15, mr: 1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  {/* NO FORM "REQUIRED" SUPPORT !!! HANDLE IT BY YOURSELF */}
                  <MobileDatePicker
                    sx={{ width: { xs: "100%", lg: "100%" } }}
                    onChange={(newValue: any) =>
                      setDate(newValue.$d.toISOString())
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    required
                    inputRef={detailsRef}
                    sx={{ width: { xs: "100%", lg: "100%" } }}
                    placeholder="Details"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          sx={{ width: "auto", height: "auto" }}
                          position="start"
                        >
                          <Info sx={{ p: 0.15, mr: 1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  ...FlexBox,
                  flexDirection: { xs: "column-reverse", lg: "row" },
                  alignItems: { xs: "center", lg: "flex-start" },
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => navigate("/admin/dashboard")}
                  endIcon={<Cancel />}
                  sx={{ p: "8px 50px", fontWeight: 700 }}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  endIcon={<ForwardToInbox />}
                  sx={{ p: "8px 50px", fontWeight: 700 }}
                  variant="contained"
                  color="primary"
                >
                  Activate Reminder
                </Button>
              </Box>
            </Box>
            {/* RIGHT SIDE */}
            <Box sx={{ ...FlexBox, flex: 1 }}>
              <Box sx={{ flex: 1 }} component="img" src={assign} />
            </Box>
          </Box>
          <Typography
            sx={{ fontWeight: 700 }}
            variant="subtitle2"
            color="text.secondary"
          >
            Adding a reminder will notify you with a notification on the date the remider was set and will be visible in your remiders tab for changes or deletion. Passing that date will remove the reminder from your reminders list.
          </Typography>
        </Box>
      </SideFade>
    </AdminPagesContainer>
  );
}
