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
import React, { useRef } from "react";
import { SideFade } from "../components/PageTransition";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import AdminPagesContainer from "./AdminPagesContainer";
import invite from "../assets/images/invite.png";
import { useNavigate } from "react-router-dom";
import { getEmpsQD } from "../components/AdminGlobalDataHandler";

export default function AdminSearchEmployee() {
  const navigate = useNavigate();

  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

  const nameRef = useRef<HTMLInputElement>();

  const { data: empData } = getEmpsQD();

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
                alignItems: { xs: "center", lg: "flex-start" },
              }}
            >
              <TextField
                required
                inputRef={nameRef}
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
            <Box
              sx={{
                ...FlexBox,
                flexDirection: "column",
                alignItems: { xs: "center", lg: "flex-start" },
                justifyContent: "flex-start",
              }}
            >
              <Typography
                sx={{ fontWeight: 700 }}
                variant={isXS ? "h5" : "h4"}
                color="primary.main"
              >
                Total Employees ({empData?.length})
              </Typography>
              {/* CARD CONTAINER*/}
              <Box
                sx={{
                  ...FlexBox,
                  width: "100%",
                  flexWrap: "wrap",
                  flexDirection: "row",
                }}
              >
                {/* CARD */}
                {empData?.map((data: any) => {
                  return (
                    <Box
                      key={data._id}
                      sx={{
                        ...FlexBox,
                        border: "2px solid lightgray",
                        borderRadius: "10px",
                        width: { xs: "100%", lg: "45%" },
                        p: 2.5,
                      }}
                    >
                      {/* TOP BOXES */}
                      <Box
                        sx={{
                          ...FlexBox,
                          flexDirection: { xs: "column", lg: "row" },
                        }}
                      >
                        {/* R1 */}
                        <Box
                          component="img"
                          src={data?.picture}
                          sx={{
                            width: { xs: "75%", lg: "40%" },
                            height: "auto",
                          }}
                        />
                        {/* R2 */}
                        <Box sx={{ ...FlexBox }}>
                          <Box
                            sx={{
                              ...FlexBox,
                              width: { xs: "100%", lg: "60%" },
                              alignItems: { xs: "center", lg: "flex-start" },
                              textAlign: { xs: "center", lg: "start" },
                            }}
                          >
                            <Typography
                              sx={{ fontWeight: 700 }}
                              variant="h4"
                              color="text.primary"
                            >
                              {data?.name}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                textOverflow: "ellipsis",
                                width: "100%",
                              }}
                              variant="h6"
                              color="primary.main"
                            >
                              {data?.position}
                            </Typography>
                            <Typography
                              sx={{ fontWeight: 700 }}
                              variant="subtitle2"
                              color="secondary.main"
                            >
                              Since : {data?.createdAt}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      {/* BOTTOM BOXES */}
                      <Box
                        sx={{
                          ...FlexBox,
                          flexDirection: { xs: "column", lg: "row" },
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: 700 }}
                          variant="h6"
                          color="primary.main"
                        >
                          <Box
                            sx={{ color: "text.secondary" }}
                            component="span"
                          >
                            Active Tasks
                          </Box>{" "}
                          : 4
                        </Typography>
                        <Typography
                          sx={{ fontWeight: 700 }}
                          variant="h6"
                          color="primary.main"
                        >
                          <Box
                            sx={{ color: "text.secondary" }}
                            component="span"
                          >
                            Success Rate :
                          </Box>{" "}
                          98%
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          ...FlexBox,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <AddCircle
                          sx={{
                            width: "40px",
                            height: "40px",
                            color: "success.main",
                          }}
                        />
                        <a href={"tel:" + data?.phone}>
                          <Phone
                            sx={{
                              width: "40px",
                              height: "40px",
                              color: "primary.main",
                            }}
                          />
                        </a>
                        <Message
                          sx={{
                            width: "40px",
                            height: "40px",
                            color: "warning.main",
                          }}
                        />
                        <Visibility
                          sx={{
                            width: "40px",
                            height: "40px",
                            color: "primary.main",
                          }}
                        />
                        <PersonRemove
                          sx={{
                            width: "40px",
                            height: "40px",
                            color: "error.main",
                          }}
                        />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </SideFade>
    </AdminPagesContainer>
  );
}
