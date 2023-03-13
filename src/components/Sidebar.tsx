import {
  Assignment,
  Home,
  NotificationAdd,
  Person2,
  PersonAdd,
  PersonSearch,
  PowerOff,
  PowerSettingsNew,
  QuestionAnswer,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";

export default function Sidebar({ openSidebar, setOpenSidebar }: any) {
  return (
    <>
      <Box
        sx={{
          ...FlexBox,
          zIndex: 2,
          gap: 1,
          justifyContent: "flex-start",
          width: openSidebar,
          height: "100vh",
          backgroundColor: "background.default",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          transition: "width 0.1s ease-in-out",
        }}
        onMouseOver={() => setOpenSidebar("20vw")}
        onMouseOut={() => setOpenSidebar("5vw")}
      >
        {/* HEAD */}
        <Box sx={{ ...FlexBox, flex: 4, mt: 5, gap: 1.5 }}>
          <Avatar
            sx={{
              width: {
                xs: openSidebar == "5vw" ? "0" : "35px",
                lg: openSidebar == "5vw" ? "40px" : "75px",
              },
              height: {
                xs: openSidebar == "5vw" ? "0" : "35px",
                lg: openSidebar == "5vw" ? "40px" : "75px",
              },
              transition: "0.5s all",
            }}
          />
          <Typography
            sx={{
              opacity: openSidebar == "5vw" ? "0" : "1",
              display: { xs: "none", lg: "inherit" },
              color: "primary.main",
              fontWeight: 700,
              whiteSpace: "nowrap",
              transition: "0.1s opacity",
              transitionDelay: "0.05s",
            }}
            variant="h6"
          >
            Haseeb Qureshi
          </Typography>
          <Typography
            sx={{
              opacity: openSidebar == "5vw" ? "0" : "1",
              display: { xs: "none", lg: "inherit" },
              color: "text.secondary",
              fontWeight: 700,
              whiteSpace: "nowrap",
              transition: "0.1s opacity",
              transitionDelay: "0.15s",
            }}
            variant="body2"
          >
            Admin
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", my: 2 }} />

        {/* ACTIONS */}
        <Box sx={{ ...FlexBox, flex: 6, gap: 2.5 }}>
          <Box
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
            }}
          >
            <PersonAdd
              sx={{ width: "35px", height: "35px", color: "primary.main" }}
            />
            <Typography
              sx={{
                opacity: openSidebar == "5vw" ? "0" : "1",
                color: "primary.main",
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "0.1s opacity",
                transitionDelay: "0.15s",
              }}
              variant="body1"
              color="text.primary"
            >
              Add Employees
            </Typography>
          </Box>
          {/* <Divider sx={{width:'100%'}}/> */}

          <Box
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
            }}
          >
            <PersonSearch
              sx={{ width: "35px", height: "35px", color: "primary.main" }}
            />
            <Typography
              sx={{
                opacity: openSidebar == "5vw" ? "0" : "1",
                color: "primary.main",
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "0.1s opacity",
                transitionDelay: "0.25s",
              }}
              variant="body1"
              color="text.primary"
            >
              Search Employees
            </Typography>
          </Box>
          {/* <Divider sx={{width:'100%'}}/> */}

          <Box
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
            }}
          >
            <Assignment
              sx={{ width: "35px", height: "35px", color: "primary.main" }}
            />
            <Typography
              sx={{
                opacity: openSidebar == "5vw" ? "0" : "1",
                color: "primary.main",
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "0.1s opacity",
                transitionDelay: "0.35s",
              }}
              variant="body1"
              color="text.primary"
            >
              Assigned Tasks
            </Typography>
          </Box>

          <Box
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
            }}
          >
            <QuestionAnswer
              sx={{ width: "35px", height: "35px", color: "primary.main" }}
            />
            <Typography
              sx={{
                opacity: openSidebar == "5vw" ? "0" : "1",
                color: "primary.main",
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "0.1s opacity",
                transitionDelay: "0.45s",
              }}
              variant="body1"
              color="text.primary"
            >
              Conversations
            </Typography>
          </Box>
          {/* <Divider sx={{width:'100%'}}/> */}

          <Box
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
            }}
          >
            <NotificationAdd
              sx={{ width: "35px", height: "35px", color: "primary.main" }}
            />
            <Typography
              sx={{
                opacity: openSidebar == "5vw" ? "0" : "1",
                color: "primary.main",
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "0.1s opacity",
                transitionDelay: "0.55s",
              }}
              variant="body1"
              color="text.primary"
            >
              Add Reminders
            </Typography>
          </Box>
          {/* <Divider sx={{width:'100%'}}/> */}
        </Box>

        <Divider sx={{ width: "100%", my: 2 }} />

        {/* QUICK LINKS */}
        <Box sx={{ ...FlexBox, flex: 2, gap: 2.5 }}>
          <Box
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
            }}
          >
            <Home
              sx={{ width: "35px", height: "35px", color: "primary.main" }}
            />
            <Typography
              sx={{
                opacity: openSidebar == "5vw" ? "0" : "1",
                color: "primary.main",
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "0.1s opacity",
                transitionDelay: "0.15s",
              }}
              variant="body1"
              color="text.primary"
            >
              Home
            </Typography>
          </Box>

          <Box
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
            }}
          >
            <Settings
              sx={{ width: "35px", height: "35px", color: "primary.main" }}
            />
            <Typography
              sx={{
                opacity: openSidebar == "5vw" ? "0" : "1",
                color: "primary.main",
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "0.1s opacity",
                transitionDelay: "0.25s",
              }}
              variant="body1"
              color="text.primary"
            >
              Settings
            </Typography>
          </Box>
          {/* <Divider sx={{width:'100%'}}/> */}
        </Box>

        <Divider sx={{ width: "100%", mt: 2.5 }} />

        {/* QUICK LINKS */}
        <Box sx={{ ...FlexBox, flex: 2, gap: 2.5 }}>
          <Box
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
            }}
          >
            <PowerSettingsNew
              sx={{ width: "35px", height: "35px", color: "error.main" }}
            />
            <Typography
              sx={{
                opacity: openSidebar == "5vw" ? "0" : "1",
                color: "error.main",
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "0.1s opacity",
                transitionDelay: "0.15s",
              }}
              variant="body1"
              color="text.primary"
            >
              Logout
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
