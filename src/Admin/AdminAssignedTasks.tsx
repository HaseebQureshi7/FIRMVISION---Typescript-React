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
import React, { useRef } from "react";
import { SideFade } from "../components/PageTransition";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import AdminPagesContainer from "./AdminPagesContainer";
import invite from "../assets/images/invite.png";
import { useNavigate } from "react-router-dom";
import { getTasksQD } from "../components/AdminGlobalDataHandler";

export default function AdminAssignedTasks() {
  const navigate = useNavigate();

  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

  const nameRef = useRef<HTMLInputElement>();

  const { data: taskData } = getTasksQD();

  // ACTIVE TASKS
  const activeTasks = taskData?.filter((data: any) => {
    return data.status == "incomplete";
  });

  // COMPLETED TASKS
  const completedTasks = taskData?.filter((data: any) => {
    return data.status == "complete";
  });

  function HandleSubmit(e: Event) {
    e.preventDefault();
  }

  return (
    <AdminPagesContainer>
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
              Assigned Tasks
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
                alignItems: { xs: "center", lg: "flex-start" },
              }}
            >
              <TextField
                required
                inputRef={nameRef}
                variant="standard"
                sx={{ width: { xs: "100%", lg: "50%" } }}
                placeholder="Name of the Task"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "auto", height: "auto" }}
                      position="start"
                    >
                      <Badge sx={{ p: 0.15, mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton
                sx={{ mr: { xs: "0%", lg: "25%" } }}
                type="submit"
                aria-label="search-tasks"
                size="large"
                color="primary"
              >
                <Search />
              </IconButton>
              <IconButton
                sx={{ mx: { xs: "0%", lg: "2.5%" } }}
                aria-label="filter-employees"
                size="large"
                color="info"
              >
                <FilterAlt />
              </IconButton>
              <IconButton
                // onClick={() => navigate("/admin/addemployee")}
                sx={{ mx: { xs: "0%", lg: "2.5%" } }}
                aria-label="add-employees"
                size="large"
                color="success"
              >
                <Add />
              </IconButton>
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
                          variant="body1"
                        >
                          {data?.priority}
                        </Typography>
                        <Typography
                          fontWeight={700}
                          color="text.primary"
                          variant="body1"
                        >
                          {data?.name}
                        </Typography>
                        <Typography
                          fontWeight={700}
                          color="text.primary"
                          variant="body1"
                        >
                          {data?.deadline}
                        </Typography>
                        <Typography
                          fontWeight={700}
                          color="GrayText"
                          variant="body1"
                        >
                          Details
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        fontWeight={700}
                        color="text.primary"
                        variant="body1"
                      >
                        {data?.details}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
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
                          variant="body1"
                        >
                          {data?.priority}
                        </Typography>
                        <Typography
                          fontWeight={700}
                          color="text.primary"
                          variant="body1"
                        >
                          {data?.name}
                        </Typography>
                        <Typography
                          fontWeight={700}
                          color="text.primary"
                          variant="body1"
                        >
                          {data?.deadline}
                        </Typography>
                        <Typography
                          fontWeight={700}
                          color="GrayText"
                          variant="body1"
                        >
                          Details
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        fontWeight={700}
                        color="text.primary"
                        variant="body1"
                      >
                        {data?.details}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          </Box>
        </Box>
      </SideFade>
    </AdminPagesContainer>
  );
}
