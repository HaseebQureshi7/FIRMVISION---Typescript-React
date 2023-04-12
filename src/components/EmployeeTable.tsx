import { Add, MoreHoriz, Visibility } from "@mui/icons-material";
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
} from "@mui/material";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";
import { getEmpsQD } from "./AdminGlobalDataHandler";

const rows = {
  picture: "photo-link",
  name: "Alex Dunne",
  position: "full stack developer",
  numberOfTasksAssigned: 4,
};

export default function EmployeeTable() {
  const { data: empData } = getEmpsQD();

  return (
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
  );
}
