import {
  Add,
  AddCircle,
  AlternateEmail,
  Badge,
  Cancel,
  CheckCircle,
  FilterAlt,
  Message,
  PersonAdd,
  PersonRemove,
  Phone,
  Search,
  Send,
  Visibility,
  ExpandMore,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { SideFade } from "../components/PageTransition";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import EmployeePagesContainer from "./EmployeePagesContainer";
import invite from "../assets/images/invite.png";
import { useNavigate } from "react-router-dom";
import { getTasksQD } from "../components/AdminGlobalDataHandler";
import { DateFormatter } from "../components/DateFormatter";
import isXSmall from "../components/isXSmall";
import { getEmpTasksQD } from "../components/EmployeeGlobalDataHandler";
import TaskCard from "../components/TaskCard";

export default function EmployeeAssignedTasks() {
  const navigate = useNavigate();

  const { isXS } = isXSmall();

  const nameRef = useRef<HTMLInputElement>();

  const { data: empTaskData } = getEmpTasksQD();

  const [searchedTaskText, setSearchedTaskText] = useState<any>();

  // SEARCHED TASKS
  const searchedTasks = empTaskData && [
    empTaskData.find((data: any) =>
      data.name
        .toLowerCase()
        .includes(
          searchedTaskText == undefined
            ? searchedTaskText
            : searchedTaskText.toLowerCase()
        )
    ),
  ];

  // ACTIVE TASKS
  const activeTasks = empTaskData?.filter((data: any) => {
    return data.status == "incomplete";
  });

  // COMPLETED TASKS
  const completedTasks = empTaskData?.filter((data: any) => {
    return data.status == "complete";
  });

  function HandleSubmit(e: Event) {
    e.preventDefault();
  }

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
              Your Tasks
            </Typography>
            <Divider sx={{ width: "100%" }} />
          </Box>
          <Box
            sx={{
              ...FlexBox,
              alignItems: { xs: "center", lg: "flex-start" },
              flexDirection: "column",
            }}
          >
            {/* ROW 1 */}
            <Box
              component="form"
              onSubmit={(e: any) => HandleSubmit(e)}
              sx={{
                ...FlexBox,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: { xs: "center", lg: "flex-start" },
              }}
            >
              <TextField
                required
                onChange={(e) => setSearchedTaskText(e.target.value)}
                variant="standard"
                sx={{ width: { xs: "100%", lg: "50%" } }}
                placeholder="Name of the Task"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "auto", height: "auto" }}
                      position="start"
                    >
                      <Search
                        sx={{ mb: 1, mr: 1 }}
                        fontSize={isXS ? "small" : "medium"}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {/* <IconButton
                sx={{ mr: { xs: "0%", lg: "25%" } }}
                type="submit"
                aria-label="search-tasks"
                size={isXS ? "small" : "large"}
                color="primary"
              >
                <Search />
              </IconButton>
              <IconButton
                sx={{ mx: { xs: "0%", lg: "2.5%" } }}
                aria-label="filter-employees"
                size={isXS ? "small" : "large"}
                color="info"
              >
                <FilterAlt />
              </IconButton>
              <IconButton
                // onClick={() => navigate("/admin/addemployee")}
                sx={{ mx: { xs: "0%", lg: "2.5%" } }}
                aria-label="add-employees"
                size={isXS ? "small" : "large"}
                color="success"
              >
                <Add />
              </IconButton> */}
            </Box>
            {/* SEARCH RESULTS */}
            {searchedTaskText?.length >= 1 && searchedTasks[0] != undefined && (
              <Box
                sx={{
                  ...FlexBox,
                  flexDirection: "column",
                  alignItems: { xs: "center", lg: "flex-start" },
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Top Search Result:{" "}
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <TaskCard data={searchedTasks[0]} />
                </Box>
              </Box>
            )}

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
                Active Tasks ({activeTasks?.length})
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

            {/* ROW 3 */}
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
                Completed Tasks ({completedTasks?.length})
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

              {completedTasks?.map((data: any) => {
                return (
                  <Box key={data._id} sx={{ width: "100%" }}>
                    <TaskCard data={data} />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </SideFade>
    </EmployeePagesContainer>
  );
}
