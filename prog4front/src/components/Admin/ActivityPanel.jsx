import { Card, Text, List, ThemeIcon } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export function ActivityPanel({ notificaciones }) {
  return (
    <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor: "#1A1A1A", color: "#fff", marginBottom: "1rem" }}>
      <Text size="xl" fw={700} c="#e5ff00ff" mb="md">🧍 Actividad Reciente</Text>
      {notificaciones.length > 0 ? (
        <List
          spacing="sm"
          icon={<ThemeIcon color="green" radius="xl"><IconCheck size={16} /></ThemeIcon>}
        >
          {notificaciones.map((n, i) => (
            <List.Item key={i}>{n.text}</List.Item>
          ))}
        </List>
      ) : (
        <Text c="gray">No hay actividad reciente.</Text>
      )}
    </Card>
  );
}
