import {
  AlternateEmail,
  Badge,
  Cancel,
  CheckCircle,
  Send,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useRef } from "react";
import { SideFade } from "../components/PageTransition";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import AdminPagesContainer from "./AdminPagesContainer";
import invite from "../assets/images/invite.png";
import { useNavigate } from "react-router-dom";

export default function AdminAddEmployee() {
  const navigate = useNavigate();

  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();

  //   EMPLOYEE JOINING FIELDS
  //   url, employeeName, employeeEmail, adminName, companyName

  function HandleSubmit(e: Event) {
    e.preventDefault();
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
              variant={isXS ? "h4" :"h3"}
              color="text.primary"
            >
              Add An Employee
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
                Send a Joining Mail
              </Typography>

              <TextField
                required
                inputRef={nameRef}
                sx={{ width: { xs: "75vw", lg: "100%" } }}
                placeholder="Name of the Employee"
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
              <TextField
                required
                inputRef={emailRef}
                sx={{ width: { xs: "75vw", lg: "100%" } }}
                placeholder="Email of the Employee"
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
                  endIcon={<Send />}
                  sx={{ p: "8px 50px", fontWeight: 700 }}
                  variant="contained"
                  color="primary"
                >
                  Send Joining Mail
                </Button>
              </Box>
            </Box>
            {/* RIGHT SIDE */}
            <Box sx={{ ...FlexBox, flex: 1 }}>
              <Box sx={{ flex: 1 }} component="img" src={invite} />
            </Box>
          </Box>
          <Typography
            sx={{ fontWeight: 700 }}
            variant="subtitle2"
            color="text.secondary"
          >
            Sending a joining mail typically involves sending an email to a new
            employee containing instructions on how to access and login to an
            organization's system or application. The email may include login
            credentials, links to the app or website, and any necessary training
            materials. This process is designed to onboard employees effectively
            and ensure they have access to the necessary resources to begin
            their job duties.
          </Typography>
        </Box>
      </SideFade>
    </AdminPagesContainer>
  );
}
