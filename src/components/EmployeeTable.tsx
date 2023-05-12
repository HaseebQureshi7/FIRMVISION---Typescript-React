import {
  Add,
  Done,
  Clear,
  DriveFileRenameOutline,
  MoreHoriz,
  Visibility,
  Details,
  Call,
  PersonRemove,
  Message,
  ExpandMore,
} from "@mui/icons-material";
import {
  TableContainer,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Avatar,
  Modal,
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  Menu,
  Grow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";
import { getEmpsQD } from "./AdminGlobalDataHandler";
import { useContext, useEffect, useRef, useState } from "react";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { GlobalSnackbarContext } from "../context/GlobalSnackbarContext";
import axios from "axios";
import { useMutation } from "react-query";
import { DateFormatter } from "./DateFormatter";
import { ExtractedSnackBarTypes, SnackbarTypes } from "../types/SnackbarTypes";
import { TaskTypes } from "../types/TaskTypes";
import { PriorityTypes } from "../types/priorityTypes";
import isXSmall from "./isXSmall";
import TaskCard from "./TaskCard";
import GlobalModal from "./GlobalModal";
import AuthHeaders from "./AuthHeaders";

export default function EmployeeTable() {
  const { data: empData } = getEmpsQD();

  const { openSnack, setOpenSnack } = useContext<ExtractedSnackBarTypes>(
    GlobalSnackbarContext
  );

  const { isXS } = isXSmall();

  const [allEmployeeTasks, setAllEmployeeTasks] = useState<Array<any>>([]);
  const [singleEmployeeTasks, setSingleAllEmployeeTasks] = useState<Array<any>>(
    []
  );

  const [openAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
  const [openActiveTasks, setOpenActiveTasks] = useState<boolean>(false);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [menuAnchorElement, setMenuAnchorElement] = useState<any>();

  const [currentUserDetails, setCurrentUserDetails] = useState<any>({});
  const [taskPriority, setTaskPriority] = useState<PriorityTypes>("Low");
  const [taskDeadline, setTaskDeadline] = useState<string>("not-set");
  const taskNameRef = useRef<HTMLInputElement>();
  const taskDetailRef = useRef<HTMLInputElement>();

  // ASSIGN TASK TO EMPLOYEE QF
  const AssignTaskQF = (assignTaskData: any) => {
    return axios.post(
      import.meta.env.VITE_BASE_URL + "task/createtask",
      assignTaskData,
      AuthHeaders()
    );
  };

  // ASSIGN TASK TO EMPLOYEE MF
  const { mutate: AssignTaskMutation } = useMutation(AssignTaskQF, {
    onSuccess: (data: any) => {
      setOpenSnack({
        open: true,
        message: "Task Assignment was successful!",
        severity: "success",
      });
    },
    onError: (err: any) => {
      setOpenSnack({
        open: true,
        message: err?.response?.data,
        severity: "error",
      });
    },
  });

  function AssignTaskToEmployee(e: Event) {
    e.preventDefault();
    if (taskDeadline == "not-set") {
      setOpenSnack({
        open: true,
        message: "Set a Deadline!",
        severity: "warning",
      });
    } else {
      const assignTaskData: TaskTypes = {
        assignedTo: currentUserDetails.userId,
        assignedBy: currentUserDetails.adminId,
        name: taskNameRef?.current?.value || "null",
        details: taskDetailRef?.current?.value || "null",
        deadline: taskDeadline,
        priority: taskPriority,
      };
      AssignTaskMutation(assignTaskData);
    }
  }

  function GetActiveEmployeeTasks(eid: number) {
    const thisEmployeesTasks: any = allEmployeeTasks.filter(
      (data: any) => data.assignedTo == eid && data.status == "incomplete"
    );
    // console.log(thisEmployeesTasks)
    return thisEmployeesTasks;
  }

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BASE_URL + "task/viewassignedadmintasks/",
        AuthHeaders()
      )
      .then((res) => {
        setAllEmployeeTasks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* ADD TASK MODAL */}
      <GlobalModal
        openModal={openAddTaskModal}
        setOpenModal={setOpenAddTaskModal}
        headerText={`Assign a new task to ${currentUserDetails?.userName}`}
      >
        <Box
          component="form"
          onSubmit={(e: any) => AssignTaskToEmployee(e)}
          sx={{
            ...FlexBox,
            flexDirection: "column",
            gap: 1,
          }}
        >
          {/* INPUT */}
          <Box
            sx={{
              ...FlexBox,
              alignItems: "flex-start",
              justifyContent: "space-evenly",
              p: 1,
              gap: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              color="text.secondary"
            >
              Name
            </Typography>
            <TextField
              required
              inputRef={taskNameRef}
              sx={{ width: { xs: "100%", lg: "50%" } }}
              placeholder="Enter the Task Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    sx={{ width: "auto", height: "auto" }}
                    position="start"
                  >
                    <DriveFileRenameOutline sx={{ p: 0.15, mr: 1 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* ROW INPUTS  */}
          <Box sx={{ ...FlexBox, flexDirection: "row" }}>
            {/* SELECT */}
            <Box
              sx={{
                ...FlexBox,
                alignItems: "flex-start",
                justifyContent: "space-evenly",
                p: 1,
                gap: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="text.secondary"
              >
                Priority
              </Typography>
              <Select
                sx={{
                  width: "100%",
                  color:
                    taskPriority == "Low"
                      ? "success.main"
                      : taskPriority == "High"
                      ? "error.main"
                      : "info.main",
                  fontWeight: 700,
                }}
                value={taskPriority}
                onChange={(e: any) => setTaskPriority(e?.target?.value)}
              >
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
              </Select>
            </Box>
            {/* MUI-X DATEFIELD */}
            <Box
              sx={{
                ...FlexBox,
                alignItems: "flex-start",
                justifyContent: "space-evenly",
                p: 1,
                gap: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="text.secondary"
              >
                Deadline
              </Typography>
              <MobileDatePicker
                sx={{ width: { xs: "100%", lg: "100%" } }}
                onChange={(newValue: any) =>
                  setTaskDeadline(newValue.$d.toISOString())
                }
              />
            </Box>
          </Box>
          {/* INPUT */}
          <Box
            sx={{
              ...FlexBox,
              alignItems: "flex-start",
              justifyContent: "space-evenly",
              p: 1,
              gap: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              color="text.secondary"
            >
              Details
            </Typography>
            <TextField
              required
              inputRef={taskDetailRef}
              sx={{ width: "100%" }}
              placeholder="Enter the Task Details"
              multiline
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    sx={{ width: "auto", height: "auto" }}
                    position="start"
                  >
                    <Details sx={{ p: 0.15, mr: 1 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* BUTTON */}
          <Box
            sx={{
              ...FlexBox,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              p: 1,
              gap: 1,
            }}
          >
            {/* CANCEL BTN */}
            <Button
              onClick={() => {
                setOpenAddTaskModal(false);
              }}
              endIcon={<Clear fontSize="large" />}
              sx={{ p: "8px 25px", fontWeight: 700 }}
              variant="contained"
              size={isXS ? "small" : "large"}
              color="error"
            >
              Cancel Action
            </Button>
            {/* ADD BTN */}
            <Button
              type="submit"
              endIcon={<Add fontSize="large" />}
              sx={{ p: "8px 25px", fontWeight: 700 }}
              variant="contained"
              size={isXS ? "small" : "large"}
              color="success"
            >
              Assign Task
            </Button>
          </Box>
        </Box>
      </GlobalModal>

      {/* VIEW EMPLOYEE TASKS MODAL */}
      <GlobalModal
        openModal={openActiveTasks}
        setOpenModal={setOpenActiveTasks}
        headerText={`Active tasks assigned to ${currentUserDetails?.userName}`}
      >
        <Box
          sx={{
            ...FlexBox,
            flexDirection: "column",
            gap: 1,
          }}
        >
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
          {singleEmployeeTasks?.map((data: any) => {
            return (
              <Box sx={{ width: "100%" }}>
                <TaskCard data={data} />
              </Box>
            );
          })}
        </Box>
      </GlobalModal>

      {/* OPEN EMPLOYEE OPTIONS MENU */}
      <Menu
        anchorEl={menuAnchorElement}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openOptions}
        onClose={() => setOpenOptions(!openOptions)}
        TransitionComponent={Grow}
      >
        <MenuItem
          onClick={() =>
            setOpenSnack({
              open: true,
              message: "Feature not yet implemented!",
              severity: "warning",
            })
          }
        >
          <Box
            sx={{
              ...FlexBox,
              p: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Message sx={{ color: "info.main" }} />
            <Typography
              sx={{ fontWeight: 500, color: "info.main" }}
              variant="body1"
              color="text.primary"
            >
              Message
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem>
          <Box
            component={"a"}
            href={`tel:${currentUserDetails?.userPhone}`}
            sx={{
              ...FlexBox,
              p: 1,
              flexDirection: "row",
              textDecoration: "none",
              color: "text.primary",
              justifyContent: "flex-start",
            }}
          >
            <Call sx={{ color: "success.main" }} />
            <Typography
              sx={{ fontWeight: 500, color: "success.main" }}
              variant="body1"
              color="text.primary"
            >
              Phone
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => setOpenOptions(!openOptions)}>
          <Box
            sx={{
              ...FlexBox,
              p: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <PersonRemove sx={{ color: "error.main" }} />
            <Typography
              sx={{ fontWeight: 500, color: "error.main" }}
              variant="body1"
              color="text.primary"
            >
              Remove
            </Typography>
          </Box>
        </MenuItem>
      </Menu>

      {/* TABLE */}
      <TableContainer sx={{ p: 3 }} component={Paper}>
        <Typography sx={{ fontWeight: 700 }} variant="h5" color="text.primary">
          Employees ({empData?.length})
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Picture</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Position</TableCell>
              <TableCell align="center">No. of Tasks Assigned</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empData?.map((data: any) => {
              return (
                <TableRow
                  key={data._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <Avatar src={data.picture} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell align="left">{data.position}</TableCell>
                  <TableCell align="center">
                    {GetActiveEmployeeTasks(data._id).length}
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        ...FlexBox,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        "& > svg": {
                          margin: "15px",
                        },
                      }}
                    >
                      <MoreHoriz
                        onClick={(e: any) => {
                          setOpenOptions(!openOptions);
                          setCurrentUserDetails({
                            userName: data.name,
                            userId: data._id,
                            userPhone: data.phone,
                            adminId: data.employeeOf,
                          });
                          setMenuAnchorElement(e.currentTarget);
                        }}
                        sx={{ color: "text.secondary", cursor: "pointer" }}
                      />
                      <Visibility
                        onClick={() => {
                          setOpenActiveTasks(!openActiveTasks);
                          setCurrentUserDetails({
                            userName: data.name,
                            userId: data._id,
                            adminId: data.employeeOf,
                          });
                          setSingleAllEmployeeTasks(
                            GetActiveEmployeeTasks(data?._id)
                          );
                        }}
                        sx={{ color: "primary.light", cursor: "pointer" }}
                      />
                      <Add
                        onClick={() => {
                          setOpenAddTaskModal(!openAddTaskModal);
                          setCurrentUserDetails({
                            userName: data.name,
                            userId: data._id,
                            adminId: data.employeeOf,
                          });
                        }}
                        sx={{ color: "success.light", cursor: "pointer" }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
            {/* <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">
              <Avatar />
            </TableCell>
            <TableCell component="th" scope="row">
              Alex Dunne
            </TableCell>
            <TableCell align="left">{"Full Stack Developer"}</TableCell>
            <TableCell align="center">{7}</TableCell>
            <TableCell align="right">
              <Box
                sx={{
                  ...FlexBox,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  "& > svg": {
                    margin: "15px",
                  },
                }}
              >
                <MoreHoriz sx={{ color: "text.secondary" }} />
                <Visibility sx={{ color: "primary.light" }} />
                <Add sx={{ color: "success.light" }} />
              </Box>
            </TableCell>
          </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
