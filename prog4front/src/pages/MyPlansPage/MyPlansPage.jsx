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

  // Id del usuario logueado (puede venir de localStorage o contexto)
  const idUser = 1; // ⚡ Cámbialo cuando tengas login

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // 🔹 Traemos los dos tipos de planes en paralelo
        const [resEjercicio, resAlimento] = await Promise.all([
          fetch(`http://localhost:9091/api/planEjercicio/${idUser}`),
          fetch(`http://localhost:9091/api/planAlimento/${idUser}`),
        ]);

        const dataEjercicio = resEjercicio.ok ? await resEjercicio.json() : [];
        const dataAlimento = resAlimento.ok ? await resAlimento.json() : [];

        // 🔹 Normalizamos a array
        const planesEjercicio = Array.isArray(dataEjercicio)
          ? dataEjercicio
          : dataEjercicio
          ? [dataEjercicio]
          : [];

        const planesAlimento = Array.isArray(dataAlimento)
          ? dataAlimento
          : dataAlimento
          ? [dataAlimento]
          : [];

        // 🔹 Unificamos ambos en un solo arreglo
        const allPlans = [
          ...planesEjercicio.map((p) => ({ ...p, tipo: "Ejercicio" })),
          ...planesAlimento.map((p) => ({ ...p, tipo: "Alimentación" })),
        ];

        setPlans(allPlans);
      } catch (error) {
        console.error("Error al traer los planes:", error);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [idUser]);

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
            {plans.map((plan, index) => (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group mb="md">
                    <Avatar color={plan.tipo === "Ejercicio" ? "blue" : "green"} radius="xl">
                      {plan.tipo.charAt(0)}
                    </Avatar>
                    <div>
                      <Title order={4}>{plan.nombre || plan.name || "Sin nombre"}</Title>
                      <Badge color={plan.tipo === "Ejercicio" ? "blue" : "green"} variant="light">
                        {plan.tipo}
                      </Badge>
                    </div>
                  </Group>

                  <Text size="sm" mt="xs" c="dimmed">
                    {plan.objetivo || plan.descripcion || plan.description || "Sin descripción"}
                  </Text>

                  <Group mt="md" spacing="xs">
                    <IconCalendar size={18} />
                    <Text size="sm">
                      Duración: {plan.duracion_semana || plan.duracion || "N/D"} semanas
                    </Text>
                  </Group>

                  <Group mt="xs" spacing="xs" color="yellow">
                    <IconCreditCard size={18} />
                    <Text fw={600}>
                      {plan.frecuencia_semanal
                        ? `${plan.frecuencia_semanal} días/semana`
                        : "Frecuencia no especificada"}
                    </Text>
                  </Group>

                  {/* Botón para ver detalles */}
                  <Button
                    fullWidth
                    mt="md"
                    color={plan.tipo === "Ejercicio" ? "blue" : "green"}
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
            Aún no tienes planes asignados.
          </Text>
        )}
      </Container>

      <Footer />

      {/* 🔹 Modal de detalles */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={selectedPlan?.tipo === "Ejercicio" ? "Plan de Ejercicio" : "Plan de Alimentación"}
        size="lg"
      >
        {selectedPlan?.tipo === "Ejercicio" ? (
          <>
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
          </>
        ) : (
          <>
            <Title order={4}>Alimentos</Title>
            {selectedPlan?.alimentos?.length > 0 ? (
              selectedPlan.alimentos.map((a, i) => (
                <Text key={i}>
                  {a.momento}: {a.cantidad} de {a.alimento}
                </Text>
              ))
            ) : (
              <Text c="dimmed">No hay alimentos cargados.</Text>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default MyPlansPage;

