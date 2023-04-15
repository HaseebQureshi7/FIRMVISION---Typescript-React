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
import AdminPagesContainer from "./AdminPagesContainer";
import EmployeeTable from "../components/EmployeeTable";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
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

  const { data: taskData } = getTasksQD();
  const { data: empData } = getEmpsQD();
  const { data: remsData } = getRemsQD();

  // COMPLETED TASKS
  const completedTasks = taskData?.filter((data: any) => {
    return data.status == "complete";
  });

  // REPORTED TASKS.
  // LOOKS FOR STATUS COMPLETION WITH NO SUBMITTION REPORT.
  const reportedTasks = taskData?.filter((data: any) => {
    return data.status == "reported";
  });

  // TEAM EFFICIENCY PERCENTAGE
  const teamEfficiencyData = taskData?.filter((data: any) => {
    return data.status == "incomplete";
  });
  const teamEfficientcyPercentage =
    (teamEfficiencyData?.length / taskData?.length) * 100;

  const StatisticalData = [
    {
      name: "Completed Tasks",
      completedTasks: completedTasks?.length,
    },
    {
      name: "Assigned Tasks",
      assignedTasks: taskData?.length,
    },
    {
      name: "Reported Tasks",
      reportedTasks: reportedTasks?.length,
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
                Team Efficiency :
                <Box
                  component="span"
                  sx={{
                    fontSize: { xs: "2rem", lg: "2.5rem" },
                    fontWeight: 700,
                    color:
                      teamEfficientcyPercentage <= 50
                        ? "error.main"
                        : "success.main",
                  }}
                >
                  {" "}
                  {teamEfficientcyPercentage}%
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
              py: 2.5,
            }}
          >
            <Tooltip title="Total Employees">
              <Box
                onClick={() => navigate("/admin/searchemployees")}
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
                <AssignmentInd
                  sx={{ width: "40px", height: "40px", color: "white" }}
                />
                <Typography
                  fontWeight={700}
                  variant={isXS ? "h5" : "h4"}
                  color="white"
                >
                  {empData?.length}
                </Typography>
              </Box>
            </Tooltip>
            <Tooltip title="All Assigned Tasks">
              <Box
                onClick={() => navigate("/admin/assignedtasks")}
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
                  {taskData?.length}
                </Typography>
              </Box>
            </Tooltip>
            <Tooltip title="All Reported Tasks">
              <Box
                onClick={() => navigate("/admin/assignedtasks")}
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
            <Tooltip title="Upcoming Reminders">
              <Box
                onClick={() => navigate("/admin/addreminders")}
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
                <NotificationImportant
                  sx={{ width: "40px", height: "40px", color: "white" }}
                />
                <Typography
                  fontWeight={700}
                  variant={isXS ? "h5" : "h4"}
                  color="white"
                >
                  {remsData?.length}
                </Typography>
              </Box>
            </Tooltip>
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
            <EmployeeTable />
          </Box>
        </Box>
      </SideFade>
    </AdminPagesContainer>
  );
}
