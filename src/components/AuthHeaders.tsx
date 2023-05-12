export default function AuthHeaders() {
  const authToken = localStorage.getItem("admin-token")
    ? localStorage.getItem("admin-token")
    : localStorage.getItem("employee-token") &&
      localStorage.getItem("employee-token");
  return {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
}
