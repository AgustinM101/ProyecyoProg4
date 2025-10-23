import { Card, Text, Group, ThemeIcon, Divider } from "@mantine/core";
import { IconCpu } from "@tabler/icons-react";

export function SystemStatus() {
  return (
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
  );
}
