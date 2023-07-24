import { Cancel, Done, ExpandMore, Report } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { GlobalSnackbarContext } from "../context/GlobalSnackbarContext";
import { ExtractedSnackBarTypes } from "../types/SnackbarTypes";
import AuthHeaders from "./AuthHeaders";
import { DateFormatter } from "./DateFormatter";
import GlobalModal from "./GlobalModal";
import { SideFade } from "./PageTransition";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";
import isXSmall from "./isXSmall";

export default function TaskCard({ data }: any) {
  const { isXS } = isXSmall();
  const [openSubmitModal, setOpenSubmitModal] = useState<boolean>();
  const [openReportModal, setOpenReportModal] = useState<boolean>();

  const queryClient = useQueryClient();

  const submittionReportRef = useRef<HTMLInputElement>();
  const reportTaskRef = useRef<HTMLInputElement>();

  const date = new Date();

  const { openSnack, setOpenSnack } = useContext<ExtractedSnackBarTypes>(
    GlobalSnackbarContext
  );

  // SUBMIT/REPORT TASK QUERY FUNCTION
  const submitEmpTaskQF = (taskMutationData: any) => {
    const tid = data?._id;
    return axios.put(
      import.meta.env.VITE_BASE_URL + `task/updatetask/${tid}`,
      taskMutationData,
      AuthHeaders()
    );
  };

  // SUBMIT/REPORT TASK MUTATION FUNCTION
  const { mutate: mutateTask } = useMutation(submitEmpTaskQF, {
    onSuccess: (data) => {
      setOpenSubmitModal(false);
      setOpenReportModal(false);
      setOpenSnack({
        open: true,
        message: "Report Submitted!",
        severity: "success",
      });
      queryClient.invalidateQueries("all_employee_tasks");
    },
  });

  function HandleSubmit(e: Event) {
    e.preventDefault();
    const taskMutationData: any = {
      status: "complete",
      completionDate: date.toISOString(),
      submittionReport: submittionReportRef?.current?.value,
    };
    mutateTask(taskMutationData);
  }

  function HandleReport(e: Event) {
    e.preventDefault();
    const taskMutationData: any = {
      status: "reported",
      completionDate: date.toISOString(),
      submittionReport: submittionReportRef?.current?.value,
    };
    mutateTask(taskMutationData);
  }

  return (
    <SideFade>
      {/* SUBMITTION REPORT MODAL */}
      <GlobalModal
        openModal={openSubmitModal}
        setOpenModal={setOpenSubmitModal}
        headerText={"Submit Completion Report"}
      >
        <Stack
          component={"form"}
          onSubmit={(e: any) => HandleSubmit(e)}
          sx={{ p: 2, width: "100%" }}
        >
          <TextField
            inputRef={submittionReportRef}
            required
            multiline
            rows={4}
            label="Task Report"
            // defaultValue="Default Value"
          />
          <Stack
            sx={{ width: "100%", mt: 2, justifyContent: "flex-end" }}
            direction={"row"}
          >
            <Button
              onClick={() => setOpenSubmitModal(!openSubmitModal)}
              size="large"
              startIcon={<Cancel />}
              sx={{ mx: 1 }}
              variant="contained"
              color={"error"}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="large"
              startIcon={<Done />}
              variant="contained"
              color="success"
            >
              Submit Report
            </Button>
          </Stack>
        </Stack>
      </GlobalModal>
      {/* REPORT TASK MODAL */}
      <GlobalModal
        openModal={openReportModal}
        setOpenModal={setOpenReportModal}
        headerText={"Report this Task"}
      >
        <Stack
          component={"form"}
          onSubmit={(e: any) => HandleReport(e)}
          sx={{ p: 2, width: "100%" }}
        >
          <TextField
            inputRef={reportTaskRef}
            multiline
            required
            rows={4}
            label="Report you issue"
          />
          <Stack
            sx={{ width: "100%", mt: 2, justifyContent: "flex-end" }}
            direction={"row"}
          >
            <Button
              onClick={() => setOpenReportModal(!openReportModal)}
              size="large"
              startIcon={<Cancel />}
              sx={{ mx: 1 }}
              variant="contained"
              color={"error"}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="large"
              endIcon={<Report />}
              variant="contained"
              color="warning"
            >
              Report Task
            </Button>
          </Stack>
        </Stack>
      </GlobalModal>

      {/* TASK CARD */}
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
              variant={isXS ? "body2" : "body1"}
            >
              {data?.priority}
            </Typography>
            <Typography
              fontWeight={700}
              color="text.primary"
              variant={isXS ? "body2" : "body1"}
            >
              {data?.name}
            </Typography>
            <Typography
              fontWeight={700}
              color="text.primary"
              variant={isXS ? "body2" : "body1"}
            >
              {DateFormatter(data?.deadline)}
            </Typography>
            <Typography
              fontWeight={700}
              color="GrayText"
              variant={isXS ? "body2" : "body1"}
            ></Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant={isXS ? "body2" : "body1"}>
            Task Details -{" "}
            <Box
              component={"span"}
              sx={{ color: "primary.main", fontWeight: 700 }}
            >
              {data?.details}
            </Box>
          </Typography>
          {data?.status == "complete" ? (
            <Typography variant={isXS ? "body2" : "body1"}>
              Report -{" "}
              <Box
                component={"span"}
                sx={{ color: "info.main", fontWeight: 700 }}
              >
                {data?.submittionReport}
              </Box>
            </Typography>
          ) : (
            ""
          )}
          {localStorage.getItem("employee-token") &&
          data?.status == "incomplete" ? (
            <Box
              sx={{
                ...FlexBox,
                flexDirection: "row",
                justifyContent: "flex-end",
                mt: 2.5,
              }}
            >
              <Button
                onClick={() => setOpenSubmitModal(!openSubmitModal)}
                size={isXS ? "small" : "large"}
                startIcon={<Done />}
                variant="contained"
                color="primary"
              >
                Submit Report
              </Button>
              <Button
                onClick={() => setOpenReportModal(!openReportModal)}
                size={isXS ? "small" : "large"}
                startIcon={<Report />}
                variant="contained"
                color="error"
              >
                Report Problem
              </Button>
            </Box>
          ) : null}
        </AccordionDetails>
      </Accordion>
    </SideFade>
  );
}
