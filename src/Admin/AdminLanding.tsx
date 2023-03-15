import { Box, Typography, Button } from "@mui/material";
import { FadeIn } from "../components/PageTransition";
import { FlexBox } from "./../components/StyleExtensions.tsx/FlexBox";
import logo from "../assets/images/Logo-easework.png";
import heroImage from "../assets/images/hero-illustration.png";
import invite from "../assets/images/invite.png";
import manage from "../assets/images/manage.png";
import assign from "../assets/images/assign.png";
import complete from "../assets/images/complete.png";
import { useNavigate } from "react-router-dom";

export default function AdminLanding() {
  const navigate = useNavigate();

  return (
    <FadeIn>
      <Box
        sx={{
          ...FlexBox,
          p: { xs: 2, lg: 5 },
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        {/* SECTION 1 */}
        <Box
          sx={{
            ...FlexBox,
            flexDirection: { xs: "column-reverse", lg: "row" },
            gap: 2,
          }}
        >
          {/* LEFTSIDE */}
          <Box
            sx={{
              ...FlexBox,
              alignItems: { xs: "flex-start", lg: "flex-start" },
              textAlign: { xs: "start", lg: "start" },
              flex: 4,
              height: "50vh",
              justifyContent: "flex-start",
              gap: 0,
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: { xs: "3rem", lg: "5rem" } }}
              variant="h1"
              color="text.primary"
            >
              All the
            </Typography>
            <Typography
              sx={{ fontWeight: 700, fontSize: { xs: "3rem", lg: "5rem" } }}
              variant="h1"
              color="primary.main"
            >
              Management
            </Typography>
            <Typography
              sx={{ fontWeight: 700, fontSize: { xs: "3rem", lg: "5rem" } }}
              variant="h1"
              color="text.primary"
            >
              you{"’"}ll ever need!
            </Typography>
            <Box
              sx={{
                ...FlexBox,
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", lg: "center" },
                flexDirection: { xs: "column", lg: "row" },
                mt: { xs: 5, lg: 2.5 },
              }}
            >
              <Button
                sx={{ p: "8px 50px", fontWeight: 700 }}
                variant="outlined"
                color="secondary"
              >
                Firmvision for Employees
              </Button>
              <Button
                onClick={() => navigate("signup")}
                sx={{ p: "8px 50px", fontWeight: 700, color: "white" }}
                variant="contained"
                color="info"
              >
                Get started today
              </Button>
              <Button
                onClick={() => navigate("login")}
                sx={{ p: "8px 50px", fontWeight: 700 }}
                variant="contained"
                color="primary"
              >
                GO TO LOGIN
              </Button>
            </Box>
          </Box>
          {/* RIGHTSIDE */}
          <Box
            sx={{
              ...FlexBox,
              // display:{xs:'none', lg:'flex'},
              alignItems: { xs: "center", lg: "flex-end" },
              flex: 3,
              width: "100%",
              height: "50vh",
              mb: { xs: 5, lg: 0 },
            }}
          >
            <Box sx={{ width: { xs: "100%", lg: "100%" } }}>
              <Box
                sx={{
                  width: { xs: "50vw", lg: "10vw" },
                  height: "auto",
                  float: { xs: "left", lg: "right" },
                }}
                component="img"
                src={logo}
              />
            </Box>
            <Box
              sx={{
                width: "auto",
                display: { xs: "none", lg: "inherit" },
                height: { xs: "20vh", lg: "45vh" },
              }}
              component="img"
              src={heroImage}
            />
          </Box>
        </Box>
        {/* SECTION 2 */}
        <Box
          sx={{
            ...FlexBox,
            // display: { xs: "none", lg: "flex" },
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: { xs: 15, lg: 5 },
          }}
        >
          <Box sx={{ ...FlexBox }}>
            <Box
              sx={{ width: "10vw", height: "auto" }}
              component="img"
              src={invite}
            />
            <Typography
              sx={{
                color: "primary.light",
                fontWeight: 700,
                display: { xs: "none", lg: "flex" },
              }}
              variant="h6"
            >
              Invite
            </Typography>
          </Box>
          <Box sx={{ ...FlexBox }}>
            <Box
              sx={{ width: "10vw", height: "auto" }}
              component="img"
              src={manage}
            />
            <Typography
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                display: { xs: "none", lg: "flex" },
              }}
              variant="h6"
            >
              Manage
            </Typography>
          </Box>
          <Box sx={{ ...FlexBox }}>
            <Box
              sx={{ width: "10vw", height: "auto" }}
              component="img"
              src={assign}
            />
            <Typography
              sx={{
                color: "primary.dark",
                fontWeight: 700,
                display: { xs: "none", lg: "flex" },
              }}
              variant="h6"
            >
              Assign
            </Typography>
          </Box>
          <Box sx={{ ...FlexBox }}>
            <Box
              sx={{ width: "10vw", height: "auto" }}
              component="img"
              src={complete}
            />
            <Typography
              sx={{
                color: "crimson",
                fontWeight: 700,
                display: { xs: "none", lg: "flex" },
              }}
              variant="h6"
            >
              Complete
            </Typography>
          </Box>
        </Box>
      </Box>
    </FadeIn>
  );
}
