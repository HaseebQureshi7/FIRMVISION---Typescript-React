import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  LineChart,
  Legend,
  Tooltip,
} from "recharts";

export default function StatisticsChart({ data }: any) {
  const themeInstance = useTheme();
  const isXS: boolean = useMediaQuery(themeInstance.breakpoints.only("xs"));

  return (
    <>
      <ResponsiveContainer width="100%" aspect={isXS ? 1 : 4}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            name="Completed Tasks"
            dataKey="completedTasks"
            stroke="navy"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            name="Assigned Tasks"
            dataKey="assignedTasks"
            stroke="green"
          />
          <Line
            type="monotone"
            name="Reported Tasks"
            dataKey="reportedTasks"
            stroke="red"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
