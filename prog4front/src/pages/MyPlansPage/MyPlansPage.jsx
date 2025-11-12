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
  TextInput,
  Textarea,
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
  const [isEditing, setIsEditing] = useState(false); // ✅ nuevo estado

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
// probando
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
      setIsEditing(false);
    } catch (error) {
      console.error("Error al ver detalles del plan:", error);
      setPlanAlimento([]);
      setPlanEjercicio([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Datos guardados:", formData);
    setIsEditing(false);
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
                    {/* FORMULARIO */}
                    <Card p="md" radius="md" style={{ backgroundColor: "#000000ff" }}>
                  <Group justify="space-between" align="center">
  <Title order={5}>FORMULARIO</Title>
  {formData && plan.status === "expired" && (
    <Button
      size="xs"
      color={isEditing ? "red" : "yellow"}
      onClick={() => setIsEditing((prev) => !prev)}
      style={{
        backgroundColor: isEditing ? "#ff3b3b" : "#eeff05ff",
        color: isEditing ? "white" : "black",
        fontWeight: "bold",
      }}
    >
      {isEditing ? "Cancelar edición" : "Editar"}
    </Button>
  )}
</Group>

                      {formData ? (
                        <Stack mt="xs" spacing={4} >
                          <TextInput
                            label="Nombre"

                            value={formData.nombre || ""}
                            onChange={(e) => handleChange("nombre", e.target.value)}
                            disabled={!isEditing}
                          />

                          <TextInput
                            label="Edad"
                            value={formData.edad || ""}
                            onChange={(e) => handleChange("edad", e.target.value)}
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="Sexo"
                            value={formData.sexo || ""}
                            onChange={(e) => handleChange("sexo", e.target.value)}
                            disabled={!isEditing}
                          /> <TextInput
                            label="Altura"
                            value={formData.altura || ""}
                            onChange={(e) => handleChange("altura", e.target.value)}
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="peso_actual"
                            value={formData.peso_actual || ""}
                            onChange={(e) => handleChange("peso_actual", e.target.value)}
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="Peso_deseado"
                            value={formData.peso_deseado || ""}
                            onChange={(e) => handleChange("peso_deseado", e.target.value)}
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="Actividad_fisica"
                            value={formData.actividad_fisica || ""}
                            onChange={(e) => handleChange("actividad_fisica", e.target.value)}
                            disabled={!isEditing}
                          />
                          <Textarea
                            label="Antecedentes médicos"
                            value={formData.antecedentes_medicos || ""}
                            onChange={(e) =>
                              handleChange("antecedentes_medicos", e.target.value)
                            }
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="Alergias"
                            value={formData.alergias || ""}
                            onChange={(e) => handleChange("alergias", e.target.value)}
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="Medicamentos"
                            value={formData.medicamentos || ""}
                            onChange={(e) => handleChange("medicamentos", e.target.value)}
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="Problemas_digestivos"
                            value={formData.problemas_digestivos || ""}
                            onChange={(e) => handleChange("problemas_digestivos", e.target.value)}
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="Comidas_diarias"
                            value={formData.comidas_diarias || ""}
                            onChange={(e) => handleChange("comidas_diarias", e.target.value)}
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="Alimentos_evitar"
                            value={formData.alimentos_evitar || ""}
                            onChange={(e) => handleChange("alimentos_evitar", e.target.value)}
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="Horarios_comidas"
                            value={formData.horarios_comidas || ""}
                            onChange={(e) => handleChange("horarios_comidas", e.target.value)}
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="Consumo_agua"
                            value={formData.consumo_agua || ""}
                            onChange={(e) => handleChange("consumo_agua", e.target.value)}
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="Consumo_alcohol"
                            value={formData.consumo_alcohol || ""}
                            onChange={(e) => handleChange("consumo_alcohol", e.target.value)}
                            disabled={!isEditing}
                          />
                          <TextInput
                            label="Fecha de registro"
                            value={
                              formData.fecha_registro
                                ? new Date(formData.fecha_registro).toLocaleDateString()
                                : new Date().toLocaleDateString()
                            }
                            disabled
                          />
                          {isEditing && (
                            <Group mt="md" justify="center">
                              <Button color="green" onClick={handleSave}>
                                Guardar
                              </Button>
                              <Button color="red" onClick={() => setIsEditing(false)}>
                                Cancelar
                              </Button>
                            </Group>
                          )}
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
                              <th style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
                                Descripción
                              </th>
                              <th style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
                                Tipo
                              </th>
                              <th style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
                                Días
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {planAlimento.map((pa) => (
                              <tr key={pa.id} style={{ backgroundColor: "#2a2a2a" }}>
                                <td style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
                                  {pa.description}
                                </td>
                                <td style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
                                  {pa.tipo}
                                </td>
                                <td style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
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
                              <th style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
                                Tipo
                              </th>
                              <th style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
                                Días
                              </th>
                              <th style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
                                Descripción
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {planEjercicio.map((pe) => (
                              <tr key={pe.id} style={{ backgroundColor: "#2a2a2a" }}>
                                <td style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
                                  {pe.tipo}
                                </td>
                                <td style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
                                  {pe.dias}
                                </td>
                                <td style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
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
