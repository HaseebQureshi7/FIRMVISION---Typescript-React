import { DarkMode, Menu, Notifications, Settings } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";

export default function Appbar({ openSidebar, setOpenSidebar }: any) {
  return (
    <>
      <Box
        sx={{
          ...FlexBox,
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
          height: "60px",
          borderBottom: "2px solid lightgrey",
        }}
      >
        <Box
          sx={{
            flex: 3,
            ...FlexBox,
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
            Valley Mist Automations
          </Typography>
          <Menu
            sx={{ display: { xs: "inherit", lg: "none" } }}
            onClick={() =>
              setOpenSidebar(openSidebar == "0vw" ? "20vw" : "0vw")
            }
          />
        </Box>
        <Box
          sx={{
            flex: { xs: 4, lg: 1 },
            ...FlexBox,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <DarkMode sx={{ width: "25px", height: "25px" }} />
          <Notifications sx={{ width: "25px", height: "25px" }} />
          <Settings sx={{ width: "25px", height: "25px" }} />
        </Box>
      </Box>
    </>
  );
}
