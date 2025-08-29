import { Navigate, Outlet } from "react-router";

// El usuario no debe tener un token
export function PublicRoute() {
	const token = localStorage.getItem("token");
	if (token) return <Navigate to="/home" replace />;
	return <Outlet />; // Muestra el contenido de la ruta
}

// El usuario debe tener un token
export function PrivateRoute() {
	const token = localStorage.getItem("token");
	if (!token) return <Navigate to="/login" replace />;
	return <Outlet />; // Muestra el contenido de la ruta
}
