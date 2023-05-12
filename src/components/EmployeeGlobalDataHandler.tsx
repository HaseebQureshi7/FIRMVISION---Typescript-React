import axios from "axios";
import { useQuery } from "react-query";
import AuthHeaders from "./AuthHeaders";

// ALL EMP TASKS QUERY FUNCTION
const getEmpTasksQF = () => {
  return axios.get(
    import.meta.env.VITE_BASE_URL + "task/viewemployeetasks",
    AuthHeaders()
  );
};

// ALL EMP TASKS QUERY METHOD
export const getEmpTasksQD = () => {
  return useQuery<any>("all_employee_tasks", getEmpTasksQF, {
    select: (data) => {
      return data.data;
    },
    // onSuccess: (data)=> console.log(data)
  });
};

// ALL EMP TEAM QUERY FUNCTION
const getEmpTeamQF = () => {
  return axios.get(
    import.meta.env.VITE_BASE_URL + "employee/getteam",
    AuthHeaders()
  );
};

// ALL EMP TASKS QUERY METHOD
export const getEmpTeamQD = () => {
  return useQuery<any>("all_employee_team", getEmpTeamQF, {
    select: (data) => {
      return data.data;
    },
    // onSuccess: (data) => console.log(data),
  });
};
