import { Container, Title, Text, Card, Button, Group, Divider } from "@mantine/core";
import { IconDumbbell, IconClockHour4, IconCurrencyDollar } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import "./PlanPhavPage.css";

export function PlanPhavPage() {
  return (
    <div className="phav-wrapper">
      <Container size="md" className="phav-container">
        <Card shadow="xl" padding="lg" radius="lg" className="phav-card">
          <Title order={2} className="phav-title">
            PLAN PHAV
          </Title>

          <Text size="lg" className="phav-description">
            El plan PHAV está diseñado para lograr una recomposición corporal 
            efectiva, mejorar la fuerza, resistencia y estética con un enfoque saludable 
            y sostenible. Ideal para quienes buscan transformar su cuerpo 
            de manera progresiva y eficiente.
          </Text>

          <Divider my="md" />

          <Group className="phav-details">
            <div className="phav-item">
              <IconCurrencyDollar size={30} className="phav-icon" />
              <div>
                <Text fw={700}>Precio</Text>
                <Text>$25.000 / mes</Text>
              </div>
            </div>

            <div className="phav-item">
              <IconClockHour4 size={30} className="phav-icon" />
              <div>
                <Text fw={700}>Duración</Text>
                <Text>3 meses (renovable)</Text>
              </div>
            </div>

            <div className="phav-item">
              <IconDumbbell size={30} className="phav-icon" />
              <div>
                <Text fw={700}>Entrenamiento</Text>
                <Text>5 días por semana</Text>
              </div>
            </div>
          </Group>

          <Divider my="md" />

          <Group justify="center" mt="lg">
            <Button size="lg" radius="md" className="phav-btn">
              ¡Unirme ahora!
            </Button>
            <Link to="/planes">
              <Button size="lg" variant="outline" radius="md" color="gray">
                Volver a planes
              </Button>
            </Link>
          </Group>
        </Card>
      </Container>
    </div>
  );
}
