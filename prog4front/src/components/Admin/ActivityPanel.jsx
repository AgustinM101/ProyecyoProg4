import { Card, Text, List, ThemeIcon, Group } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import "./ActivityPanel.css";

export function ActivityPanel({ notificaciones }) {
  return (
    <Card shadow="sm" p="lg" radius="md" className="activity-card">
      <Text size="xl" fw={700} className="activity-title">
        🧍 Actividad Reciente
      </Text>

      {notificaciones.length > 0 ? (
        <div className="activity-scroll">
          <List spacing="sm" className="activity-list">
            {notificaciones.map((n, i) => {
              const fecha = n.created_at
                ? new Date(n.created_at).toLocaleString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : null;

              return (
                <List.Item key={i} className="activity-item">
                  <div className="activity-content">
                    <div className="activity-left">
                      <ThemeIcon color="yellow" radius="xl" size="sm">
                        <IconBell size={14} />
                      </ThemeIcon>
                      <Text size="sm" className="activity-text">
                        {n.text}
                      </Text>
                    </div>
                    {fecha && <Text className="activity-date">{fecha}</Text>}
                  </div>
                </List.Item>
              );
            })}
          </List>
        </div>
      ) : (
        <Text c="gray">No hay actividad reciente.</Text>
      )}
    </Card>
  );
}
