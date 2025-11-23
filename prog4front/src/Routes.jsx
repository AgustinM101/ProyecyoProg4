import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { adminService } from "./services/adminService";
import { FullScreenLoader } from "./components/ui/FullScreenLoader"; // <- nuevo

// 🔓 Rutas públicas (solo sin sesión)
export function PublicRoute() {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" replace />;
  return <Outlet />;
}

// 🔒 Rutas privadas (requieren sesión)
export function PrivateRoute() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}

// 🛡️ Rutas solo para administradores
export function AdminRoute() {
  const [isAdmin, setIsAdmin] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const validateAdmin = async () => {
      try {
        const res = await adminService.validate();
        setIsAdmin(res?.admin === 1);
      } catch (error) {
        console.error("Error validando admin:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    validateAdmin();
  }, []);

  if (loading) return <FullScreenLoader title="Validando usuario" message="Comprobando permisos de administrador..." />;

  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}
