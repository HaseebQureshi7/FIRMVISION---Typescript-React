import {
  DarkMode,
  LightMode,
  Menu,
  Notifications,
  Settings,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";
import { useLocation, useNavigate } from "react-router-dom";

export default function Appbar({ user, openSidebar, setOpenSidebar }: any) {
  const { themeMode, setThemeMode } = useContext(DarkModeContext);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Box
        sx={{
          ...FlexBox,
          flexDirection: "row",
          backgroundColor: "background.default",
          justifyContent: "flex-end",
          width: "100%",
          height: "60px",
          // borderBottom: "2px solid lightgrey",
        }}
      >
        <Box
          sx={{
            flex: 3,
            ...FlexBox,
            display: { xs: "flex", lg: "none" },
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            px: 2.5,
          }}
        >
          <Typography
            sx={{ display: { xs: "none", lg: "inherit" } }}
            fontWeight={700}
            variant="h6"
            color="text.primary"
          >
            {user?.companyName} &copy;
          </Typography>
          <Menu
            sx={{
              display: { xs: "inherit", lg: "none" },
              color: "text.primary",
            }}
            onClick={() =>
              setOpenSidebar(openSidebar == "0vw" ? "20vw" : "0vw")
            }
          />
        </Box>
        <Box
          sx={{
            // flex: { xs: 4, lg: 1 },
            ...FlexBox,
            width: { xs: "70%", lg: "40%" },
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {themeMode == "dark" ? (
            <LightMode
              onClick={() =>
                setThemeMode(themeMode == "light" ? "dark" : "light")
              }
              sx={{
                width: "25px",
                height: "25px",
                color: "text.primary",
                cursor: "pointer",
                "&:hover": {
                  rotate: "45deg",
                  filter: "invert(0.5)",
                  position: "relative",
                  transform: "scale(1.25)",
                  transition: "all 1s ease ",
                },
                "&:not(:hover)": {
                  rotate: "0deg",
                  position: "inline",
                  transform: "scale(1)",
                  transition: "all 1s ease ",
                },
              }}
            />
          ) : (
            <DarkMode
              onClick={() =>
                setThemeMode(themeMode == "light" ? "dark" : "light")
              }
              sx={{
                width: "25px",
                height: "25px",
                color: "text.primary",
                cursor: "pointer",
                "&:hover": {
                  rotate: "25deg",
                  filter: "invert(0.5)",
                  position: "relative",
                  transform: "scale(1.25)",
                  transition: "all 1s ease ",
                },
                "&:not(:hover)": {
                  rotate: "0deg",
                  position: "inline",
                  transform: "scale(1)",
                  transition: "all 1s ease ",
                },
              }}
            />
          )}
          <Notifications
            sx={{
              width: "25px",
              height: "25px",
              color: "warning.main",
              cursor: "pointer",
              "&:hover": {
                transformOrigin: "top",
                transform: "scale(1.25)",
                animation: "bell 1s ease forwards infinite",
                transition: "all 1s ease ",
              },
              "&:not(:hover)": {
                rotate: "0deg",
                transform: "scale(1)",
                transition: "all 1s ease ",
              },
              "@keyframes bell": {
                "0%": {
                  rotate: "0deg",
                },
                "30%": {
                  rotate: "45deg",
                },
                "600%": {
                  rotate: "0deg",
                },
                "90%": {
                  rotate: "-45deg",
                },
              },
            }}
          />
          <Settings
            onClick={() => {
              location.pathname.includes("employee")
                ? navigate("/employee/settings")
                : navigate("/admin/settings");
            }}
            sx={{
              width: "25px",
              height: "25px",
              color: "text.secondary",
              "&:hover": {
                rotate: "180deg",
                position: "relative",
                transform: "scale(1.5)",
                transition: "all 1s ease ",
              },
              "&:not(:hover)": {
                rotate: "0deg",
                position: "inline",
                transform: "scale(1)",
                transition: "all 1s ease ",
              },
            }}
          />
          <Typography
            sx={{ display: { xs: "none", lg: "inherit" } }}
            fontWeight={700}
            variant="h6"
            color="text.primary"
          >
            {user?.companyName} &copy;
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", lg: "100%" },
          ml: "auto",
          height: "1.5px",
          // background: "linear-gradient(to right, #ffffff, lightgrey)",
          backgroundColor: "lightgrey",
        }}
      />
    </>
  );
}
