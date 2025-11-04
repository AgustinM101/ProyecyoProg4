// src/components/Admin/AdminPageLoader.jsx
import { Loader } from "@mantine/core";
import "./AdminPageLoader.css";

export function AdminPageLoader({ color = "#FF6600" }) {
  return (
    <div className="adminpage-loader">
      <Loader color={color} size="xl" />
    </div>
  );
}
