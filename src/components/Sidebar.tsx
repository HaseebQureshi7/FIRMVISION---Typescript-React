import {
  AdminPanelSettings,
  Assignment,
  Grading,
  Home,
  NotificationAdd,
  Person,
  Person2,
  PersonAdd,
  PersonSearch,
  PowerOff,
  PowerSettingsNew,
  QuestionAnswer,
  Settings,
} from "@mui/icons-material";
import { Avatar, Box, ButtonBase, Divider, Typography } from "@mui/material";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalSnackbarContext } from "../context/GlobalSnackbarContext";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";
import {
  ExtractedSnackBarTypes,
  SnackbarTypes,
} from "./../types/SnackbarTypes";

export default function Sidebar({ user, openSidebar, setOpenSidebar }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  const { openSnack, setOpenSnack } = useContext<ExtractedSnackBarTypes>(
    GlobalSnackbarContext
  );

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
          // boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          borderRight: "2px solid lightgrey",
          transition: "width 0.1s ease-in-out",
          position: "fixed",
        }}
        onMouseOver={() => setOpenSidebar("20vw")}
        onMouseOut={() => setOpenSidebar("5vw")}
      >
        {/* HEAD */}
        <Box
          sx={{
            ...FlexBox,
            flex: 4,
            mt: openSidebar == "5vw" ? 0 : 5,
            gap: 1.5,
            transition: "all .5s",
          }}
        >
          <Avatar
            src={user?.picture}
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
              color: "text.primary",
              fontWeight: 700,
              whiteSpace: "nowrap",
              transition: "0.1s opacity",
              transitionDelay: "0.05s",
            }}
            variant="h6"
          >
            {user?.name}
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
            {user?.position || "Admin"}
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", my: 2 }} />

        {/* ADMIN ACTIONS */}
        {!user?.position && (
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
              onClick={() => navigate("/admin/addemployee")}
            >
              <PersonAdd
                sx={{
                  width: "35px",
                  height: "35px",
                  color: location.pathname.includes("addemployee")
                    ? "primary.main"
                    : "text.secondary",
                }}
              />
              <Typography
                sx={{
                  opacity: openSidebar == "5vw" ? "0" : "1",
                  color: location.pathname.includes("addemployee")
                    ? "primary.main"
                    : "text.secondary",
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
              onClick={() => navigate("/admin/searchemployees")}
            >
              <PersonSearch
                sx={{
                  width: "35px",
                  height: "35px",
                  color: location.pathname.includes("searchemployee")
                    ? "primary.main"
                    : "text.secondary",
                }}
              />
              <Typography
                sx={{
                  opacity: openSidebar == "5vw" ? "0" : "1",
                  color: location.pathname.includes("searchemployee")
                    ? "primary.main"
                    : "text.secondary",
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
              onClick={() => navigate("/admin/assignedtasks")}
            >
              <Assignment
                sx={{
                  width: "35px",
                  height: "35px",
                  color: location.pathname.includes("assignedtasks")
                    ? "primary.main"
                    : "text.secondary",
                }}
              />
              <Typography
                sx={{
                  opacity: openSidebar == "5vw" ? "0" : "1",
                  color: location.pathname.includes("assignedatasks")
                    ? "primary.main"
                    : "text.secondary",
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
              onClick={() =>
                setOpenSnack({
                  open: true,
                  message: "Feature not yet implemented!",
                  severity: "warning",
                })
              }
            >
              <QuestionAnswer
                sx={{
                  width: "35px",
                  height: "35px",
                  color: location.pathname.includes("conversation")
                    ? "primary.main"
                    : "text.secondary",
                }}
              />
              <Typography
                sx={{
                  opacity: openSidebar == "5vw" ? "0" : "1",
                  color: location.pathname.includes("conversation")
                    ? "primary.main"
                    : "text.secondary",
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
              onClick={() => navigate("/admin/addreminders")}
            >
              <NotificationAdd
                sx={{
                  width: "35px",
                  height: "35px",
                  color: location.pathname.includes("reminder")
                    ? "primary.main"
                    : "text.secondary",
                }}
              />
              <Typography
                sx={{
                  opacity: openSidebar == "5vw" ? "0" : "1",
                  color: location.pathname.includes("reminder")
                    ? "primary.main"
                    : "text.secondary",
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
        )}

        {/* EMPLOYEE ACTIONS */}
        {user?.position && (
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
              onClick={() => navigate("/employee/yourtasks")}
            >
              <Grading
                sx={{
                  width: "35px",
                  height: "35px",
                  color: location.pathname.includes("yourtasks")
                    ? "primary.main"
                    : "text.secondary",
                }}
              />
              <Typography
                sx={{
                  opacity: openSidebar == "5vw" ? "0" : "1",
                  color: location.pathname.includes("yourtasks")
                    ? "primary.main"
                    : "text.secondary",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  transition: "0.1s opacity",
                  transitionDelay: "0.35s",
                  display: { xs: "none", lg: "inherit" },
                }}
                variant="body1"
                color="text.primary"
              >
                Your Tasks
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
              onClick={() => navigate("/employee/yourteam")}
            >
              <Person
                sx={{
                  width: "35px",
                  height: "35px",
                  color: location.pathname.includes("yourteam")
                    ? "primary.main"
                    : "text.secondary",
                }}
              />
              <Typography
                sx={{
                  opacity: openSidebar == "5vw" ? "0" : "1",
                  color: location.pathname.includes("yourteam")
                    ? "primary.main"
                    : "text.secondary",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  transition: "0.1s opacity",
                  transitionDelay: "0.25s",
                  display: { xs: "none", lg: "inherit" },
                }}
                variant="body1"
                color="text.primary"
              >
                Your Team
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
              onClick={() =>
                setOpenSnack({
                  open: true,
                  message: "Feature not yet implemented!",
                  severity: "warning",
                })
              }
            >
              <QuestionAnswer
                sx={{
                  width: "35px",
                  height: "35px",
                  color: location.pathname.includes("conversation")
                    ? "primary.main"
                    : "text.secondary",
                }}
              />
              <Typography
                sx={{
                  opacity: openSidebar == "5vw" ? "0" : "1",
                  color: location.pathname.includes("conversation")
                    ? "primary.main"
                    : "text.secondary",
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
              onClick={() => navigate("/employee/adminactions")}
            >
              <AdminPanelSettings
                sx={{
                  width: "35px",
                  height: "35px",
                  color: location.pathname.includes("adminactions")
                    ? "primary.main"
                    : "text.secondary",
                }}
              />
              <Typography
                sx={{
                  opacity: openSidebar == "5vw" ? "0" : "1",
                  color: location.pathname.includes("adminactions")
                    ? "primary.main"
                    : "text.secondary",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  transition: "0.1s opacity",
                  transitionDelay: "0.55s",
                  display: { xs: "none", lg: "inherit" },
                }}
                variant="body1"
                color="text.primary"
              >
                Admin Actions
              </Typography>
            </ButtonBase>
            {/* <Divider sx={{width:'100%'}}/> */}
          </Box>
        )}

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
            onClick={() => {location.pathname.includes('employee') ? navigate("/employee/dashboard") : navigate("/admin/dashboard")}}
          >
            <Home
              sx={{
                width: "35px",
                height: "35px",
                color: location.pathname.includes("dashboard")
                  ? "primary.main"
                  : "text.secondary",
              }}
            />
            <Typography
              sx={{
                opacity: openSidebar == "5vw" ? "0" : "1",
                color: location.pathname.includes("dashboard")
                  ? "primary.main"
                  : "text.secondary",
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
            onClick={() => {location.pathname.includes('employee') ? navigate("/employee/settings") : navigate("/admin/settings")}}
          >
            <Settings
              sx={{
                width: "35px",
                height: "35px",
                color: location.pathname.includes("setting")
                  ? "primary.main"
                  : "text.secondary",
              }}
            />
            <Typography
              sx={{
                opacity: openSidebar == "5vw" ? "0" : "1",
                color: location.pathname.includes("setting")
                  ? "primary.main"
                  : "text.secondary",
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
            onClick={() => {
              localStorage.clear();
              navigate("/");
              setOpenSnack({
                open: true,
                message: "Logout was Successful",
                severity: "warning",
              });
            }}
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
