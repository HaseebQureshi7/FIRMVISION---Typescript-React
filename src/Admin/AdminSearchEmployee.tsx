import {
  Search,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmpsQD } from "../components/AdminGlobalDataHandler";
import EmployeeTable from "../components/EmployeeTable";
import { SideFade } from "../components/PageTransition";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import isXSmall from "../components/isXSmall";
import AdminPagesContainer from "./AdminPagesContainer";

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
            </Box>
            {/* ROW 2 */}
            <EmployeeTable sort={searchEmp} />
          </Box>
        </Box>
      </SideFade>
    </AdminPagesContainer>
  );
}
