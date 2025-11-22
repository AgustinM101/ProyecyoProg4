import { useEffect, useRef, useState } from "react";
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export function MyPlansPage() {
  const [user, setUser] = useState(null);
  const [plansUsers, setPlansUsers] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState(null);
  const [planAlimento, setPlanAlimento] = useState([]);
  const [planEjercicio, setPlanEjercicio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // ✅ nuevo estado


   // refs para PDF
  const planAlimentoRef = useRef();
  const planEjercicioRef = useRef();


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

  // Función para descargar PDF
  const handleDownloadPDF = async (ref, fileName) => {
    if (!ref.current) return;
    try {
      const canvas = await html2canvas(ref.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(fileName);
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("❌ No se pudo generar el PDF");
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
          Mi formulario y planes
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
                        <Stack mt="xs" spacing={10}>

                          {/* === SECCIÓN 1: DATOS PERSONALES === */}
                          <h3 className="section-title">Datos Personales</h3>
                          <div className="section-divider"></div>

                          <div className="two-columns">
                            <TextInput
                              label="Nombre completo"
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
                            />

                            <TextInput
                              label="Altura (m)"
                              value={formData.altura || ""}
                              onChange={(e) => handleChange("altura", e.target.value)}
                              disabled={!isEditing}
                            />

                            <TextInput
                              label="Peso actual (kg)"
                              value={formData.peso_actual || ""}
                              onChange={(e) => handleChange("peso_actual", e.target.value)}
                              disabled={!isEditing}
                            />

                            <TextInput
                              label="Peso deseado (kg)"
                              value={formData.peso_deseado || ""}
                              onChange={(e) => handleChange("peso_deseado", e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>

                          {/* === SECCIÓN 2: HISTORIAL CLÍNICO === */}
                          <h3 className="section-title">Historial Clínico</h3>
                          <div className="section-divider"></div>

                          <div className="two-columns">
                            <Textarea
                              label="Antecedentes médicos"
                              autosize
                              minRows={3}
                              value={formData.antecedentes_medicos || ""}
                              onChange={(e) => handleChange("antecedentes_medicos", e.target.value)}
                              disabled={!isEditing}
                            />

                            <Textarea
                              label="Alergias"
                              autosize
                              minRows={3}
                              value={formData.alergias || ""}
                              onChange={(e) => handleChange("alergias", e.target.value)}
                              disabled={!isEditing}
                            />

                            <Textarea
                              label="Medicamentos"
                              autosize
                              minRows={3}
                              value={formData.medicamentos || ""}
                              onChange={(e) => handleChange("medicamentos", e.target.value)}
                              disabled={!isEditing}
                            />

                            <Textarea
                              label="Problemas digestivos"
                              autosize
                              minRows={3}
                              value={formData.problemas_digestivos || ""}
                              onChange={(e) =>
                                handleChange("problemas_digestivos", e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </div>

                          {/* === SECCIÓN 3: HÁBITOS Y RUTINAS === */}
                          <h3 className="section-title">Hábitos y Rutinas</h3>
                          <div className="section-divider"></div>

                          <div className="two-columns">
                            <Textarea
                              label="Actividad física"
                              autosize
                              minRows={3}
                              value={formData.actividad_fisica || ""}
                              onChange={(e) => handleChange("actividad_fisica", e.target.value)}
                              disabled={!isEditing}
                            />

                            <Textarea
                              label="Comidas diarias"
                              autosize
                              minRows={3}
                              value={formData.comidas_diarias || ""}
                              onChange={(e) => handleChange("comidas_diarias", e.target.value)}
                              disabled={!isEditing}
                            />

                            <Textarea
                              label="Alimentos a evitar"
                              autosize
                              minRows={3}
                              value={formData.alimentos_evitar || ""}
                              onChange={(e) => handleChange("alimentos_evitar", e.target.value)}
                              disabled={!isEditing}
                            />

                            <Textarea
                              label="Horarios de comidas"
                              autosize
                              minRows={3}
                              value={formData.horarios_comidas || ""}
                              onChange={(e) => handleChange("horarios_comidas", e.target.value)}
                              disabled={!isEditing}
                            />

                            <TextInput
                              label="Consumo de agua (litros/día)"
                              value={formData.consumo_agua || ""}
                              onChange={(e) => handleChange("consumo_agua", e.target.value)}
                              disabled={!isEditing}
                            />

                            <TextInput
                              label="Consumo de alcohol (veces/semana)"
                              value={formData.consumo_alcohol || ""}
                              onChange={(e) => handleChange("consumo_alcohol", e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>

                          {/* Fecha */}
                          <TextInput
                            label="Fecha de registro"
                            value={
                              formData.fecha_registro
                                ? new Date(formData.fecha_registro).toLocaleDateString()
                                : new Date().toLocaleDateString()
                            }
                            disabled
                          />

                          {/* BOTONES DE EDICIÓN */}
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


                    

                    {/* tabla Plan Alimentario */}
                    <Card ref={planAlimentoRef} p="md" radius="md" style={{ backgroundColor: "#000000ff" }}>
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
                              <th style={{ border: "1px solid #eeff05ff", padding: "6px" }}>Comida / Día</th>
                              <th>Lunes</th>
                              <th>Martes</th>
                              <th>Miércoles</th>
                              <th>Jueves</th>
                              <th>Viernes</th>
                              <th>Sábado</th>
                              <th>Domingo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {["Desayuno", "Almuerzo", "Cena", "Snack"].map((meal) => (
                              <tr key={meal} style={{ backgroundColor: "#2a2a2a" }}>
                                <td style={{ border: "1px solid #eeff05ff", padding: "6px" }}>{meal}</td>
                                {["1", "2", "3", "4", "5", "6", "7"].map((day) => {
                                  const item = planAlimento.find(
                                    (pa) => pa.tipo === meal && pa.dias === day
                                  );
                                  return (
                                    <td key={day} style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
                                      {item ? item.description : "-"}
                                    </td>
                                  );
                                })}
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
                     {/* Botones descargar PDF */}
                    <Group spacing="sm" justify="flex-end">
                      <Button
                        size="sm"
                        color="teal"
                        onClick={() =>
                          handleDownloadPDF(planAlimentoRef, "Plan_Alimentario.pdf")
                        }
                        >
                          Descargar Plan Alimentario
                      </Button>
                    </Group>





                  {/* tabla Plan de Ejercicio */}
              {/* Plan de Ejercicio */}
                    <Card ref={planEjercicioRef} p="md" radius="md" style={{ backgroundColor: "#000000ff" }}>
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
                              <th>Tipo / Día</th>
                              <th>Lunes</th>
                              <th>Martes</th>
                              <th>Miércoles</th>
                              <th>Jueves</th>
                              <th>Viernes</th>
                              <th>Sábado</th>
                              <th>Domingo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {["Cardio", "Fuerza", "Flexibilidad", "Movilidad"].map((exerciseType) => (
                              <tr key={exerciseType} style={{ backgroundColor: "#2a2a2a" }}>
                                <td style={{ border: "1px solid #eeff05ff", padding: "6px" }}>{exerciseType}</td>
                                {["1", "2", "3", "4", "5", "6", "7"].map((day) => {
                                  const item = planEjercicio.find(
                                    (pe) => pe.tipo === exerciseType && pe.dias === day
                                  );
                                  return (
                                    <td key={day} style={{ border: "1px solid #eeff05ff", padding: "6px" }}>
                                      {item ? item.description : "-"}
                                    </td>
                                  );
                                })}
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
                        {/* Botones descargar PDF */}
                    <Group spacing="sm" justify="flex-end">
                      <Button
                        size="sm"
                        color="teal"
                        onClick={() =>
                          handleDownloadPDF(planEjercicioRef, "Plan_Ejercicio.pdf")
                        }
                        >
                          Descargar Plan de Ejercicio
                      </Button>
                    </Group>
                  </Stack>
                )}
              </Card>
            ))}
          </Stack>
        )}
      </Container>
      <Footer />
      {/* === CARTELITO FLOTANTE WHATSAPP === */}
<div
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#000",
    border: "2px solid #EEFF05",
    padding: "12px 16px",
    borderRadius: "14px",
    boxShadow: "0 0 12px rgba(0,0,0,0.6)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "260px",
    animation: "fadeIn 0.8s ease",
  }}
>
  <Text
    style={{
      color: "#e1e0d8ff",
      fontWeight: "600",
      fontSize: "13px",
      textAlign: "center",
      marginBottom: "8px",
    }}
  >
    ¿Dudas con tu plan?{" "}
    <span style={{ color: "#EEFF05", fontWeight: "700" }}>
      Contactá a Adrián.
    </span>
  </Text>

  <Button
    component="a"
    href="https://wa.me/542346419487?text=Hola%20Adri%C3%A1n,%20tengo%20una%20consulta%20sobre%20mi%20plan"
    target="_blank"
    rel="noopener noreferrer"
    size="xs"
    radius="xl"
    style={{
      backgroundColor: "#25D366",
      color: "black",
      fontWeight: "bold",
      width: "100%",
    }}
  >
    WhatsApp
  </Button>
</div>

{/* === ANIMACIÓN CSS === */}
<style>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>

    </>
  );
}
