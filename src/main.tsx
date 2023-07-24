import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorPage from "./components/ErrorPage";

const QC = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ErrorBoundary fallback={<ErrorPage />}>
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={QC}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </LocalizationProvider>
    </React.StrictMode>
  </ErrorBoundary>
);
