import { useMediaQuery, useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
  BarChart,
  Legend,
  Tooltip,
} from "recharts";

export default function StatisticsChart({ data }: any) {
  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

  return (
    <>
     <ResponsiveContainer width="100%" aspect={isXS ? 1 : 8}>
  <BarChart
    width={500}
    height={300}
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
    barGap={0}
    barCategoryGap={2}
  >
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="assignedTasks" name="Assigned Tasks" stackId="tasks" fill="#0288D1" />
    <Bar dataKey="completedTasks" name="Completed Tasks" stackId="tasks" fill="#2E7D32" />
    <Bar dataKey="reportedTasks" name="Repo Tasks" stackId="tasks" fill="#FF0000" />
  </BarChart>
</ResponsiveContainer>
    </>
  );
}
