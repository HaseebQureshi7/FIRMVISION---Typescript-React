export interface SnackbarTypes {
    open: boolean;
    message: string;
    severity: "warning" | "error" | "success" | "info";
  }
  
export interface ExtractedSnackBarTypes {
    openSnack: SnackbarTypes
    setOpenSnack: (value: SnackbarTypes) => void;
  } 