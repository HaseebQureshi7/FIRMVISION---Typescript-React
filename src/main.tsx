import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const QC = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={QC}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
