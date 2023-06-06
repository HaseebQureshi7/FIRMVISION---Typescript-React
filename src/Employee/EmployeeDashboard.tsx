import {
  AssignmentInd,
  EmojiEvents,
  ExpandMore,
  Groups,
  NotificationImportant,
  ReportProblem,
  Task,
  TaskAlt,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
import {
  getEmpTasksQD,
  getEmpTeamQD,
} from "../components/EmployeeGlobalDataHandler";
import { DateFormatter } from "../components/DateFormatter";
import TaskCard from "../components/TaskCard";
import isXSmall from "../components/isXSmall";

export default function EmployeeDashboard() {
  const { isXS } = isXSmall();

  const navigate = useNavigate();

  const [upTime, setUpTime] = useState<number>(0);

  const { data: empTaskData } = getEmpTasksQD();

  const user: any | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  // ACTIVE TASKS
  const activeTasks = empTaskData?.filter((data: any) => {
    return data.status == "incomplete";
  });

  // COMPLETED TASKS
  const completedTasks = empTaskData?.filter((data: any) => {
    return data.status == "complete";
  });

  // REPORTED TASKS.
  // LOOKS FOR STATUS COMPLETION WITH NO SUBMITTION REPORT.
  const reportedTasks = empTaskData?.filter((data: any) => {
    return data.status == "reported";
  });

  // YOUR EFFICIENCY
  const yourEfficiency =
    completedTasks?.length == 0 && empTaskData?.length == 0
      ? "No Data"
      : (completedTasks?.length / empTaskData?.length) * 100 + "%";

  const StatisticalData = [
    {
      name: "Completed Tasks",
      completedTasks: completedTasks?.length,
      // completedTasks: 2
    },
    {
      name: "Assigned Tasks",
      assignedTasks: empTaskData?.length,
      // assignedTasks: 4,
    },
    {
      name: "Reported Tasks",
      reportedTasks: reportedTasks?.length,
      // reportedTasks: 1,
    },
  ];

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
          {/* ROW 2 */}
          <Box
            sx={{
              ...FlexBox,
              width: "100%",
              flexDirection: { xs: "column", lg: "row-reverse" },
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ width: { xs: "90%", lg: "60%" } }}>
              <StatisticsChart data={StatisticalData} />
            </Box>
            <Box
              sx={{
                ...FlexBox,
                width: { xs: "90%", lg: "40%" },
                alignItems: "flex-start",
                p: 2.5,
                ml: 3,
                gap: 1,
                borderRadius: "5px",
              }}
            >
              <Typography variant={isXS ? "h5" : "h5"} color="text.primary">
                Last Login :{" "}
                <Box
                  component="span"
                  sx={{
                    fontSize: { xs: "2rem", lg: "2.5rem" },
                    fontWeight: 700,
                    color: "info.main",
                  }}
                >
                  {localStorage.getItem("last-login")}
                </Box>
              </Typography>
              {/* <Typography variant="h5" color="text.primary">Notifications Received : <span style={{fontWeight:700, color:'navy'}}>{5}</span></Typography> */}
              <Typography variant={isXS ? "h5" : "h5"} color="text.primary">
                Your Efficiency :
                <Box
                  component="span"
                  sx={{
                    fontSize: { xs: "2rem", lg: "2.5rem" },
                    fontWeight: 700,
                    color:
                      "teamEfficientcyPercentage" <= "50"
                        ? "error.main"
                        : "success.main",
                  }}
                >
                  {" "}
                  {yourEfficiency}
                </Box>
              </Typography>
              <Typography variant={isXS ? "h5" : "h5"} color="text.primary">
                Active Time (Today) :{" "}
                <Box
                  component="span"
                  sx={{
                    fontSize: { xs: "2rem", lg: "2.5rem" },
                    fontWeight: 700,
                    color: "primary.main",
                  }}
                >
                  {upTime + " mins"}
                </Box>
              </Typography>
            </Box>
          </Box>
          {/* ROW 3 */}
          <Box
            sx={{
              ...FlexBox,
              gap: { xs: 1, lg: 7.5 },
              flexDirection: "row",
              justifyContent: "space-between",
              px: { xs: 2.5, lg: 5 },
              py: 0,
            }}
          >
            {/* <Newest Tasks /> */}
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
                Newest Tasks ({activeTasks?.length})
              </Typography>

              <Box
                sx={{
                  ...FlexBox,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  px: 2.5,
                }}
              >
                <Typography fontWeight={700} color="GrayText" variant="body1">
                  Priority
                </Typography>
                <Typography fontWeight={700} color="GrayText" variant="body1">
                  Task Name
                </Typography>
                <Typography fontWeight={700} color="GrayText" variant="body1">
                  Deadline
                </Typography>
                <Typography fontWeight={700} color="GrayText" variant="body1">
                  Details
                </Typography>
              </Box>

              {activeTasks?.map((data: any) => {
                return (
                  <Box key={data._id} sx={{ width: "100%" }}>
                    <TaskCard data={data} />
                  </Box>
                );
              })}
            </Box>
          </Box>
          {/* ROW 4 */}
          <Box
            sx={{
              ...FlexBox,
              gap: { xs: 1, lg: 7.5 },
              flexDirection: "row",
              justifyContent: "space-between",
              px: { xs: 2.5, lg: 5 },
              py: 2.5,
            }}
          >
            <Tooltip title="Your Efficiency">
              <Box
                // onClick={() => navigate("/admin/addreminders")}
                sx={{
                  ...FlexBox,
                  flexDirection: { xs: "column", lg: "row" },
                  gap: 2.5,
                  cursor: "pointer",
                  backgroundColor: "warning.main",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <EmojiEvents
                  sx={{ width: "40px", height: "40px", color: "white" }}
                />
                <Typography
                  fontWeight={700}
                  variant={isXS ? "h5" : "h4"}
                  color="white"
                >
                  {yourEfficiency}
                </Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Completed Tasks">
              <Box
                onClick={() => navigate("/employee/yourtasks")}
                sx={{
                  ...FlexBox,
                  flexDirection: { xs: "column", lg: "row" },
                  gap: 2.5,
                  cursor: "pointer",
                  backgroundColor: "info.main",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <TaskAlt
                  sx={{ width: "40px", height: "40px", color: "white" }}
                />
                <Typography
                  fontWeight={700}
                  variant={isXS ? "h5" : "h4"}
                  color="white"
                >
                  {completedTasks?.length}
                </Typography>
              </Box>
            </Tooltip>
            <Tooltip title="All Assigned Tasks">
              <Box
                onClick={() => navigate("/employee/yourtasks")}
                sx={{
                  ...FlexBox,
                  flexDirection: { xs: "column", lg: "row" },
                  gap: 2.5,
                  cursor: "pointer",
                  backgroundColor: "success.main",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <Task sx={{ width: "40px", height: "40px", color: "white" }} />
                <Typography
                  fontWeight={700}
                  variant={isXS ? "h5" : "h4"}
                  color="white"
                >
                  {empTaskData?.length}
                </Typography>
              </Box>
            </Tooltip>
            <Tooltip title="All Reported Tasks">
              <Box
                onClick={() => navigate("/employee/yourtasks")}
                sx={{
                  ...FlexBox,
                  flexDirection: { xs: "column", lg: "row" },
                  gap: 2.5,
                  cursor: "pointer",
                  backgroundColor: "error.main",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <ReportProblem
                  sx={{ width: "40px", height: "40px", color: "white" }}
                />
                <Typography
                  fontWeight={700}
                  variant={isXS ? "h5" : "h4"}
                  color="white"
                >
                  {reportedTasks?.length}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </Box>
      </SideFade>
    </EmployeePagesContainer>
  );
}
