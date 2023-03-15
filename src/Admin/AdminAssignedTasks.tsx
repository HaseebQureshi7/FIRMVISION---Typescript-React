import React from "react";
import { useQueryClient } from "react-query";
import { getEmpsQD } from "../components/AdminGlobalDataHandler";
import { SideFade } from "../components/PageTransition";
import AdminPagesContainer from "./AdminPagesContainer";

export default function AdminAssignedTasks() {
    const {data} = getEmpsQD()
    console.log(data)
  return (
    <AdminPagesContainer>
      <SideFade>AdminAssignedTasks</SideFade>
    </AdminPagesContainer>
  );
}
