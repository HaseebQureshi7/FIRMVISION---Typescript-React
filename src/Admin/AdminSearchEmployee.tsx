import {
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
} from "@mui/material";
import React, { useRef, useState } from "react";
import { SideFade } from "../components/PageTransition";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import AdminPagesContainer from "./AdminPagesContainer";
import invite from "../assets/images/invite.png";
import { useNavigate } from "react-router-dom";
import { getEmpsQD } from "../components/AdminGlobalDataHandler";
import EmployeeTable from "../components/EmployeeTable";
import isXSmall from "../components/isXSmall";

export default function AdminSearchEmployee() {
  const navigate = useNavigate();

  const { isXS } = isXSmall();

  const { data: empData } = getEmpsQD();
  const [searchEmp, setSearchEmp] = useState<any>();

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
              Search Employees
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
                justifyContent:'flex-start',
                alignItems: { xs: "center", lg: "flex-start" },
              }}
            >
              <TextField
                required
                onChange={(e: any) => {
                  setSearchEmp(e.target.value);
                }}
                variant="standard"
                sx={{ width: { xs: "100%", lg: "50%" } }}
                placeholder="Name of the Employee"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "auto", height: "auto" }}
                      position="start"
                    >
                      <Search sx={{ p: 0.15, mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
              />
              {/* <IconButton
                sx={{ mr: { xs: "0%", lg: "25%" } }}
                type="submit"
                aria-label="search-employees"
                size="large"
                color="primary"
              >
                <Search />
              </IconButton> */}
              {/* <IconButton
                sx={{ mx: { xs: "0%", lg: "2.5%" } }}
                aria-label="filter-employees"
                size="large"
                color="info"
              >
                <FilterAlt />
              </IconButton> */}
              {/* <IconButton
                onClick={() => navigate("/admin/addemployee")}
                sx={{ mx: { xs: "0%", lg: "2.5%" } }}
                aria-label="add-employees"
                size="large"
                color="success"
              >
                <PersonAdd />
              </IconButton> */}
            </Box>
            {/* ROW 2 */}
            <EmployeeTable sort={searchEmp} />
          </Box>
        </Box>
      </SideFade>
    </AdminPagesContainer>
  );
}
