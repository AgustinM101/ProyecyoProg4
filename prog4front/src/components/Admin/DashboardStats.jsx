import { Card, Text, Stack, Group } from "@mantine/core";
import { IconUsers, IconShoppingCart, IconClipboardList, IconClock } from "@tabler/icons-react";

export function DashboardStats({ stats }) {
  return (
    <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor: "#1A1A1A", color: "#fff", marginBottom: "1rem" }}>
      <Text size="xl" fw={700} c="#FF6600" mb="md">📊 Resumen General</Text>
      <Stack gap="xs">
        <StatItem icon={<IconUsers color="#FF6600" size={20} />} label="Usuarios registrados" value={stats.usuarios} />
        <StatItem icon={<IconShoppingCart color="#FF6600" size={20} />} label="Planes comprados" value={stats.planesComprados} />
        <StatItem icon={<IconClipboardList color="#FF6600" size={20} />} label="Formularios pendientes" value={stats.planesPendientes} />
        <StatItem icon={<IconClock color="#FF6600" size={20} />} label="Planes por vencer" value={stats.planesPorVencer} />
      </Stack>
    </Card>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <Group justify="space-between">
      <Group gap="xs">{icon}<Text>{label}</Text></Group>
      <Text fw={700}>{value}</Text>
    </Group>
  );
}
