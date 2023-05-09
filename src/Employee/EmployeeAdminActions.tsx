import React from "react";
import EmployeePagesContainer from "./EmployeePagesContainer";
import { SideFade } from "../components/PageTransition";
import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import {
  Article,
  FormatItalic,
  InsertPageBreak,
  Receipt,
} from "@mui/icons-material";

export default function EmployeeAdminActions() {
  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

  return (
    <EmployeePagesContainer>
      <SideFade>
        <Box
          sx={{
            ...FlexBox,
            width: { xs: "100vw", lg: "95vw" },
            p: { xs: 2.5, lg: 5 },
          }}
        >
          {/* HEADER */}
          <Box sx={{ ...FlexBox, alignItems: "flex-start" }}>
            <Typography
              sx={{ fontWeight: 500 }}
              variant={isXS ? "h4" : "h3"}
              color="text.primary"
            >
              Admin Actions
            </Typography>
            <Divider sx={{ width: "100%" }} />
          </Box>

          {/* ROW 2 */}
          <Box
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: "column",
              alignItems: { xs: "center", lg: "flex-start" },
              justifyContent: "flex-start",
              gap: 0,
            }}
          >
            <Typography
              sx={{ fontWeight: 500, my: 5 }}
              variant={isXS ? "h5" : "h4"}
              color="primary.main"
            >
              Admin Actions (3)
            </Typography>
            {/* L1 */}
            {/* <Box sx={{}}>
              <Typography fontWeight={700} color="GrayText" variant="body1">
                The following are recommended steps that can be taken to apprise
                your administrator of pertinent information:
              </Typography>
            </Box> */}
            {/* L2 */}
            <Box
              sx={{
                ...FlexBox,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* SECTION */}
              <Box
                sx={{
                  ...FlexBox,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  border: "2px solid lightgrey",
                  borderRadius: "10px",
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                  fontWeight={500}
                  color="text.primary"
                  variant="h6"
                >
                  <Receipt sx={{ color: "info.main" }} />
                  Make a Leave letter
                </Typography>
                <Button
                  endIcon={<FormatItalic />}
                  variant="contained"
                  size="large"
                  color="info"
                >
                  Make Letter
                </Button>
              </Box>
              {/* SECTION */}
              <Box
                sx={{
                  ...FlexBox,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  border: "2px solid lightgrey",
                  borderRadius: "10px",
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                  fontWeight={500}
                  color="text.primary"
                  variant="h6"
                >
                  <InsertPageBreak sx={{ color: "error.main" }} />
                  Make a Resignation letter
                </Typography>
                <Button
                  endIcon={<FormatItalic />}
                  variant="contained"
                  size="large"
                  color="error"
                >
                  Make Letter
                </Button>
              </Box>
              {/* SECTION */}
              <Box
                sx={{
                  ...FlexBox,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  border: "2px solid lightgrey",
                  borderRadius: "10px",
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                  fontWeight={500}
                  color="text.primary"
                  variant="h6"
                >
                  <Article sx={{ color: "primary.main" }} />
                  Type your own letter
                </Typography>
                <Button
                  endIcon={<FormatItalic />}
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  Make Letter
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </SideFade>
    </EmployeePagesContainer>
  );
}
