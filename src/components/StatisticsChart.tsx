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
import isXSmall from "./isXSmall";

export default function StatisticsChart({ data }: any) {
  const { isXS } = isXSmall();

  return (
    <>
      <ResponsiveContainer width="100%" aspect={isXS ? 1 : 4}>
        <BarChart
          width={500}
          height={350}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barGap={5}
          barCategoryGap={5}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar
            dataKey="assignedTasks"
            name="Assigned Tasks"
            stackId="tasks"
            fill="#0288D1"
          />
          <Bar
            dataKey="completedTasks"
            name="Completed Tasks"
            stackId="tasks"
            fill="#2E7D32"
          />
          <Bar
            dataKey="reportedTasks"
            name="Reported Tasks"
            stackId="tasks"
            fill="#FF0000"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
