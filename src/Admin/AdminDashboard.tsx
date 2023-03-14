import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { SideFade } from "../components/PageTransition";
import StatisticsChart from "../components/StatisticsChart";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import AdminPagesContainer from "./AdminPagesContainer";

export default function AdminDashboard() {
  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

  const data = [
    {
      name: "Monday",
      assignedTasks: 4000,
      completedTasks: 2400,
      reportedTasks: 900,
      amt: 2400,
    },
    {
      name: "Tuesday",
      assignedTasks: 3000,
      completedTasks: 1398,
      reportedTasks: 1000,
      amt: 2210,
    },
    {
      name: "Wednesday",
      assignedTasks: 2000,
      completedTasks: 9800,
      reportedTasks: 1500,

      amt: 2290,
    },
    {
      name: "Thursday",
      assignedTasks: 2780,
      completedTasks: 3908,
      reportedTasks: 1000,

      amt: 2000,
    },
    {
      name: "Firday",
      assignedTasks: 1890,
      completedTasks: 4800,
      reportedTasks: 2000,

      amt: 2181,
    },
    {
      name: "Monday",
      assignedTasks: 2390,
      completedTasks: 3800,
      reportedTasks: 1200,

      amt: 2500,
    },
    {
      name: "Tuesday",
      assignedTasks: 3490,
      completedTasks: 4300,
      reportedTasks: 800,

      amt: 2100,
    },
  ];

  return (
    <AdminPagesContainer>
      <SideFade>
        {/* MAIN CONTIANER */}
        <Box sx={{ ...FlexBox, width: { xs: "100vw", lg: "95vw" } }}>
          {/* ROW 1 */}
          <Box
            sx={{
              ...FlexBox,
              flexDirection: "row",
              justifyContent: "space-between",
              p: 2.5,
            }}
          >
            {/* LEFT SIDE */}
            <Box
              sx={{
                ...FlexBox,
                gap: 1,
              }}
            >
              <Box
                sx={{
                  ...FlexBox,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  gap: 1,
                }}
              >
                <Typography
                  sx={{ color: "text.secondary" }}
                  variant={isXS ? "body1" : "h6"}
                  fontWeight={700}
                >
                  Welcome,
                </Typography>
                <Typography variant={isXS ? "h5" : "h3"} fontWeight={700}>
                  Haseeb Qureshi
                </Typography>
              </Box>
              <Box
                sx={{
                  ...FlexBox,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <Typography
                  sx={{ color: "text.secondary" }}
                  variant={isXS ? "body1" : "h6"}
                  fontWeight={700}
                >
                  Wednesday, February, 2023
                </Typography>
              </Box>
            </Box>
            {/* RIGHT SIDE */}
            <Box
              sx={{
                ...FlexBox,
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 1,
                display: { xs: "none", lg: "flex" },
              }}
            >
              <Typography variant="h1" fontWeight={700}>
                10:25 AM
              </Typography>
            </Box>
          </Box>
          {/* ROW 2 */}
          <Box sx={{ width: "100%" }}>
            <StatisticsChart data={data} />
          </Box>
        </Box>
      </SideFade>
    </AdminPagesContainer>
  );
}
