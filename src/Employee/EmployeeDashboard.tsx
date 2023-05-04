import {
  AssignmentInd,
  Groups,
  NotificationImportant,
  ReportProblem,
  Task,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
  Paper,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getEmpsQD,
  getRemsQD,
  getTasksQD,
} from "../components/AdminGlobalDataHandler";
import LiveClock from "../components/LiveClock";
import { SideFade } from "../components/PageTransition";
import StatisticsChart from "../components/StatisticsChart";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import EmployeePagesContainer from "./EmployeePagesContainer";
import EmployeeTable from "../components/EmployeeTable";
import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

  const navigate = useNavigate();

  const [upTime, setUpTime] = useState<number>(0);

  const user: any | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  // TOTAL TIME SPENT (ACTIVE TIME)
  useEffect(() => {
    let intervalId: any;
    if (localStorage.getItem("active-time")) {
      intervalId = setInterval(() => {
        const activeTimeRaw: string | null =
          localStorage.getItem("active-time");
        const activeTime: number = parseInt(activeTimeRaw ?? "0");
        const one: any = 1;
        localStorage.setItem("active-time", activeTime + one);
        secondsToMinutes(localStorage.getItem("active-time"));
      }, 1000);
    } else {
      const ls: any = 0;
      localStorage.setItem("active-time", ls);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // CONVERSION OF SECONDS INTO MINUTES
  function secondsToMinutes(seconds: any) {
    const minutes = seconds / 60;
    const roundedMinutes: number = Math.floor(minutes * 10) / 10;
    setUpTime(roundedMinutes);
  }

  return (
    <EmployeePagesContainer>
      <SideFade>
        {/* MAIN CONTIANER */}
        <Box sx={{ ...FlexBox, width: { xs: "100vw", lg: "95vw" } }}>
          {/* ROW 1 */}
          <Box
            sx={{
              ...FlexBox,
              flexDirection: "row",
              justifyContent: "space-between",
              px: 2.5,
              py: 1,
            }}
          >
            {/* LEFT SIDE */}
            <Box
              sx={{
                ...FlexBox,
                gap: 1,
              }}
            >
              {/* LR1 */}
              <Box
                sx={{
                  ...FlexBox,
                  flexDirection: { xs: "column", lg: "row" },
                  justifyContent: "flex-start",
                  alignItems: { xs: "flex-start", lg: "flex-end" },
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
                <Typography
                  sx={{ color: "text.primary" }}
                  variant={isXS ? "h5" : "h3"}
                  fontWeight={700}
                >
                  {user?.name}
                </Typography>
              </Box>
              {/* LR2 */}
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
                width: { xs: "50%", lg: "100%" },
              }}
            >
              <Typography
                sx={{ textAlign: "center", color: "text.primary" }}
                variant={isXS ? "h4" : "h1"}
                fontWeight={700}
              >
                <LiveClock />
              </Typography>
            </Box>
          </Box>
        </Box>
      </SideFade>
    </EmployeePagesContainer>
  );
}
