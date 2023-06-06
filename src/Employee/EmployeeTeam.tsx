import {
  Add,
  AddCircle,
  AlternateEmail,
  Badge,
  Call,
  Cancel,
  CheckCircle,
  FilterAlt,
  Message,
  MoreHoriz,
  PersonAdd,
  PersonRemove,
  Phone,
  Search,
  Send,
  Visibility,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { SideFade } from "../components/PageTransition";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import EmployeePagesContainer from "./EmployeePagesContainer";
import invite from "../assets/images/invite.png";
import { useNavigate } from "react-router-dom";
import { getEmpsQD } from "../components/AdminGlobalDataHandler";
import EmployeeTable from "../components/EmployeeTable";
import { getEmpTeamQD } from "../components/EmployeeGlobalDataHandler";

export default function EmployeeTeam() {
  const navigate = useNavigate();

  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

  const { data: empTeam } = getEmpTeamQD();
  const [searchEmp, setSearchEmp] = useState<any>("");

  // FINDS THE ELEMENT THROUGH REG EXP SEARCH AND REUTRNS ONLY THAT ELEMENT
  const sortedEmps = empTeam && [
    ...empTeam.filter((data: any) =>
      data?.name.toLowerCase().includes(searchEmp)
    ),
  ];

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
              Your Team
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
                onChange={(e) => setSearchEmp(e.target.value)}
                variant="standard"
                sx={{ width: { xs: "100%", lg: "50%" } }}
                placeholder="Name of the Employee"
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
                aria-label="search-employees"
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
                onClick={() => navigate("/admin/addemployee")}
                sx={{ mx: { xs: "0%", lg: "2.5%" } }}
                aria-label="add-employees"
                size="large"
                color="success"
              >
                <PersonAdd />
              </IconButton>
            </Box>
            {/* ROW 2 */}
            {/* TABLE */}
            <TableContainer sx={{ p: 3 }} component={Paper}>
              <Typography
                sx={{ fontWeight: 700 }}
                variant="h5"
                color="text.primary"
              >
                Employees ({empTeam?.length})
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
                  {sortedEmps &&
                    sortedEmps?.map((data: any) => {
                      return (
                        <TableRow
                          key={data._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            <Avatar src={data.picture} />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {data.name}
                          </TableCell>
                          <TableCell align="left">{data.position}</TableCell>
                          <TableCell align="center">{"X"}</TableCell>
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
                              <Box
                                component={"a"}
                                href={`tel:${data?.phone}`}
                                sx={{
                                  textDecoration: "none",
                                }}
                              >
                                <Call
                                  sx={{
                                    color: "success.main",
                                    cursor: "pointer",
                                  }}
                                />
                              </Box>
                              <Message
                                sx={{ color: "info.main", cursor: "pointer" }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </SideFade>
    </EmployeePagesContainer>
  );
}
