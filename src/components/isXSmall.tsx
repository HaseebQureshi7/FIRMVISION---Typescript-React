import { useMediaQuery, useTheme } from "@mui/material";

export default function isXSmall() {
  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));
  return { isXS };
}
