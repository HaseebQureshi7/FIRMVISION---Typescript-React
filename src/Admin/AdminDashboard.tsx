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
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import LiveClock from "../components/LiveClock";
import { SideFade } from "../components/PageTransition";
import StatisticsChart from "../components/StatisticsChart";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import AdminPagesContainer from "./AdminPagesContainer";

export default function AdminDashboard() {
  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

  const user: any | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  const authToken = localStorage.getItem("admin-token");
  const Authheaders = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const getEmpsQF = () => {
    return axios.post(
      import.meta.env.VITE_BASE_URL + "admin/getemployees",
      {},
      Authheaders
    );
  };

  const getTasksQF = () => {
    return axios.post(
      import.meta.env.VITE_BASE_URL + "admin/getallassignedtasks",
      {},
      Authheaders
    );
  };

  const getRemsQF = () => {
    return axios.post(
      import.meta.env.VITE_BASE_URL + "admin/getreminders",
      {},
      Authheaders
    );
  };

  // ALL EMPLOYEES QUERY FUNCTION
  const { data: empData } = useQuery<any>("all_employees", getEmpsQF, {
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
    select: (data) => {
      return data.data;
    },
  });

  // ALL ASSIGNED TASKS QUERY FUNCTION
  const { data: taskData } = useQuery<any>("all_assigned_tasks", getTasksQF, {
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
    select: (data) => {
      return data.data;
    },
  });

  // ALL REMINDERS QUERY FUNCTION
  const { data: remsData } = useQuery<any>("all_reminders", getRemsQF, {
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
    select: (data) => {
      return data.data;
    },
  });

  // REPORTED TASKS.
  // LOOKS FOR STATUS COMPLETION WITH NO SUBMITTION REPORT. 
  const reportedTasks = taskData?.filter((data: any) => {
    return data.status == "complete" && data.submittionReport == "NA";
  });

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
          <Box sx={{ width: "100%" }}>
            <StatisticsChart data={data} />
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
                sx={{
                  ...FlexBox,
                  flexDirection: { xs: "column", lg: "row" },
                  gap: 2.5,
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
                sx={{
                  ...FlexBox,
                  flexDirection: { xs: "column", lg: "row" },
                  gap: 2.5,
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
                sx={{
                  ...FlexBox,
                  flexDirection: { xs: "column", lg: "row" },
                  gap: 2.5,
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
                sx={{
                  ...FlexBox,
                  flexDirection: { xs: "column", lg: "row" },
                  gap: 2.5,
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
        </Box>
      </SideFade>
    </AdminPagesContainer>
  );
}
