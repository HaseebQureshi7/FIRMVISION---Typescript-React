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

export default function Appbar({ user, openSidebar, setOpenSidebar }: any) {
  const { themeMode, setThemeMode } = useContext(DarkModeContext);

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
              sx={{ width: "25px", height: "25px", color: "text.primary" }}
            />
          ) : (
            <DarkMode
              onClick={() =>
                setThemeMode(themeMode == "light" ? "dark" : "light")
              }
              sx={{ width: "25px", height: "25px", color: "text.primary" }}
            />
          )}
          <Notifications
            sx={{ width: "25px", height: "25px", color: "warning.main" }}
          />
          <Settings
            sx={{ width: "25px", height: "25px", color: "text.secondary" }}
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
