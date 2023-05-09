import React, { useContext, useRef, useState } from "react";
import EmployeePagesContainer from "./EmployeePagesContainer";
import { SideFade } from "../components/PageTransition";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FlexBox } from "../components/StyleExtensions.tsx/FlexBox";
import { Cancel, Done, Edit, Password, Photo } from "@mui/icons-material";
import axios from "axios";
import { useMutation } from "react-query";
import { GlobalSnackbarContext } from "../context/GlobalSnackbarContext";

export default function EmployeeSettings() {
  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

  const user: any | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  const { openSnack, setOpenSnack } = useContext(GlobalSnackbarContext);

  const [editState, setEditState] = useState(false);

  const nameRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const companyNameRef = useRef<HTMLInputElement>();
  const [currImg, setCurrImg] = useState<any>(user?.picture);

  const [directMessage, setDirectMessage] = useState<boolean>(
    user?.directMessage
  );

  const authToken = localStorage.getItem("admin-token");
  const Authheaders = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const editSettingsQF = (editSettingsQD: any) => {
    return axios.put(
      import.meta.env.VITE_BASE_URL + "admin/editprofile",
      editSettingsQD,
      Authheaders
    );
  };

  const { mutate: mutateEditQuery } = useMutation(editSettingsQF, {
    onSuccess: (data) => {
      setOpenSnack({
        open: true,
        message: "Changes were successfull!",
        severity: "success",
      });
      setEditState(false);
      localStorage.setItem("user", JSON.stringify(data.data));
    },
    onError: (err: any) =>
      setOpenSnack({
        open: true,
        message: err?.response?.data,
        severity: "error",
      }),
  });

  function HandleEditSumbit() {
    const editQueryData: any = {
      name: nameRef?.current?.value,
      phone: phoneRef?.current?.value,
      companyName: companyNameRef?.current?.value,
      picture: currImg ? currImg : user?.picture,
    };

    mutateEditQuery(editQueryData);
  }

  function UpdatePermissions(directMessage: any) {
    axios
      .put(
        import.meta.env.VITE_BASE_URL + "admin/editprofile",
        { directMessage },
        Authheaders
      )
      .then((res) =>
        setOpenSnack({
          open: true,
          message: "Permission change was successful!",
          severity: "success",
        })
      )
      .catch((err) =>
        setOpenSnack({
          open: true,
          message: "Failed to change permission!",
          severity: "error",
        })
      );
  }

  function FakePathToBase64(e: any) {
    let reader = new FileReader();
    reader.onload = (e: any) => {
      setCurrImg(e.target.result);
    };
    reader.readAsDataURL(e?.target.files[0]);
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
              Settings
            </Typography>
            <Divider sx={{ width: "100%" }} />
          </Box>

          {/* ROW 1 */}
          <Box
            sx={{
              ...FlexBox,
              flexDirection: { xs: "column", lg: "row" },
              height: { xs: "auto", lg: "40vh" },
              width: "100%",
            }}
          >
            {/* SECTION 1 */}
            <Box
              sx={{
                flex: 2,
                display: "flex",
                justifyContent: { xs: "center", lg: "flex-end" },
                width: "100%",
                mr: "2.5%",
              }}
            >
              <Avatar
                sx={{ width: "55%", height: "50%", objectFit: "cover" }}
                src={currImg}
                variant="square"
              />
            </Box>

            {/* SECTION 2 */}
            {editState == false ? (
              // DETAIL VIEW
              <Box
                sx={{
                  flex: 3,
                  ...FlexBox,
                  height: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography
                    variant={isXS ? "h6" : "h5"}
                    fontWeight={700}
                    color="text.primary"
                  >
                    {user?.name}
                  </Typography>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography
                    variant={isXS ? "h6" : "h5"}
                    fontWeight={700}
                    color="text.primary"
                  >
                    {user?.phone}
                  </Typography>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography
                    variant={isXS ? "h6" : "h5"}
                    fontWeight={700}
                    color="text.secondary"
                  >
                    {user?.email}
                  </Typography>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body2" color="text.secondary">
                    Organization Name
                  </Typography>
                  <Typography
                    variant={isXS ? "h6" : "h5"}
                    fontWeight={700}
                    color="text.primary"
                  >
                    {user?.companyName}
                  </Typography>
                </Box>
              </Box>
            ) : (
              // EDIT VIEW
              <Box
                sx={{
                  flex: 3,
                  ...FlexBox,
                  height: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <TextField
                    inputRef={nameRef}
                    sx={{ width: "65%" }}
                    id="standard-basic"
                    variant="standard"
                    defaultValue={user?.name}
                    InputProps={{
                      sx: { fontSize: "1.25rem", fontWeight: 700 },
                    }}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <TextField
                    inputRef={phoneRef}
                    sx={{ width: "65%" }}
                    id="standard-basic"
                    variant="standard"
                    defaultValue={user?.phone}
                    InputProps={{
                      sx: { fontSize: "1.25rem", fontWeight: 700 },
                    }}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography
                    variant={isXS ? "h6" : "h5"}
                    fontWeight={700}
                    color="text.secondary"
                  >
                    {user?.email}
                  </Typography>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body2" color="text.secondary">
                    Organization Name
                  </Typography>
                  <TextField
                    inputRef={companyNameRef}
                    sx={{ width: "65%" }}
                    id="standard-basic"
                    variant="standard"
                    defaultValue={user?.companyName}
                    InputProps={{
                      sx: { fontSize: "1.25rem", fontWeight: 700 },
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>

          {/* ROW 2 */}
          <Box
            sx={{
              ...FlexBox,
              flexDirection: { xs: "column", lg: "row" },
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: { xs: "100%", lg: "65%" },
            }}
          >
            <Button
              onChange={(e: any) => FakePathToBase64(e)}
              sx={{ px: 7.5 }}
              disabled={!editState}
              size={isXS ? "small" : "large"}
              startIcon={<Photo />}
              variant="contained"
              color="warning"
              component="label"
            >
              Change Picture
              <input type="file" hidden />
            </Button>

            <Button
              sx={{ px: 7.5 }}
              disabled={!editState}
              size={isXS ? "small" : "large"}
              startIcon={<Password />}
              variant="contained"
              color="info"
            >
              Change Password
            </Button>
            <Button
              onClick={() => setEditState(!editState)}
              startIcon={editState ? <Cancel /> : <Edit />}
              sx={{ px: 7.5 }}
              size={isXS ? "small" : "large"}
              variant="contained"
              color={editState ? "error" : "primary"}
            >
              {editState ? "Discard Changes" : "Edit Profile"}
            </Button>
          </Box>

          {/* SAVE CHANGES BOX */}
          <Box
            sx={{
              ...FlexBox,
              display: editState ? "flex" : "none",
              flexDirection: { xs: "column", lg: "row" },
              justifyContent: "flex-end",
              alignItems: "flex-start",
              width: { xs: "100%", lg: "65%" },
            }}
          >
            <Button
              onClick={() => HandleEditSumbit()}
              startIcon={<Done />}
              sx={{ px: 7.5 }}
              size={isXS ? "small" : "large"}
              variant="contained"
              color="success"
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </SideFade>
    </EmployeePagesContainer>
  );
}
