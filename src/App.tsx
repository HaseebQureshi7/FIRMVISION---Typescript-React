import { useState, useEffect } from "react";
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
import AdminSignup from "./Admin/AdminSignup";
import axios from "axios";
import AdminDashboard from "./Admin/AdminDashboard";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  const [openSnack, setOpenSnack] = useState<SnackbarTypes>({
    open: false,
    message: "no message",
    severity: "success",
  });

  useEffect(() => {
    if (localStorage.getItem("admin-token")) {
      const token = localStorage.getItem("admin-token")?.replace(/"/g, "");
      axios
        .post(import.meta.env.VITE_BASE_URL + "admin/login", { token })
        .then(() =>
          location.pathname.includes("/admin/dashboard")
            ? null
            : navigate("/admin/dashboard")
        )
        .catch((err) => console.log(err));
    }
    if (localStorage.getItem("employee-token")) {
      const token = localStorage.getItem("employee-token")?.replace(/"/g, "");
      axios
        .post(import.meta.env.VITE_BASE_URL + "employee/login", { token })
        .then(() => navigate("/employee/dashbaord"))
        .catch((err) => console.log(err));
    }
    // else {
    //   console.log("no token found!");
    // }
  }, []);

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
                <Route path="admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </AnimatePresence>
          </ThemeProvider>
        </GlobalSnackbarContext.Provider>
      </DarkModeContext.Provider>
    </Box>
  );
}

export default App;
