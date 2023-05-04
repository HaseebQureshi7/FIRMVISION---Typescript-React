import { Box, Typography, Button } from "@mui/material";
import { FadeIn } from "./PageTransition";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";
import { ReplayOutlined, ReportProblem } from "@mui/icons-material";

export default function ErrorPage() {
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
        <Box sx={{ ...FlexBox, gap: 1, textAlign: "center" }}>
          {/* <Typography variant="h1">Oops!</Typography> */}
          <ReportProblem sx={{ width: "25vh", height: "25vh" }} />
          <Typography variant="h3">APP CRASHED</Typography>
          <Typography variant="h6" fontWeight={500}>
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
