import { SideFade } from "./PageTransition";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
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
          <Typography
            fontWeight={700}
            color="primary.main"
            variant={isXS ? "body2" : "body1"}
          >
            {data?.details}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </SideFade>
  );
}
