import {
  AlternateEmail,
  Badge,
  Cancel,
  CheckCircle,
  FilterAlt,
  PersonAdd,
  Search,
  Send,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { SideFade } from "../components/PageTransition";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import AdminPagesContainer from "./AdminPagesContainer";
import invite from "../assets/images/invite.png";
import { useNavigate } from "react-router-dom";

export default function AdminSearchEmployee() {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>();

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
              variant="h3"
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
              flexDirection: { xs: "column-reverse", lg: "row" },
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
                sx={{ width: { xs: "75%", lg: "50%" } }}
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
              sx={{ mr:'25%'}}
              type="submit"
              aria-label="search-employees" 
              size="large"
              color="primary"
              >
                <Search />
              </IconButton>
              <IconButton 
              sx={{ mx:'2.5%'}}
              aria-label="filter-employees" 
              size="large"
              color="info"
              >
                <FilterAlt />
              </IconButton>
              <IconButton 
              sx={{ mx:'2.5%'}}
              aria-label="add-employees" 
              size="large"
              color="success"
              >
                <PersonAdd />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </SideFade>
    </AdminPagesContainer>
  );
}
