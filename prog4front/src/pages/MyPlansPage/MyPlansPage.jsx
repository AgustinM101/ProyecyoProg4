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

      const resp = await plansUserService.getByUserId(currentUser.id);
      setPlansUsers(resp.data || []);
    } catch (error) {
      console.error("Error al cargar los planes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (pu) => {
    if (!pu) return;

    try {
      setSelectedPlan(pu.id);
      setLoading(true);

      const plansUserId = pu.id;
      console.log("Fetching planAlimento with plansUserId:", plansUserId);

      const [formResp, alimentoResp, ejercicioResp] = await Promise.all([
        plansFormService.getPlansFormsByUser(),
        planAlimentosService.getPlanAlimentosByUser(plansUserId),
        planEjerciciosService.getPlanEjerciciosByUser(plansUserId),
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
                            <strong>Actividad física:</strong>{" "}
                            {formData.actividad_fisica || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Antecedentes médicos:</strong>{" "}
                            {formData.antecedentes_medicos || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Alergias:</strong> {formData.alergias || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Medicamentos:</strong>{" "}
                            {formData.medicamentos || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Problemas digestivos:</strong>{" "}
                            {formData.problemas_digestivos || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Comidas diarias:</strong>{" "}
                            {formData.comidas_diarias || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Alimentos evitar:</strong>{" "}
                            {formData.alimentos_evitar || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Horarios de comida:</strong>{" "}
                            {formData.horarios_comida || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Consumo agua:</strong>{" "}
                            {formData.consumo_agua || "-"}
                          </Text>
                          <Text size="sm">
                            <strong>Consumo alcohol:</strong>{" "}
                            {formData.consumo_alcohol || "-"}
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
                        <table
                          style={{
                            width: "100%",
                            color: "white",
                            borderCollapse: "collapse",
                            marginTop: "10px",
                          }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#1c1c1c" }}>
                              <th
                                style={{
                                  border: "1px solid #eeff05ff",
                                  padding: "6px",
                                }}
                              >
                                Descripción
                              </th>
                              <th
                                style={{
                                  border: "1px solid #eeff05ff",
                                  padding: "6px",
                                }}
                              >
                                Tipo
                              </th>
                              <th
                                style={{
                                  border: "1px solid #eeff05ff",
                                  padding: "6px",
                                }}
                              >
                                Días
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {planAlimento.map((pa) => (
                              <tr key={pa.id} style={{ backgroundColor: "#2a2a2a" }}>
                                <td
                                  style={{
                                    border: "1px solid #eeff05ff",
                                    padding: "6px",
                                  }}
                                >
                                  {pa.description}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #eeff05ff",
                                    padding: "6px",
                                  }}
                                >
                                  {pa.tipo}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #eeff05ff",
                                    padding: "6px",
                                  }}
                                >
                                  {pa.dias}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                        <table
                          style={{
                            width: "100%",
                            color: "white",
                            borderCollapse: "collapse",
                            marginTop: "10px",
                          }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#1c1c1c" }}>
                              <th
                                style={{
                                  border: "1px solid #eeff05ff",
                                  padding: "6px",
                                }}
                              >
                                Tipo
                              </th>
                              <th
                                style={{
                                  border: "1px solid #eeff05ff",
                                  padding: "6px",
                                }}
                              >
                                Días
                              </th>
                              <th
                                style={{
                                  border: "1px solid #eeff05ff",
                                  padding: "6px",
                                }}
                              >
                                Descripción
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {planEjercicio.map((pe) => (
                              <tr key={pe.id} style={{ backgroundColor: "#2a2a2a" }}>
                                <td
                                  style={{
                                    border: "1px solid #eeff05ff",
                                    padding: "6px",
                                  }}
                                >
                                  {pe.tipo}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #eeff05ff",
                                    padding: "6px",
                                  }}
                                >
                                  {pe.dias}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #eeff05ff",
                                    padding: "6px",
                                  }}
                                >
                                  {pe.descripcion}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

