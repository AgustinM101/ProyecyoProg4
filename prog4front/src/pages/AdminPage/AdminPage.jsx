import { useEffect, useState } from "react";
import {
  Container,
  Group,
  Text,
  Card,
  SimpleGrid,
  Stack,
  Divider,
  List,
  ThemeIcon,
  Loader,
} from "@mantine/core";
import {
  IconUsers,
  IconClipboardList,
  IconShoppingCart,
  IconAlertTriangle,
  IconClock,
  IconCheck,
  IconCpu,
} from "@tabler/icons-react";
import { AdminNavbar } from "../../components/Admin/AdminNavbar";

// 🧩 Importá tus servicios (ajustá los paths según tu estructura real)
import { userService } from "../../services/userService";
import { formsService } from "../../services/formsService";
import { plansService } from "../../services/plansService";

export function AdminPage() {
  const fecha = new Date().toLocaleDateString("es-AR");

  const [stats, setStats] = useState({
    usuarios: 0,
    planesComprados: 0,
    formulariosPendientes: 0,
    planesPorVencer: 0,
  });

  const [alertas, setAlertas] = useState([]);
  const [actividad, setActividad] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Consultas al backend usando los endpoints ya existentes
  useEffect(() => {
    async function fetchData() {
      try {
        const [usuarios, formularios, planes] = await Promise.all([
          userService.getAllUsers(),
          formsService.getForms(),
          plansService.getPlans(),
        ]);

        // Ejemplo de cálculo de métricas simples desde los datos:
        const formulariosPendientes = formularios.filter(f => f.estado === "pendiente").length;
        const planesPorVencer = planes.filter(p => p.dias_restantes && p.dias_restantes <= 5).length;

        setStats({
          usuarios: usuarios.length,
          planesComprados: planes.length,
          formulariosPendientes,
          planesPorVencer,
        });

        // ⚠️ Alertas automáticas basadas en datos
        const nuevasAlertas = [];
        if (formulariosPendientes > 0)
          nuevasAlertas.push(`${formulariosPendientes} formularios sin revisar`);
        if (planesPorVencer > 0)
          nuevasAlertas.push(`${planesPorVencer} plan(es) por vencer en pocos días`);

        setAlertas(nuevasAlertas);

        // 🧍 Actividad reciente simulada (podés reemplazarla luego con getActividad)
        setActividad([
          'Juan Pérez compró “Plan Básico”',
          'Ana López envió un formulario',
        ]);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 🌀 Loader mientras se cargan los datos
  if (loading) {
    return (
      <>
        <AdminNavbar />
        <Group justify="center" align="center" style={{ height: "100vh", background: "#0D0D0D" }}>
          <Loader color="#FF6600" size="xl" />
        </Group>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      {/* Encabezado */}
      <Group justify="space-between" p="md" bg="#1A1A1A" c="white">
        <Text size="lg">👋 Bienvenido, Admin</Text>
        <Text>Fecha: {fecha}</Text>
      </Group>

      {/* Contenido principal */}
      <Container fluid bg="#0D0D0D" p="xl" style={{ minHeight: "100vh" }}>
        <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {/* 📊 Resumen General */}
          <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
            <Text size="xl" fw={700} c="#FF6600" mb="md">📊 Resumen General</Text>

            <Stack gap="xs">
              <Group justify="space-between">
                <Group gap="xs">
                  <IconUsers color="#FF6600" size={20} />
                  <Text>Usuarios registrados</Text>
                </Group>
                <Text fw={700}>{stats.usuarios}</Text>
              </Group>

              <Group justify="space-between">
                <Group gap="xs">
                  <IconShoppingCart color="#FF6600" size={20} />
                  <Text>Planes comprados</Text>
                </Group>
                <Text fw={700}>{stats.planesComprados}</Text>
              </Group>

              <Group justify="space-between">
                <Group gap="xs">
                  <IconClipboardList color="#FF6600" size={20} />
                  <Text>Formularios pendientes</Text>
                </Group>
                <Text fw={700}>{stats.formulariosPendientes}</Text>
              </Group>

              <Group justify="space-between">
                <Group gap="xs">
                  <IconClock color="#FF6600" size={20} />
                  <Text>Planes por vencer</Text>
                </Group>
                <Text fw={700}>{stats.planesPorVencer}</Text>
              </Group>
            </Stack>
          </Card>

          {/* ⚠️ Alertas */}
          <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
            <Text size="xl" fw={700} c="#FF6600" mb="md">⚠️ Alertas Importantes</Text>

            {alertas.length > 0 ? (
              <List
                spacing="sm"
                icon={<ThemeIcon color="#FF6600" radius="xl"><IconAlertTriangle size={16} /></ThemeIcon>}
              >
                {alertas.map((a, i) => (
                  <List.Item key={i}>{a}</List.Item>
                ))}
              </List>
            ) : (
              <Text c="gray">No hay alertas por el momento.</Text>
            )}
          </Card>

          {/* 🧍 Actividad Reciente */}
          <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
            <Text size="xl" fw={700} c="#FF6600" mb="md">🧍 Actividad Reciente</Text>

            {actividad.length > 0 ? (
              <List
                spacing="sm"
                icon={<ThemeIcon color="#FF6600" radius="xl"><IconCheck size={16} /></ThemeIcon>}
              >
                {actividad.map((a, i) => (
                  <List.Item key={i}>{a}</List.Item>
                ))}
              </List>
            ) : (
              <Text c="gray">No hay actividad reciente.</Text>
            )}
          </Card>

          {/* 🚀 Rendimiento o espacio libre */}
          <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
            <Text size="xl" fw={700} c="#FF6600" mb="md">🚀 Rendimiento del Sistema</Text>
            <Group>
              <ThemeIcon color="#FF6600" size="lg" radius="xl">
                <IconCpu size={20} />
              </ThemeIcon>
              <Text>Servidor activo y estable</Text>
            </Group>
            <Divider my="sm" />
            <Text size="sm" c="gray">(Datos simulados por ahora)</Text>
          </Card>
        </SimpleGrid>
      </Container>
    </>
  );
}
