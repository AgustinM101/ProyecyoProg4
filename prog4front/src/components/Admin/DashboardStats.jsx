import { Card, Text, Stack, Group, Tooltip, Modal, Table, Button } from "@mantine/core";
import { IconUsers, IconShoppingCart, IconClipboardList, IconClock, IconEye } from "@tabler/icons-react";
import { useState } from "react";

export function DashboardStats({ stats }) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {/* 📊 Modal de planes por vencer */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Planes próximos a vencer "
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        styles={{
          content: { backgroundColor: "#1A1A1A", color: "#fff" },
          title: { color: "#FF6600", fontWeight: 700 },
        }}
      >
        {stats.planesPorVencerList?.length ? (
          <Table striped highlightOnHover withTableBorder>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Plan</th>
                <th>Fecha de vencimiento</th>
              </tr>
            </thead>
            <tbody>
              {stats.planesPorVencerList.map((p, i) => (
                <tr key={i}>
                  <td>{p.user_name || "Sin usuario"}</td>
                  <td>{p.plan_name}</td>
                  <td>{new Date(p.expiration_date).toLocaleDateString("es-AR")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Text c="dimmed" ta="center">
            No hay planes por vencer en los próximos 7 días.
          </Text>
        )}
      </Modal>

      {/* 📊 Card principal */}
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        style={{
          backgroundColor: "#1A1A1A",
          color: "#fff",
          marginBottom: "1rem",
        }}
      >
        <Text size="xl" fw={700} c="#FF6600" mb="md">
          📊 Resumen General
        </Text>
        <Stack gap="xs">
          <StatItem
            icon={<IconUsers color="#FF6600" size={20} />}
            label="Usuarios registrados"
            value={stats.usuarios}
          />
          <StatItem
            icon={<IconShoppingCart color="#FF6600" size={20} />}
            label="Planes comprados"
            value={stats.planesComprados}
          />
          <StatItem
            icon={<IconClipboardList color="#FF6600" size={20} />}
            label="Planes pendientes"
            value={stats.planesPendientes}
          />

          {/* 🕒 Planes por vencer */}
          <Group justify="space-between">
            <Group gap="xs">
              <IconClock color="#FF6600" size={20} />
              <Text>Planes por vencer</Text>
            </Group>
            <Group gap="xs">
              <Text fw={700}>{stats.planesPorVencer}</Text>
              <Tooltip label="Ver detalles" withArrow color="orange">
                <IconEye
                  color="#FF6600"
                  size={20}
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpened(true)}
                />
              </Tooltip>
            </Group>
          </Group>
        </Stack>
      </Card>
    </>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <Group justify="space-between">
      <Group gap="xs">
        {icon}
        <Text>{label}</Text>
      </Group>
      <Text fw={700}>{value}</Text>
    </Group>
  );
}
