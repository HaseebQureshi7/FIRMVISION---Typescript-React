import axios from "axios";
import React, { useContext } from "react";
import { useMutation, useQuery } from "react-query";;

const authToken = localStorage.getItem("admin-token");
const Authheaders = {
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
};

const getEmpsQF = () => {
  return axios.post(
    import.meta.env.VITE_BASE_URL + "admin/getemployees",
    {},
    Authheaders
  );
};

const getTasksQF = () => {
  return axios.post(
    import.meta.env.VITE_BASE_URL + "admin/getallassignedtasks",
    {},
    Authheaders
  );
};

const getRemsQF = () => {
  return axios.post(
    import.meta.env.VITE_BASE_URL + "admin/getreminders",
    {},
    Authheaders
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
