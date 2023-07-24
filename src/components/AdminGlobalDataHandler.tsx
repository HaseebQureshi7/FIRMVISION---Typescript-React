import axios from "axios";
import { useQuery } from "react-query";
import AuthHeaders from "./AuthHeaders";

const getEmpsQF = () => {
  console.log(AuthHeaders());
  return axios.post(
    import.meta.env.VITE_BASE_URL + "admin/getemployees",
    {},
    AuthHeaders()
  );
};

const getTasksQF = () => {
  return axios.post(
    import.meta.env.VITE_BASE_URL + "admin/getallassignedtasks",
    {},
    AuthHeaders()
  );
};

const getRemsQF = () => {
  return axios.post(
    import.meta.env.VITE_BASE_URL + "admin/getreminders",
    {},
    AuthHeaders()
  );
};

// ALL EMPLOYEES QUERY FUNCTION
export const getEmpsQD = () => {
  return useQuery<any>("all_employees", getEmpsQF, {
    select: (data) => {
      return data.data;
    },
  });
};

// ALL TASKS QUERY FUNCTION
export const getTasksQD = () => {
  return useQuery<any>("all_assigned_tasks", getTasksQF, {
    select: (data) => {
      return data.data;
    },
  });
};

// ALL REMINDERS QUERY FUNCTION
export const getRemsQD = () => {
  return useQuery<any>("all_reminders", getRemsQF, {
    select: (data) => {
      return data.data;
    },
  });
};
