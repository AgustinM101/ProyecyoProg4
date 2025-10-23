import { Card, Text, List, ThemeIcon } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export function AlertsPanel({ alertas }) {
  return (
    <Card shadow="sm" p="lg" radius="md" style={{ backgroundColor: "#1A1A1A", color: "#fff", marginBottom: "1rem" }}>
      <Text size="xl" fw={700} c="#ff0000ff" mb="md">⚠️ Alertas Importantes</Text>
      {alertas.length > 0 ? (
        <List
          spacing="sm"
          icon={<ThemeIcon color="#ff0000ff" radius="xl"><IconAlertTriangle size={16} /></ThemeIcon>}
        >
          {alertas.map((a, i) => (
            <List.Item key={i}>{a.text}</List.Item>
          ))}
        </List>
      ) : (
        <Text c="gray">No hay alertas por el momento.</Text>
      )}
    </Card>
  );
}
