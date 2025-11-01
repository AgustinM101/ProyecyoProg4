import { useEffect, useState } from "react";
import {
  Container,
  SimpleGrid,
  Card,
  Text,
  Title,
  Badge,
  Group,
  Button,
  Stack,
  Center,
  Loader,
} from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import { plansFormService } from "../../services/plansFormService";
import {planAlimentosService } from "../../services/planAlimentosService";
import { plansUserService } from "../../services/plansUserService";
import { userService } from "../../services/userService";
import { planEjerciciosService } from "../../services/planEjerciciosService";

export function MyPlansPage() {
  const [user, setUser] = useState(null);
  const [plansUsers, setPlansUsers] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [planAlimento, setPlanAlimento] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  // 🔹 Traer usuario y sus planes
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
      console.error("Error al cargar los planes del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Mostrar detalle del plan usando token del usuario logueado
  const handleView = async (plansUserId) => {
    try {
      setSelectedPlan(plansUserId);
      setLoading(true);

      // Solo traer el formulario del usuario logueado vía token
      //PREGUNTAR A AGUS COMO LEER POR USUARIO LOGUEADO
    const formResp = await plansFormService.getPlansFormsByUser();
    setFormData(formResp.data?.[0] || null);


    const userPlanId = formData?.plansUserId; // 👈 ajustá esto según cómo venga tu dato (por ejemplo formData?.user_plan_id)

  if (!userPlanId) {
    console.warn("⚠️ No se encontró userPlanId en el formulario");
    return;
  }

     const alimentosResp = await planAlimentosService.getPlanAlimentosByUser(userPlanId);
    setPlanAlimento(alimentosResp.data?.[0] || null);


    const ejerciciosResp = await planEjerciciosService.getPlanEjerciciosByUser(userPlanId);
    setPlanEjercicios(ejerciciosResp.data?.[0] || null);


    } catch (error) {
  console.error("Error al cargar los datos del plan:", error);
}

  if (loading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }
}

  return (
    <>
      <HeaderMenu />
      <Container size="md" py="xl">
        <Title order={2} ta="center" mb="xl">
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
                style={{ backgroundColor: "#141413ff", color: "white", border: "1px solid #eeff05ff" }}
              >
                <Group justify="space-between">
                  <div>
                    <Title order={4}>{plan.plan_name}</Title>
                    <Text size="sm" c="dimmed">
                      Expira: {plan.expiration_date ? new Date(plan.expiration_date).toLocaleDateString() : "Sin fecha"}
                    </Text>
                  </div>
                  <Badge
                    color={
                      plan.status === "active" ? "green" :
                      plan.status === "chargePending" ? "yellow" : "red"
                    }
                    variant="filled"
                  >
                    {plan.status}
                  </Badge>
                </Group>

                <Group mt="md" justify="end">
                  <Button size="sm" color="teal" onClick={() => handleView(plan.id)}>
                    Ver detalles
                  </Button>
                </Group>

                {selectedPlan === plan.id && (
                  <Stack mt="md" spacing="md">
                    {/* Formulario */}
                    <Card p="md" radius="md" style={{ backgroundColor: "#000000ff" }}>
                      <Title order={5}>Formulario</Title>
                      {formData ? (
                        <Stack mt="xs" spacing={4}>
                          <Text size="sm"><strong>Nombre:</strong> {formData.nombre || "-"}</Text>
                          <Text size="sm"><strong>Edad:</strong> {formData.edad || "-"}</Text>
                          <Text size="sm"><strong>Peso:</strong> {formData.peso || "-"} kg</Text>
                          <Text size="sm"><strong>Altura:</strong> {formData.altura || "-"} cm</Text>
                          <Text size="sm"><strong>Peso_actual:</strong> {formData.peso_actual || "-"}</Text>
                          <Text size="sm"><strong>Peso_deseado:</strong> {formData.peso_deseado || "-"}</Text>
                          <Text size="sm"><strong>Actividad_fisica:</strong> {formData.actividad_fisica || "-"}</Text>
                          <Text size="sm"><strong>Antecedentes_medicos:</strong> {formData.antecedentes_medicos || "-"}</Text>
                          <Text size="sm"><strong>Alergias:</strong> {formData.alergias || "-"}</Text>
                          <Text size="sm"><strong> Medicamentos:</strong> {formData.medicamentos || "-"}</Text>
                          <Text size="sm"><strong>Problemas_digestivos:</strong> {formData.problemas_digestivos || "-"}</Text>
                          <Text size="sm"><strong>Comidas_diarias:</strong> {formData.comidas_diarias || "-"}</Text>
                          <Text size="sm"><strong>horarios_de_comidas:</strong> {formData.horarios_de_comidas || "-"}</Text>
                          <Text size="sm"><strong>Consumo_de_agua:</strong> {formData.consumo_de_agua || "-"}</Text>
                          <Text size="sm"><strong>Consumo_de_alcohol:</strong> {formData.consumo_de_alcohol || "-"}</Text>

                        </Stack>
                      ) : (
                        <Text size="sm" c="dimmed">No hay información del formulario.</Text>
                      )}
                      

                  
                    
                        </Card>
                    {/* Plan Ejercicio */}
                    <Card p="md" radius="md" style={{ backgroundColor: "#000000ff" }}>
                      <Title order={5}>Plan de Ejercicio</Title>
                      {planEjerciciosService.length > 0 ? (
                        planEjerciciosService.map((pe) => (
                          <Card key={pe.id} mt="xs" p="sm" radius="md" style={{ backgroundColor: "#090909ff" }}>
                            <Stack spacing={2}>
                              <Text size="sm"><strong>Tipo:</strong> {pe.tipo}</Text>
                              <Text size="sm"><strong>Descripción:</strong> {pe.description}</Text>
                              <Text size="sm"><strong>Días:</strong> {pe.dias}</Text>
                            </Stack>
                          </Card>
                        ))
                      ) : (
                        <Text size="sm" c="dimmed">Aún no hay plan de ejercicio asignado.</Text>
                      )}
                    </Card>

                    {/* Plan Alimento */}
                    <Card p="md" radius="md" style={{ backgroundColor: "#000000ff" }}>
                      <Title order={5}>Plan Alimentario</Title>
                      {planAlimento.length > 0 ? (
                        planAlimento.map((pa) => (
                          <Card key={pa.id} mt="xs" p="sm" radius="md" style={{ backgroundColor: "#3A3B3E" }}>
                            <Stack spacing={2}>
                              <Text size="sm"><strong>Tipo:</strong> {pa.tipo}</Text>
                              <Text size="sm"><strong>Descripción:</strong> {pa.description}</Text>
                              <Text size="sm"><strong>Días:</strong> {pa.dias}</Text>
                            </Stack>
                          </Card>
                        ))
                      ) : (
                        <Text size="sm" c="dimmed">Aún no hay plan alimentario asignado.</Text>
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