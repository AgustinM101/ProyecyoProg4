import { useEffect, useState } from "react";
import { Container, Group, Text, Loader } from "@mantine/core";

import { userService } from "../../services/userService";
import { plansUserService } from "../../services/plansUserService";
import { logsService } from "../../services/logsService";
import { plansService } from "../../services/plansService"; // ✅ nuevo import para traer planes

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
    planesPorVencerList: [],
  });
  const [alertas, setAlertas] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // 🔄 Traemos todos los datos necesarios al mismo tiempo
        const [usuarios, planesUser, planes, logsResponse] = await Promise.all([
          userService.getAllUsers(),
          plansUserService.getPlansUsers(),
          plansService.getPlans(), // ✅ ahora también traemos los planes
          logsService.getLogs(),
        ]);

        // 🧩 Creamos mapas para buscar nombre de usuario y plan fácilmente
        const userMap = new Map(usuarios.data.map((u) => [u.id, u.name]));
        const planMap = new Map(planes.data.map((p) => [p.id, p.name]));

        // 📦 Planes comprados
        const planesComprados = planesUser.data.length;

        // 🕓 Planes pendientes
        const planesPendientes = planesUser.data.filter(
          (p) => p.status === "pendiente"
        ).length;

        // 📅 Planes por vencer en los próximos 7 días
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const planesPorVencerList = planesUser.data
          .filter((p) => {
            if (!p.expiration_date) return false; // evitar registros sin fecha
            const expirationDate = new Date(p.expiration_date);
            return expirationDate >= today && expirationDate <= nextWeek;
          })
          .map((p) => ({
            plan_name: planMap.get(p.id_plan) ?? "Plan desconocido",
            user_name: userMap.get(p.id_user) ?? "Sin usuario",
            expiration_date: p.expiration_date,
          }));

        // 📊 Actualizamos el estado con toda la información
        setStats({
          usuarios: usuarios.data.length,
          planesComprados,
          planesPendientes,
          planesPorVencer: planesPorVencerList.length,
          planesPorVencerList,
        });

        // 🚨 Logs
        const logs = logsResponse.data;
        setAlertas(logs.filter((l) => l.is_alert === true));
        setNotificaciones(logs.filter((l) => l.is_alert === false));
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

      <div className="adminhome-background">
        <Group className="adminhome-header" justify="space-between" p="md">
          <Text size="lg">👋 Bienvenido, Admin</Text>
          <Text>Fecha: {fecha}</Text>
        </Group>

        <Container className="adminhome-container">
          {/* 📊 Resumen general con modal de planes por vencer */}
          <DashboardStats stats={stats} />

          {/* 🔔 Paneles secundarios */}
          <AlertsPanel alertas={alertas} />
          <ActivityPanel notificaciones={notificaciones} />
          <SystemStatus />
        </Container>
      </div>
    </>
  );
}
