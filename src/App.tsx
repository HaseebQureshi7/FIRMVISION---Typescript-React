import { Box, PaletteMode, ThemeProvider } from "@mui/material";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AdminAddEmployee from "./Admin/AdminAddEmployee";
import AdminAddReminder from "./Admin/AdminAddReminder";
import AdminAssignedTasks from "./Admin/AdminAssignedTasks";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLanding from "./Admin/AdminLanding";
import AdminLogin from "./Admin/AdminLogin";
import AdminSearchEmployee from "./Admin/AdminSearchEmployee";
import AdminSettings from "./Admin/AdminSettings";
import AdminSignup from "./Admin/AdminSignup";
import EmployeeAdminActions from "./Employee/EmployeeAdminActions";
import EmployeeAssignedTasks from "./Employee/EmployeeAssignedTasks";
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import EmployeeLogin from "./Employee/EmployeeLogin";
import EmployeeSettings from "./Employee/EmployeeSettings";
import EmployeeSignup from "./Employee/EmployeeSignup";
import EmployeeTeam from "./Employee/EmployeeTeam";
import GlobalSnackbar from "./components/GlobalSnackbar";
import MuiTheme from "./components/StyleExtensions.tsx/MuiTheme";
import { DarkModeContext } from "./context/DarkModeContext";
import { GlobalSnackbarContext } from "./context/GlobalSnackbarContext";
import { SnackbarTypes } from "./types/SnackbarTypes";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [themeMode, setThemeMode] = useState<PaletteMode>("dark");

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
        .then((res) => {
          location.pathname.includes("/admin/dashboard")
            ? null
            : navigate("/admin/dashboard");
          localStorage.setItem("user", JSON.stringify(res?.data?.user));
        })
        .catch((err) => console.log(err));
    } else if (localStorage.getItem("employee-token")) {
      const token = localStorage.getItem("employee-token")?.replace(/"/g, "");
      axios
        .post(import.meta.env.VITE_BASE_URL + "employee/login", { token })
        .then(() => navigate("/employee/dashboard"))
        .catch((err) => console.log(err));
    } else {
      // navigate("/");
    }

    // LAST LOGIN TIME
    const date = new Date();
    // console.log(date.toUTCString())
    // localStorage.setItem("last-login", date.toLocaleString());   //Full Date
    localStorage.setItem(
      "last-login",
      date.toLocaleTimeString([], {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: undefined,
      })
    ); //Only Time
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
                <Route path="*" element={<AdminLanding />} />
                <Route path="admin" element={<AdminLanding />} />
                <Route path="admin/login" element={<AdminLogin />} />
                <Route path="admin/signup" element={<AdminSignup />} />

                {localStorage.getItem("admin-token") ? (
                  <>
                    <Route
                      path="admin/dashboard"
                      element={<AdminDashboard />}
                    />
                    <Route
                      path="admin/assignedtasks"
                      element={<AdminAssignedTasks />}
                    />
                    <Route
                      path="admin/addemployee"
                      element={<AdminAddEmployee />}
                    />
                    <Route
                      path="admin/searchemployees"
                      element={<AdminSearchEmployee />}
                    />
                    <Route
                      path="admin/addreminders"
                      element={<AdminAddReminder />}
                    />
                    <Route path="admin/settings" element={<AdminSettings />} />
                  </>
                ) : null}

                {/* Employee Routes */}
                <Route path="/employee" element={<EmployeeLogin />} />
                <Route
                  path="/employee/signup/:uid"
                  element={<EmployeeSignup />}
                />
                {localStorage.getItem("employee-token") ? (
                  <>
                    <Route
                      path="/employee/dashboard"
                      element={<EmployeeDashboard />}
                    />
                    <Route
                      path="/employee/yourtasks"
                      element={<EmployeeAssignedTasks />}
                    />
                    <Route
                      path="/employee/yourteam"
                      element={<EmployeeTeam />}
                    />
                    <Route
                      path="/employee/settings"
                      element={<EmployeeSettings />}
                    />
                    <Route
                      path="/employee/adminactions"
                      element={<EmployeeAdminActions />}
                    />
                  </>
                ) : null}
              </Routes>
            </AnimatePresence>
          </ThemeProvider>
        </GlobalSnackbarContext.Provider>
      </DarkModeContext.Provider>
      <ReactQueryDevtools position="bottom-right" />
    </Box>
  );
}

export default App;
