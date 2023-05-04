import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FadeIn } from "./PageTransition";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";
import { ReplayOutlined, ReportProblem } from "@mui/icons-material";
import logo from "../assets/images/Logo-easework.png";

export default function ErrorPage() {
  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

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
        <Box
          sx={{
            ...FlexBox,
            gap: 1,
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          {/* <Typography variant="h1">Oops!</Typography> */}
          <Box sx={{ width: { xs: "100%", lg: "100%" } }}>
            <Box sx={{ width: "100%" }}>
              <ReportProblem
                sx={{
                  width: { xs: "30vw", lg: "15vw" },
                  height: { xs: "30vw", lg: "15vw" },
                }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "40vw", lg: "15vw" },
                height: "auto",
                filter: "grayscale()",
              }}
              component="img"
              src={logo}
            />
          </Box>
          <Typography variant={isXS ? "h4" : "h3"}>APP CRASHED</Typography>
          <Typography
            sx={{
              width: "100vw",
              backgroundColor: "text.primary",
              color: "background.default",
            }}
            variant={isXS ? "body1" : "h6"}
            fontWeight={500}
          >
            FIRMVISION ENCOUNTERED AN ERROR!
          </Typography>
          {/* <Typography variant="h6">Looks like we ran into an problem!</Typography> */}
          {/* <Typography variant="body2">Check the console for more details or contact FIRMVISION support.</Typography> */}
          <Button
            sx={{ mt: 2.5, backgroundColor: "black" }}
            onClick={() => location.reload()}
            endIcon={<ReplayOutlined />}
            variant="contained"
          >
            Reload App
          </Button>
        </Box>
      </Box>
    </FadeIn>
  );
}
