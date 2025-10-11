import React, { useEffect, useState } from "react";
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
  Modal,
} from "@mantine/core";
import { IconCalendar, IconCreditCard } from "@tabler/icons-react";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";

const MyPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Traer planes del usuario desde backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // 👇 Cambia la URL a tu backend real
        const res = await fetch("http://localhost:9091/api/plansuser/1");
        const data = await res.json();

        // Normalizamos (por si devuelve objeto en vez de array)
        const userPlans = Array.isArray(data) ? data : data?.plans || [];
        setPlans(userPlans);
      } catch (error) {
        console.error("Error al traer planes:", error);
        setPlans([]);
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
    <>
      <HeaderMenu />
      <Container size="lg" py="xl">
        <Title order={2} align="center" mb="xl">
          MIS PLANES
        </Title>

        {plans.length > 0 ? (
          <Grid>
            {plans.map((plan) => (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={plan.id}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group mb="md">
                    <Avatar color="yellow" radius="xl">
                      {plan.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                      <Title order={4}>{plan.name}</Title>
                      <Badge color="yellow" variant="light">
                        {plan.type || "N/D"}
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

                  <Group mt="xs" spacing="xs" color="yellow">
                    <IconCreditCard size={18} />
                    <Text fw={600}>${plan.price}</Text>
                  </Group>

                  {/* Botón para ver detalles */}
                  <Button
                    fullWidth
                    mt="md"
                    color="yellow"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setOpened(true);
                    }}
                  >
                    Ver detalles
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Text align="center" mt="xl" size="lg" c="dimmed">
            Aguarde, todavía su plan no ha sido cargado.
          </Text>
        )}
      </Container>
      <Footer />

      {/* Modal de detalles */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={selectedPlan?.name || "Detalles del plan"}
        size="lg"
      >
        <Title order={4}>Ejercicios</Title>
        {selectedPlan?.ejercicios?.length > 0 ? (
          selectedPlan.ejercicios.map((e, i) => (
            <Text key={i}>
              {e.nombre_ejercicio} - {e.series}x{e.repeticiones}
            </Text>
          ))
        ) : (
          <Text c="dimmed">No hay ejercicios cargados.</Text>
        )}

        <Title order={4} mt="md">
          Alimentos
        </Title>
        {selectedPlan?.alimentos?.length > 0 ? (
          selectedPlan.alimentos.map((a, i) => (
            <Text key={i}>
              {a.momento}: {a.cantidad} de {a.alimento}
            </Text>
          ))
        ) : (
          <Text c="dimmed">No hay alimentos cargados.</Text>
        )}
      </Modal>
    </>
  );
};

export default MyPlansPage;

