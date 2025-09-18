import { Container, Title, Text, Card, Button, Group, Divider } from "@mantine/core";
import { IconClockHour4, IconCurrencyDollar } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu"; // Importa el header
import { Footer } from "../../components/Footer/Footer";
import "./PlanPhavPage.css";

export function PlanPhavPage() {
  return (
    <>
      {/* Header común a todas las páginas */}
      <HeaderMenu />

      <div className="phav-wrapper">
        <Container size="md" className="phav-container">
          <Card shadow="xl" padding="lg" radius="lg" className="phav-card">

            <div className="phav-logo-container">
              <img
                src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757462534/logo_nuevo_infinit_sports_nsmg9n.png"
                alt="Logo del Gym"
                className="phav-logo"
              />
            </div>

            <Title order={2} className="phav-title">
              PLAN PHAV
            </Title>

            <Text size="lg" className="phav-description">
              El plan PHAV está diseñado para lograr una recomposición corporal efectiva,
              mejorar fuerza, resistencia y estética de manera progresiva y saludable.
            </Text>

            <Divider my="md" />

            <Group className="phav-details" direction="column" spacing="md">
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
                <div>
                  <Text fw={700}>Entrenamiento</Text>
                  <Text>5 días por semana</Text>
                </div>
              </div>
            </Group>

            <Divider my="md" />

            <Group justify="center" mt="lg">
              <Button size="lg" radius="md" className="phav-btn">
                Comprar plan
              </Button>
              <Link to="/plans">
                <Button size="lg" variant="outline" radius="md" color="gray">
                  Volver a planes
                </Button>
              </Link>
            </Group>

          </Card>
        </Container>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

