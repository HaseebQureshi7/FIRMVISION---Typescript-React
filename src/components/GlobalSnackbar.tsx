import { Snackbar, Alert } from "@mui/material";
import { SnackbarTypes } from "../types/SnackbarTypes";
import { Dispatch, SetStateAction } from "react";

interface SnackbarPropTypes {
  value: {
    openSnack: SnackbarTypes;
    setOpenSnack: Dispatch<SetStateAction<SnackbarTypes>>;
  };
}

const GlobalSnackbar = ({
  value: { openSnack, setOpenSnack },
}: SnackbarPropTypes) => {
  return (
    <Snackbar
      open={openSnack.open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={() =>
        setOpenSnack({
          open: !openSnack.open,
          message: openSnack.message,
          severity: openSnack.severity,
        })
      }
    >
      <Alert severity={openSnack.severity || "info"} variant="filled">
        {openSnack.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
