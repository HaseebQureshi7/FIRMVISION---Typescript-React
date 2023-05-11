import { SideFade } from "./PageTransition";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { Done, ExpandMore, Report } from "@mui/icons-material";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";
import { DateFormatter } from "./DateFormatter";
import isXSmall from "./isXSmall";

export default function TaskCard({ data }: any) {
  const { isXS } = isXSmall();

  return (
    <SideFade>
      <Accordion
        key={data?._id}
        elevation={3}
        sx={{ flex: 1, width: "100%", p: 1, m: 1 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-label="Expand"
          aria-controls="-content"
          id="-header"
        >
          <Box
            sx={{
              ...FlexBox,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontWeight={700}
              color={
                data?.priority === "High"
                  ? "error.main"
                  : data?.priority === "Low"
                  ? "success.main"
                  : data?.priority === "Neutral"
                  ? "info.main"
                  : "success.main"
              }
              variant={isXS ? "body2" : "body1"}
            >
              {data?.priority}
            </Typography>
            <Typography
              fontWeight={700}
              color="text.primary"
              variant={isXS ? "body2" : "body1"}
            >
              {data?.name}
            </Typography>
            <Typography
              fontWeight={700}
              color="text.primary"
              variant={isXS ? "body2" : "body1"}
            >
              {DateFormatter(data?.deadline)}
            </Typography>
            <Typography
              fontWeight={700}
              color="GrayText"
              variant={isXS ? "body2" : "body1"}
            ></Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant={isXS ? "body2" : "body1"}>
            Task Details -{" "}
            <Box
              component={"span"}
              sx={{ color: "primary.main", fontWeight: 700 }}
            >
              {data?.details}
            </Box>
          </Typography>
          {data?.status == "complete" ? (
            <Typography variant={isXS ? "body2" : "body1"}>
              Report -{" "}
              <Box
                component={"span"}
                sx={{ color: "info.main", fontWeight: 700 }}
              >
                {data?.submittionReport}
              </Box>
            </Typography>
          ) : (
            ""
          )}
          {localStorage.getItem("employee-token") &&
          data?.status == "incomplete" ? (
            <Box
              sx={{
                ...FlexBox,
                flexDirection: "row",
                justifyContent: "flex-end",
                mt: 2.5,
              }}
            >
              <Button
                size={isXS ? "small" : "large"}
                startIcon={<Done />}
                variant="contained"
                color="primary"
              >
                Submit Report
              </Button>
              <Button
                size={isXS ? "small" : "large"}
                startIcon={<Report />}
                variant="contained"
                color="error"
              >
                Report Problem
              </Button>
            </Box>
          ) : null}
        </AccordionDetails>
      </Accordion>
    </SideFade>
  );
}
