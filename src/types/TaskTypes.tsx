import { PriorityTypes } from "./PriorityTypes";

export interface TaskTypes {
  _id?: string;
  assignedTo?: string;
  assignedBy?: string;
  assignedAt?: string;
  name?: string;
  details?: string;
  deadline?: string;
  priority?: PriorityTypes;
  status?: "incomplete" | "complete";
  completionDate?: "NA";
  submittionReport?: "NA";
  __v?: any;
}
