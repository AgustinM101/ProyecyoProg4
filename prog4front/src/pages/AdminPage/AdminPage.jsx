import { AdminNavbar } from "../../components/Admin/AdminNavbar";
import { Group, Text, Container, Card, SimpleGrid, Button } from "@mantine/core";
import { IconClipboardList, IconBell, IconRocket, IconUsers } from "@tabler/icons-react";

export function AdminPage() {
  const fecha = new Date().toLocaleDateString("es-AR");

  return (
    <>
      {/* Navbar */}
      <AdminNavbar />

      {/* Bienvenida + Fecha */}
      <Group justify="space-between" p="md" style={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
        <Text size="lg">👋 Bienvenido, Admin</Text>
        <Text>Fecha: {fecha}</Text>
      </Group>

      {/* Contenido principal */}
      <Container fluid style={{ padding: "20px", backgroundColor: "#121212", minHeight: "calc(100vh - 110px)" }}>
        <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        
          {/* Bloque Inicio */}
          <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
            <Group position="apart" mb="md">
              <Text weight={700} size="lg">Inicio</Text>
              <IconRocket size={24} color="#FF6600" />
            </Group>
            <Text>Resumen de estadísticas y actividad reciente del sistema.</Text>
            <Button mt="md" variant="filled" color="#FF6600">Ver detalles</Button>
          </Card>

          {/* Bloque Formularios */}
          <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
            <Group position="apart" mb="md">
              <Text weight={700} size="lg">Formularios</Text>
              <IconClipboardList size={24} color="#FF6600" />
            </Group>
            <Text>Accede a todos los formularios enviados por los usuarios.</Text>
            <Button mt="md" variant="filled" color="#FF6600">Ver Formularios</Button>
          </Card>

          {/* Bloque Alertas */}
          <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
            <Group position="apart" mb="md">
              <Text weight={700} size="lg">Alertas</Text>
              <IconBell size={24} color="#FF6600" />
            </Group>
            <Text>Revisa notificaciones importantes y alertas del sistema.</Text>
            <Button mt="md" variant="filled" color="#FF6600">Ver Alertas</Button>
          </Card>

          {/* Bloque Accesos rápidos */}
          <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
            <Group position="apart" mb="md">
              <Text weight={700} size="lg">Accesos rápidos</Text>
              <IconUsers size={24} color="#FF6600" />
            </Group>
            <Text>Navega rápidamente a secciones de clientes, planes y más.</Text>
            <Button mt="md" variant="filled" color="#FF6600">Ir a Clientes</Button>
          </Card>

        </SimpleGrid>
      </Container>
    </>
  );
}
