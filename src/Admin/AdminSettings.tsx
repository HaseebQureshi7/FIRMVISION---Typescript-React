import React from "react";
import AdminPagesContainer from "./AdminPagesContainer";
import { SideFade } from "../components/PageTransition";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import { Password, Photo } from "@mui/icons-material";

export default function AdminSettings() {
  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

  const user: any | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

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
              Settings
            </Typography>
            <Divider sx={{ width: "100%" }} />
          </Box>

          {/* ROW 1 */}
          <Box
            sx={{
              ...FlexBox,
              flexDirection: "row",
              height: { xs: "auto", lg: "40vh" },
              width: "100%",
            }}
          >
            {/* SECTION 1 */}
            <Box
              sx={{
                flex: 2,
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                mr: "2.5%",
              }}
            >
              <Avatar
                sx={{ width: "55%", height: "50%", objectFit: "cover" }}
                src={user?.picture}
                variant="square"
              />
            </Box>

            {/* SECTION 2 */}
            <Box
              sx={{
                flex: 3,
                ...FlexBox,
                height: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography variant="body2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="h5" fontWeight={700} color="text.primary">
                  {user?.name}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="body2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="h5" fontWeight={700} color="text.primary">
                  {user?.phone}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="text.secondary"
                >
                  {user?.email}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="body2" color="text.secondary">
                  Organization Name
                </Typography>
                <Typography variant="h5" fontWeight={700} color="text.primary">
                  {user?.companyName}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ROW 2 */}
          <Box
            sx={{
              ...FlexBox,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "65%",
            }}
          >
            <Button
              sx={{ px: 7.5 }}
              disabled
              size="large"
              startIcon={<Photo />}
              variant="contained"
              color="primary"
            >
              Change Picture
            </Button>
            <Button
              sx={{ px: 7.5 }}
              disabled
              size="large"
              startIcon={<Password />}
              variant="contained"
              color="primary"
            >
              Change Password
            </Button>
            <Button
              sx={{ px: 7.5 }}
              size="large"
              variant="contained"
              color="primary"
            >
              Edit Profile
            </Button>
          </Box>

          {/* HEADER 2 */}
          <Box sx={{ ...FlexBox, alignItems: "flex-start", my: 5 }}>
            <Typography
              sx={{ fontWeight: 700 }}
              variant={isXS ? "h6" : "h5"}
              color="text.primary"
            >
              Permissions
            </Typography>
            <Divider sx={{ width: "100%" }} />
          </Box>

          {/* ROW 3 */}
          <Box sx={{ ...FlexBox }}>
            {/* OPTION */}
            <Box
              sx={{
                ...FlexBox,
                flexDirection: "row",
                justifyContent: "space-between",
                px: 5,
              }}
            >
              <Typography
                sx={{ fontWeight: 500 }}
                variant={isXS ? "body1" : "h6"}
                color="text.primary"
              >
                Allow employees to send you messages directly
              </Typography>
              <Switch />
            </Box>
            {/* OPTION */}
            <Box
              sx={{
                ...FlexBox,
                flexDirection: "row",
                justifyContent: "space-between",
                px: 5,
              }}
            >
              <Typography
                sx={{ fontWeight: 500 }}
                variant={isXS ? "body1" : "h6"}
                color="text.primary"
              >
                Disable global chat board
              </Typography>
              <Switch />
            </Box>
            {/* OPTION */}
            <Box
              sx={{
                ...FlexBox,
                flexDirection: "row",
                justifyContent: "space-between",
                px: 5,
              }}
            >
              <Typography
                sx={{ fontWeight: 500 }}
                variant={isXS ? "body1" : "h6"}
                color="text.primary"
              >
                Receive an email when someone directly messages you
              </Typography>
              <Switch />
            </Box>
          </Box>
        </Box>
      </SideFade>
    </AdminPagesContainer>
  );
}
