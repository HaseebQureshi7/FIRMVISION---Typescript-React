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
  ButtonBase,
  Divider,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";

export default function Sidebar({ openSidebar, setOpenSidebar }: any) {
  return (
    <Box
      sx={{
        width: openSidebar,
        transition: "width 0.1s ease-in-out",
      }}
    >
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
          position: "fixed",
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
        <Box sx={{ ...FlexBox, flex: 6, gap: 0 }}>
          <ButtonBase
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
              py: 1.75,
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
                display: { xs: "none", lg: "inherit" },
              }}
              variant="body1"
              color="text.primary"
            >
              Add Employees
            </Typography>
          </ButtonBase>
          {/* <Divider sx={{width:'100%'}}/> */}

          <ButtonBase
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
              py: 1.75,
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
                display: { xs: "none", lg: "inherit" },
              }}
              variant="body1"
              color="text.primary"
            >
              Search Employees
            </Typography>
          </ButtonBase>
          {/* <Divider sx={{width:'100%'}}/> */}

          <ButtonBase
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
              py: 1.75,
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
                display: { xs: "none", lg: "inherit" },
              }}
              variant="body1"
              color="text.primary"
            >
              Assigned Tasks
            </Typography>
          </ButtonBase>

          <ButtonBase
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
              py: 1.75,
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
                display: { xs: "none", lg: "inherit" },
              }}
              variant="body1"
              color="text.primary"
            >
              Conversations
            </Typography>
          </ButtonBase>
          {/* <Divider sx={{width:'100%'}}/> */}

          <ButtonBase
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
              py: 1.75,
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
                display: { xs: "none", lg: "inherit" },
              }}
              variant="body1"
              color="text.primary"
            >
              Add Reminders
            </Typography>
          </ButtonBase>
          {/* <Divider sx={{width:'100%'}}/> */}
        </Box>

        <Divider sx={{ width: "100%", my: 0 }} />

        {/* QUICK LINKS */}
        <Box sx={{ ...FlexBox, flex: 2, gap: 0 }}>
          <ButtonBase
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
              py: 1.75,
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
                display: { xs: "none", lg: "inherit" },
              }}
              variant="body1"
              color="text.primary"
            >
              Home
            </Typography>
          </ButtonBase>

          <ButtonBase
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
              py: 1.75,
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
                display: { xs: "none", lg: "inherit" },
              }}
              variant="body1"
              color="text.primary"
            >
              Settings
            </Typography>
          </ButtonBase>
          {/* <Divider sx={{width:'100%'}}/> */}
        </Box>

        <Divider sx={{ width: "100%", mt: 0.5 }} />

        {/* LOGOUT */}
        <Box sx={{ ...FlexBox, flex: 2, gap: 2.5 }}>
          <ButtonBase
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              pl: 2.5,
              py: 1.75,
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
                display: { xs: "none", lg: "inherit" },
              }}
              variant="body1"
              color="text.primary"
            >
              Logout
            </Typography>
          </ButtonBase>
        </Box>
      </Box>
    </Box>
  );
}
