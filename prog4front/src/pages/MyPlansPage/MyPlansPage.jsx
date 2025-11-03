import { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Card,
  Text,
  Title,
  Badge,
  Group,
  Button,
  TextInput,
  Center,
  Loader,
} from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import { plansFormService } from "../../services/plansFormService";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";
import { plansUserService } from "../../services/plansUserService";
import { userService } from "../../services/userService";

export function MyPlansPage() {
  const [user, setUser] = useState(null);
  const [plansUsers, setPlansUsers] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState(null);
  const [planAlimento, setPlanAlimento] = useState([]);
  const [planEjercicio, setPlanEjercicio] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Al montar, traer usuario y sus planes
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const userResp = await userService.getCurrentUser();
      const currentUser = userResp?.data;
      if (!currentUser) throw new Error("No hay usuario logueado");

      setUser(currentUser);

      // Traer los planes del usuario logueado
      const resp = await plansUserService.getByUserId(currentUser.id);
      setPlansUsers(resp.data || []);
      
      const plansUserId = resp.data.map((pu) => pu.id);
    } catch (error) {
      console.error("Error al cargar los planes:", error);
    } finally {
      setLoading(false);
    }
  };

 const handleView = async (pu) => {
  if (!pu) return;

  try {
    setSelectedPlan(pu.id); // Selecciona el plan actual
    setLoading(true);

    const plansUserId = pu.id;
    console.log("Fetching planAlimento with plansUserId:", plansUserId);

    // Formulario asociado usando id_user
    
    

    
    const [formResp, alimentoResp, ejercicioResp] = await Promise.all([
      plansFormService.getPlansFormsByUser(),
      planAlimentosService.getPlanAlimentosByUser(plansUserId),
      planEjerciciosService.getPlanEjerciciosByUser(plansUserId)
    ]);
    setFormData(formResp.data?.[0] || null);
    setPlanAlimento(alimentoResp.data || []);
    setPlanEjercicio(ejercicioResp.data || []);
  } catch (error) {
    console.error("Error al ver detalles del plan:", error);
    setPlanAlimento([]);
    setPlanEjercicio([]);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <>
      <HeaderMenu />
      <Container size="md" py="xl">
        <Title order={1} ta="center" mb="xl">
          Mis Planes
        </Title>

        {plansUsers.length === 0 ? (
          <Text ta="center">No tenés planes activos actualmente.</Text>
        ) : (
          <Stack spacing="md">
            {plansUsers.map((plan) => (
              <Card
                key={plan.id}
                shadow="md"
                p="lg"
                radius="md"
                withBorder
                style={{
                  backgroundColor: "#141413ff",
                  color: "white",
                  border: "1px solid #eeff05ff",
                }}
              >
                <Group justify="space-between">
                  <div>
                    <Title order={4}>{plan.plan_name}</Title>
                    <Text size="sm" c="dimmed">
                      Expira:{" "}
                      {plan.expiration_date
                        ? new Date(plan.expiration_date).toLocaleDateString()
                        : "Sin fecha"}
                    </Text>
                  </div>
                  <Badge
                    color={
                      plan.status === "active"
                        ? "green"
                        : plan.status === "chargePending"
                        ? "yellow"
                        : "red"
                    }
                    variant="filled"
                  >
                    {plan.status}
                  </Badge>
                </Group>

                <Group mt="md" justify="end">
                  <Button
                    size="sm"
                    color="teal"
                    leftSection={<IconEye size={16} />}
                    onClick={() => handleView(plan)}
                  >
                    Ver detalles
                  </Button>
                </Group>

                {selectedPlan === plan.id && (
                  <Stack mt="md" spacing="md">
                    {/* Formulario */}
                    <Card p="md" radius="md" style={{ backgroundColor: "#000000ff" }}>
                      <Title order={5}>FORMULARIO</Title>
                      {formData ? (
                        <Stack mt="xs" spacing={4}>
                          <Text size="sm">
                            <strong>Nombre:</strong> {formData.nombre || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Edad:</strong> {formData.edad || "-"}
                          </Text>

                           <Text size="sm">
                            <strong>Sexo:</strong> {formData.sexo || "-"}
                          </Text>
                           <Text size="sm">
                            <strong>Altura:</strong> {formData.altura || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Peso actual:</strong> {formData.peso_actual || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Peso deseado:</strong> {formData.peso_deseado || "-"}
                          </Text>
                           <Text size="sm">
                            <strong>Actividad física:</strong> {formData.actividad_fisica || "-"}
                          </Text>
                           <Text size="sm">
                            <strong>Antecedentes médicos:</strong> {formData.antecedentes_medicos || "-"}
                          </Text>
                           <Text size="sm">
                            <strong>Alergias:</strong> {formData.alergias || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Medicamentos:</strong> {formData.medicamentos || "-"}
                          </Text>
                           <Text size="sm">
                            <strong>Problemas digestivos:</strong> {formData.problemas_digestivos || "-"}
                          </Text>
                           <Text size="sm">
                            <strong>Comidas diarias:</strong> {formData.comidas_diarias || "-"}
                          </Text>
                           <Text size="sm">
                            <strong>Alimentos evitar:</strong> {formData.alimentos_evitar || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Horarios de comida:</strong> {formData.horarios_comida || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Consumo agua:</strong> {formData.consumo_agua || "-"}
                          </Text>
                           <Text size="sm">
                            <strong>Consumo alcohol:</strong> {formData.consumo_alcohol || "-"}
                          </Text>
                        </Stack>
                      ) : (
                        <Text size="sm" c="dimmed">
                          No hay información del formulario.
                        </Text>
                      )}
                    </Card>

                    {/* Plan Alimentario */}
                    <Card p="md" radius="md" style={{ backgroundColor: "#000000ff" }}>
                      <Title order={5}>Plan Alimentario</Title>
                      {planAlimento.length > 0 ? (
                        planAlimento.map((pa) => (
                          <Card
                            key={pa.id}
                            mt="xs"
                            p="sm"
                            radius="md"
                            style={{ backgroundColor: "#3A3B3E" }}
                          >
                            <Stack spacing={2}>
                              <Text size="sm">
                                <strong>Día:</strong> {pa.dia}
                              </Text>
                              <Text size="sm">
                                <strong>Comida:</strong> {pa.comida}
                              </Text>
                              <Text size="sm">
                                <strong>Descripción:</strong> {pa.descripcion}
                              </Text>
                            </Stack>
                          </Card>
                        ))
                      ) : (
                        <Text size="sm" c="dimmed">
                          Aún no hay plan alimentario asignado.
                        </Text>
                      )}
                    </Card>

                    {/* Plan de Ejercicio */}
                    <Card p="md" radius="md" style={{ backgroundColor: "#000000ff" }}>
                      <Title order={5}>Plan de Ejercicio</Title>
                      {planEjercicio.length > 0 ? (
                        planEjercicio.map((pe) => (
                          <Card
                            key={pe.id}
                            mt="xs"
                            p="sm"
                            radius="md"
                            style={{ backgroundColor: "#090909ff" }}
                          >
                            <Stack spacing={2}>
                              <Text size="sm">
                                <strong>Día:</strong> {pe.dia}
                              </Text>
                              <Text size="sm">
                                <strong>Ejercicio:</strong> {pe.ejercicio}
                              </Text>
                              <Text size="sm">
                                <strong>Series:</strong> {pe.series}
                              </Text>
                              <Text size="sm">
                                <strong>Repeticiones:</strong> {pe.repeticiones}
                              </Text>
                            </Stack>
                          </Card>
                        ))
                      ) : (
                        <Text size="sm" c="dimmed">
                          Aún no hay plan de ejercicios asignado.
                        </Text>
                      )}
                    </Card>
                  </Stack>
                )}
              </Card>
            ))}
          </Stack>
        )}
      </Container>
      <Footer />
    </>
  );
}
