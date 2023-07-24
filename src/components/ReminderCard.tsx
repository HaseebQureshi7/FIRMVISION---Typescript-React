import { Box, Typography } from "@mui/material";
import { DateFormatter } from "./DateFormatter";
import { SideFade } from "./PageTransition";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";
import isXSmall from "./isXSmall";

export default function ReminderCard({ data }: any) {
  const { isXS } = isXSmall();
  return (
    <>
      <SideFade>
        <Box
          sx={{
            ...FlexBox,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            p: 2,
            border: "2px solid lightgrey",
            borderRadius: "10px",
          }}
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
              color="text.secondary"
              variant={isXS ? "body2" : "body1"}
            >
              Name:{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                {data?.name}
              </Box>
            </Typography>
            <Typography
              fontWeight={700}
              color="text.secondary"
              variant={isXS ? "body2" : "body1"}
            >
              Set for:{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                {DateFormatter(data?.setDate)}
              </Box>
            </Typography>
          </Box>
          <Typography
            fontWeight={700}
            color="text.secondary"
            variant={isXS ? "body2" : "body1"}
          >
            Message:{" "}
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: "info.main",
              }}
            >
              {data?.details}
            </Box>
          </Typography>
        </Box>
      </SideFade>
    </>
  );
}
