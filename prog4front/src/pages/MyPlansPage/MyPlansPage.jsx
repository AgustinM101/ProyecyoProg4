import React, { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import {
  Container,
  Title,
  Grid,
  Card,
  Text,
  Loader,
  Badge,
  Button,
  Group,
  Avatar,
} from "@mantine/core";
import { IconCalendar, IconCreditCard } from "@tabler/icons-react";

// Planes de ejemplo (mock)
const mockPlans = [
  {
    id: 1,
    name: "Plan Básico",
    description: "Acceso al gimnasio de lunes a viernes.",
    type: "Mensual",
    price: 3500,
    startDate: "2025-09-01",
  },
  {
    id: 2,
    name: "Plan Premium",
    description: "Acceso libre todos los días + clases grupales.",
    type: "Trimestral",
    price: 9000,
    startDate: "2025-08-15",
  },
  {
    id: 3,
    name: "Plan Full",
    description: "Acceso 24/7 + entrenador personal.",
    type: "Anual",
    price: 30000,
    startDate: "2025-07-10",
  },
];

const MyPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data: user } = await userService.getCurrentUser();
        const { data } = await userService.getUserPlans(user.id);

        const normalizedPlans = Array.isArray(data)
          ? data
          : data?.plans || [];

        // Si no hay planes reales, usar mock
        setPlans(normalizedPlans.length > 0 ? normalizedPlans : mockPlans);
      } catch (error) {
        console.error("Error al traer los planes:", error);
        // fallback al mock en caso de error
        setPlans(mockPlans);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <Container size="sm" style={{ textAlign: "center", marginTop: "50px" }}>
        <Loader size="lg" />
        <Text mt="md">Cargando planes...</Text>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={2} align="center" mb="xl">
        Mis Planes
      </Title>

      {plans.length > 0 ? (
        <Grid>
          {plans.map((plan) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={plan.id}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group mb="md">
                  <Avatar color="teal" radius="xl">
                    {plan.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <div>
                    <Title order={4}>{plan.name}</Title>
                    <Badge color="teal" variant="light">
                      {plan.type}
                    </Badge>
                  </div>
                </Group>

                <Text size="sm" mt="xs" c="dimmed">
                  {plan.description}
                </Text>

                <Group mt="md" spacing="xs">
                  <IconCalendar size={18} />
                  <Text size="sm">Inicio: {plan.startDate || "N/D"}</Text>
                </Group>

                <Group mt="xs" spacing="xs">
                  <IconCreditCard size={18} />
                  <Text fw={600}>${plan.price}</Text>
                </Group>

                <Button fullWidth mt="md" color="teal" variant="light">
                  Ver detalles
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Text align="center" mt="xl" size="lg">
          Todavía no adquiriste ningún plan.
        </Text>
      )}
    </Container>
  );
};

export default MyPlansPage;

