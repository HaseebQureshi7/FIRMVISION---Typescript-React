import { useState } from "react";
import { Box, PaletteMode, ThemeProvider } from "@mui/material";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import AdminLanding from "./Admin/AdminLanding";
import { DarkModeContext } from "./context/DarkModeContext";
import MuiTheme from "./components/StyleExtensions.tsx/MuiTheme";
import { AnimatePresence } from "framer-motion";
import { GlobalSnackbarContext } from "./context/GlobalSnackbarContext";
import { SnackbarTypes } from "./types/SnackbarTypes";
import GlobalSnackbar from "./components/GlobalSnackbar";
import AdminLogin from "./Admin/AdminLogin";
import AdminSignup from './Admin/AdminSignup';

function App() {
  const location = useLocation();

  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  const [openSnack, setOpenSnack] = useState<SnackbarTypes>({
    open: false,
    message: "no message",
    severity: "success",
  });

  return (
    <Box sx={{ color: "text.primary", background: "background.default" }}>
      <GlobalSnackbar value={{ openSnack, setOpenSnack }} />
      <DarkModeContext.Provider value={{ themeMode, setThemeMode }}>
        <GlobalSnackbarContext.Provider value={{ openSnack, setOpenSnack }}>
          <ThemeProvider theme={MuiTheme(themeMode)}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* Admin Routes */}
                <Route path="/" element={<Navigate to="admin" replace />} />
                <Route path="admin" element={<AdminLanding />} />
                <Route path="admin/login" element={<AdminLogin />} />
                <Route path="admin/signup" element={<AdminSignup />} />
              </Routes>
            </AnimatePresence>
          </ThemeProvider>
        </GlobalSnackbarContext.Provider>
      </DarkModeContext.Provider>
    </Box>
  );
}

export default App;
