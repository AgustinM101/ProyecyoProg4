// src/pages/AdminPage/AdminHome.jsx
import { useEffect, useState } from "react";
import { Container, Group, Text, Loader } from "@mantine/core";

import { userService } from "../../services/userService";
import { plansUserService } from "../../services/plansUserService";
import { logsService } from "../../services/logsService";
import { plansService } from "../../services/plansService";

import { DashboardStats } from "../../components/Admin/DashboardStats";
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
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usuarios, planesUser, planes, logsResponse] = await Promise.all([
          userService.getAllUsers(),
          plansUserService.getPlansUsers(),
          plansService.getPlans(),
          logsService.getLogs(),
        ]);

        // 🧩 Mapas para relacionar usuarios y planes
        const userMap = new Map(usuarios.data.map((u) => [u.id, u.name]));
        const planMap = new Map(planes.data.map((p) => [p.id, p.name]));

        // 📦 Métricas generales
        const planesComprados = planesUser.data.length;
        const planesPendientes = planesUser.data.filter(
          (p) => p.status === "pendiente"
        ).length;

        // 🕒 Planes por vencer (dentro de 7 días)
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const planesPorVencerList = planesUser.data
          .filter((p) => {
            if (!p.expiration_date) return false;
            const expirationDate = new Date(p.expiration_date);
            return expirationDate >= today && expirationDate <= nextWeek;
          })
          .map((p) => ({
            plan_name: planMap.get(p.id_plan) ?? "Plan desconocido",
            user_name: userMap.get(p.id_user) ?? "Sin usuario",
            expiration_date: p.expiration_date,
          }));

        // 📊 Actualizar métricas
        setStats({
          usuarios: usuarios.data.length,
          planesComprados,
          planesPendientes,
          planesPorVencer: planesPorVencerList.length,
          planesPorVencerList,
        });

        // 🔔 Notificaciones (solo las que no son alertas)
        const logs = logsResponse.data
          .filter((l) => !l.is_alert)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // más recientes arriba

        setNotificaciones(logs);
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
          {/* 📊 Resumen general */}
          <DashboardStats stats={stats} />

          {/* 🔔 Notificaciones recientes */}
          <ActivityPanel notificaciones={notificaciones} />

          {/* ⚙️ Estado del sistema */}
          <SystemStatus />
        </Container>
      </div>
    </>
  );
}
