// src/components/Admin/AdminHome.jsx
import { useEffect, useState } from "react";
import { Container, Group, Text, Loader } from "@mantine/core";

import { userService } from "../../services/userService";
import { plansUserService } from "../../services/plansUserService"; // ✅ cambio aquí
import { logsService } from "../../services/logsService";

import { DashboardStats } from "../../components/Admin/DashboardStats";
import { AlertsPanel } from "../../components/Admin/AlertsPanel";
import { ActivityPanel } from "../../components/Admin/ActivityPanel";
import { SystemStatus } from "../../components/Admin/SystemStatus";

import { AdminNavbar } from "../../components/Admin/AdminNavbar";
import "./AdminHome.css";

export function AdminHome() {
  const fecha = new Date().toLocaleDateString("es-AR");
  const [stats, setStats] = useState({
    usuarios: 0,
    planesComprados: 0,
    planesPendientes: 0,
    planesPorVencer: 0,
  });
  const [alertas, setAlertas] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usuarios, planesUser, logsResponse] = await Promise.all([
          userService.getAllUsers(),
          plansUserService.getPlansUsers(), 
          logsService.getLogs(),
        ]);

        // Planes comprados
        const planesComprados = planesUser.data.length;

        // Planes pendientes
        const planesPendientes = planesUser.data.filter(p => p.status === "pendiente").length;

        // Planes por vencer en los próximos 7 días
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const planesPorVencer = planesUser.data.filter(p => {
          const expirationDate = new Date(p.expiration_date);
          return expirationDate >= today && expirationDate <= nextWeek;
        }).length;

        setStats({
          usuarios: usuarios.data.length,
          planesComprados,
          planesPendientes,
          planesPorVencer,
        });

        // Logs para alertas y notificaciones
        const logs = logsResponse.data;
        setAlertas(logs.filter(l => l.is_alert === true));
        setNotificaciones(logs.filter(l => l.is_alert === false));

      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="adminhome-loader">
          <Loader color="#FF6600" size="xl" />
        </div>
      </>
    );
  }

  return (
  <>
    <AdminNavbar />

    {/* Contenedor principal con fondo negro */}
    <div className="adminhome-background">
      <Group className="adminhome-header" justify="space-between" p="md">
        <Text size="lg">👋 Bienvenido, Admin</Text>
        <Text>Fecha: {fecha}</Text>
      </Group>

      <Container className="adminhome-container">
        <DashboardStats stats={stats} />
        <AlertsPanel alertas={alertas} />
        <ActivityPanel notificaciones={notificaciones} />
        <SystemStatus />
      </Container>
    </div>
  </>
);

}
