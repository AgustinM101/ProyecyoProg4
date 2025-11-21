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
  Divider,
  Accordion,
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import { plansFormService } from "../../services/plansFormService";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";
import { plansUserService } from "../../services/plansUserService";
import { userService } from "../../services/userService";
import "./MyPlansPage.css";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const MEALS = ["Desayuno", "Almuerzo", "Merienda", "Cena", "Colaciones"];

export function MyPlansPage() {
  const [user, setUser] = useState(null);
  const [plansUsers, setPlansUsers] = useState([]);

  // ahora manejamos datos por planId
  const [formDataByPlan, setFormDataByPlan] = useState({});
  const [alimentosByPlan, setAlimentosByPlan] = useState({});
  const [ejerciciosByPlan, setEjerciciosByPlan] = useState({});

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const loadPlanDetails = async (planId, userId) => {
    try {
      const [formResp, alimentoResp, ejercicioResp] = await Promise.all([
        plansFormService.getPlansFormsByUser(userId),
        planAlimentosService.getPlanAlimentosByUser(planId),
        planEjerciciosService.getPlanEjerciciosByUser(planId),
      ]);
      return {
        planId,
        form: formResp?.data?.[0] ?? null,
        alimentos: alimentoResp?.data ?? [],
        ejercicios: ejercicioResp?.data ?? [],
      };
    } catch (err) {
      console.error("Error cargando detalles para plan:", planId, err);
      return { planId, form: null, alimentos: [], ejercicios: [] };
    }
  };

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const userResp = await userService.getCurrentUser();
      const currentUser = userResp?.data;
      if (!currentUser) throw new Error("No hay usuario logueado");

      setUser(currentUser);
      const resp = await plansUserService.getByUserId(currentUser.id);
      const raw = resp?.data ?? [];

      // normalizar y forzar ids numéricos
      const normalized = raw.map((pu) => ({
        ...pu,
        id: Number(pu.id ?? pu.plans_user_id ?? pu.plansUserId ?? null),
        id_user: Number(pu.id_user ?? pu.user_id ?? currentUser.id ?? null),
        plan_name: pu.plan_name ?? pu.name ?? "-",
        expiration_date: pu.expiration_date ?? pu.expirationDate ?? null,
        status: pu.status ?? pu.state ?? "inactive",
      }));

      setPlansUsers(normalized);

      // cargar detalles en paralelo para cada plan
      const details = await Promise.all(
        normalized.map((p) => loadPlanDetails(p.id, p.id_user ?? currentUser.id))
      );

      const formsMap = {};
      const alimentosMap = {};
      const ejerciciosMap = {};

      details.forEach((d) => {
        formsMap[d.planId] = d.form;
        alimentosMap[d.planId] = d.alimentos;
        ejerciciosMap[d.planId] = d.ejercicios;
      });

      setFormDataByPlan(formsMap);
      setAlimentosByPlan(alimentosMap);
      setEjerciciosByPlan(ejerciciosMap);
    } catch (error) {
      console.error("Error al cargar los planes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    console.log("Datos guardados:", formDataByPlan);
    setIsEditing(false);
  };

  /* -------------------------
     Helpers: map alimentos -> matriz 7x5 (sin cambios)
     ------------------------- */
  const buildMealsMatrix = (alimentos) => {
    const matrix = {};
    DAYS.forEach((d) => {
      matrix[d] = {};
      MEALS.forEach((m) => (matrix[d][m] = ""));
    });

    const notes = [];

    alimentos.forEach((item) => {
      const raw = JSON.stringify(item).toLowerCase();
      let dayFound = null;
      for (const d of DAYS) {
        if (
          raw.includes(d.toLowerCase()) ||
          (item.dias && String(item.dias).toLowerCase().includes(d.toLowerCase()))
        ) {
          dayFound = d;
          break;
        }
      }

      let mealFound = null;
      const possibleMeal = (item.meal || item.tipo || item.mealType || "").toString();
      for (const m of MEALS) {
        if (possibleMeal.toLowerCase().includes(m.toLowerCase())) {
          mealFound = m;
          break;
        }
        if (raw.includes(m.toLowerCase())) {
          mealFound = m;
          break;
        }
      }

      if (!dayFound && item.dias) {
        const parts = String(item.dias).split(/[,;|\/]/).map((p) => p.trim());
        for (const p of parts) {
          for (const d of DAYS) {
            if (p.toLowerCase().includes(d.toLowerCase())) {
              dayFound = d;
              break;
            }
          }
          if (dayFound) break;
        }
      }

      const content = item.description || item.descripcion || item.content || JSON.stringify(item);

      if (dayFound && mealFound) {
        matrix[dayFound][mealFound] = matrix[dayFound][mealFound]
          ? matrix[dayFound][mealFound] + " / " + content
          : content;
      } else if (dayFound && !mealFound) {
        matrix[dayFound]["Colaciones"] = matrix[dayFound]["Colaciones"]
          ? matrix[dayFound]["Colaciones"] + " / " + content
          : content;
      } else if (!dayFound && mealFound) {
        DAYS.forEach((d) => {
          matrix[d][mealFound] = matrix[d][mealFound]
            ? matrix[d][mealFound] + " / " + content
            : content;
        });
      } else {
        notes.push(content);
      }
    });

    return { matrix, notes };
  };

  /* -------------------------
     Helpers: build exercises table rows (sin cambios)
     ------------------------- */
  const buildExerciseRows = (exercises) => {
    const rows = [];
    const notes = [];

    exercises.forEach((item) => {
      const day = item.day || item.dia || item.dias || item.dia_semana || null;
      const exercise =
        item.exercise ||
        item.nombre ||
        item.tipo ||
        item.descripcion ||
        item.name ||
        item.activity ||
        item.title ||
        item.description ||
        "";
      const series = item.series || item.sets || item.serie || "";
      const reps = item.reps || item.repeticiones || item.rep || "";
      const note = item.notes || item.nota || "";

      let matchedDay = null;
      if (day) {
        const ds = String(day).split(/[,;|\/]/).map((s) => s.trim());
        for (const d of ds) {
          for (const cand of DAYS) {
            if (d.toLowerCase().includes(cand.toLowerCase())) {
              matchedDay = cand;
              break;
            }
          }
          if (matchedDay) break;
        }
        if (!matchedDay && ds.length === 1 && ds[0].length > 0) matchedDay = ds[0];
      }

      if (matchedDay || exercise) {
        rows.push({
          day: matchedDay || "—",
          exercise: exercise || "—",
          series: series || "—",
          reps: reps || "—",
          note: note || "",
        });
      } else {
        notes.push(JSON.stringify(item));
      }
    });

    return { rows, notes };
  };

  /* -------------------------
     PDF Export helper (sin cambios)
     ------------------------- */
  const exportElementToPdf = async (selectorOrElement, filename = "document.pdf") => {
    try {
      const originalEl =
        typeof selectorOrElement === "string"
          ? document.getElementById(selectorOrElement)
          : selectorOrElement;

      if (!originalEl) {
        alert("No se encontró el elemento para exportar.");
        return;
      }

      const clone = originalEl.cloneNode(true);
      clone.classList.add("pdf-export");
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth - 20;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let position = 10;

      if (imgHeight <= pageHeight - 20) {
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      } else {
        let renderedHeight = 0;
        let pageCanvas = document.createElement("canvas");
        const ratio = canvas.width / imgProps.width;
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.floor((pageHeight - 20) * ratio);

        const ctx = pageCanvas.getContext("2d");

        while (renderedHeight < canvas.height) {
          ctx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(
            canvas,
            0,
            renderedHeight,
            pageCanvas.width,
            pageCanvas.height,
            0,
            0,
            pageCanvas.width,
            pageCanvas.height
          );

          const pageData = pageCanvas.toDataURL("image/png");
          const pageImgProps = pdf.getImageProperties(pageData);
          const pageImgHeight = (pageImgProps.height * imgWidth) / pageImgProps.width;

          if (pdf.internal.getNumberOfPages() > 0) pdf.addPage();
          pdf.addImage(pageData, "PNG", 10, 10, imgWidth, pageImgHeight);

          renderedHeight += pageCanvas.height;
        }
      }

      pdf.save(filename);
      document.body.removeChild(clone);
    } catch (err) {
      console.error("Error exportando a PDF:", err);
      alert("Ocurrió un error al generar el PDF.");
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

      <Title ta="center" mb="xl" style={{ color: "white" }}>
        Mi ficha clínica y planes personalizados
      </Title>

      {plansUsers.length === 0 ? (
        <Text ta="center" style={{ color: "white" }}>
          No tenés planes activos actualmente.
        </Text>
      ) : (
        <Stack spacing="md">
          {plansUsers.map((plan) => {
            const formData = formDataByPlan[plan.id];
            const planAlimento = alimentosByPlan[plan.id] || [];
            const planEjercicio = ejerciciosByPlan[plan.id] || [];

            return (
              <Card
                key={plan.id}
                shadow="xl"
                p="xl"
                radius="lg"
                withBorder
                style={{
                  backgroundColor: "#000000",
                  color: "white",
                  border: "1px solid #EEFF05",
                }}
              >
                <Group justify="space-between">
                  <div>
                    <Title order={4} style={{ color: "white" }}>
                      {plan.plan_name}
                    </Title>
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


                {/* Mostrar detalles directamente sin botón */}
                <Stack mt="md" spacing="md">
                  {/* FICHA CLÍNICA PREMIUM */}
                  <Card
                    p="lg"
                    radius="md"
                    id={`ficha-${plan.id}`}
                    style={{ backgroundColor: "#000", border: "2px solid #EEFF05" }}
                  >
                    <Title order={4} mb="sm" style={{ color: "#EEFF05", fontWeight: "bold", textTransform: "uppercase" }}>
                      FICHA CLÍNICA
                    </Title>

                    <Divider color="#EEFF05" my="xs" />
                    {formData ? (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: 12 }}>
                        <TextInput label="Nombre" value={formData.nombre} disabled />
                        <TextInput label="Edad" value={formData.edad} disabled />
                        <TextInput label="Sexo" value={formData.sexo} disabled />
                        <TextInput label="Altura (m)" value={formData.altura} disabled />
                        <TextInput label="Peso actual" value={formData.peso_actual} disabled />
                        <TextInput label="Peso deseado" value={formData.peso_deseado} disabled />
                        <Textarea label="Actividad física" value={formData.actividad_fisica} disabled autosize />
                        <Textarea label="Comidas diarias" value={formData.comidas_diarias} disabled autosize />
                        <Textarea label="Alergias" value={formData.alergias} disabled autosize />
                        <Textarea label="Medicamentos" value={formData.medicamentos} disabled autosize />
                        <Textarea label="Problemas digestivos" value={formData.problemas_digestivos} disabled autosize />
                        <TextInput label="Consumo de agua" value={formData.consumo_agua} disabled />
                        <TextInput label="Consumo de alcohol" value={formData.consumo_alcohol} disabled />
                        <Textarea label="Antecedentes médicos" value={formData.antecedentes_medicos} disabled autosize minRows={3} />
                        <TextInput label="Fecha de registro" value={formData.fecha_registro ? new Date(formData.fecha_registro).toLocaleDateString() : "-"} disabled />
                      </div>
                    ) : (
                      <Text>No hay datos cargados.</Text>
                    )}
                  </Card>

                  {/* ACORDEON: PLAN ALIMENTARIO */}
                  <Accordion
                    radius="md"
                    variant="separated"
                    color="black"
                    styles={{
                      item: { backgroundColor: "#000", border: "1px solid #000", marginBottom: 12 },
                      control: { color: "#000", fontWeight: "700" },
                      content: { backgroundColor: "#000" },
                    }}
                  >
                    <Accordion.Item value={`alimentos-${plan.id}`}>
                      <Accordion.Control>Plan Alimentario</Accordion.Control>
                      <Accordion.Panel>
                        <Group position="right" style={{ marginBottom: 8 }}>
                          <Button
                            leftIcon={<IconDownload size={16} />}
                            size="xs"
                            onClick={() =>
                              exportElementToPdf(`alimentos-pdf-${plan.id}`, `${plan.plan_name || "plan-alimentario"}.pdf`)
                            }
                            className="btn-download"
                          >
                            Descargar PDF
                          </Button>
                        </Group>

                        <div id={`alimentos-pdf-${plan.id}`} className="pdf-capture-root">
                          {(() => {
                            const { matrix, notes } = buildMealsMatrix(planAlimento || []);
                            return (
                              <>
                                <div className="meals-table-wrap">
                                  <table className="meals-table">
                                    <thead>
                                      <tr>
                                        <th>Día</th>
                                        {MEALS.map((m) => (
                                          <th key={m}>{m}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {DAYS.map((d) => (
                                        <tr key={d}>
                                          <td className="day-cell">{d}</td>
                                          {MEALS.map((m) => (
                                            <td key={m} className="meal-cell">
                                              {matrix[d][m] ? matrix[d][m] : <span className="empty-cell">—</span>}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>

                                {notes.length > 0 && (
                                  <Card mt="sm" p="sm" radius="md" style={{ backgroundColor: "#000", border: "1px dashed rgba(238,255,5,0.12)" }}>
                                    <Text size="sm" style={{ color: "#000", fontWeight: 700 }}>Notas / ítems no ubicados automáticamente</Text>
                                    <Stack mt="xs">
                                      {notes.map((n, i) => (
                                        <Text key={i} size="sm" style={{ color: "#fff" }}>{n}</Text>
                                      ))}
                                    </Stack>
                                  </Card>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>

                    {/* ACORDEON: PLAN EJERCICIO */}
                    <Accordion.Item value={`ejercicio-${plan.id}`}>
                      <Accordion.Control>Plan de Ejercicio</Accordion.Control>
                      <Accordion.Panel>
                        <Group position="right" style={{ marginBottom: 8 }}>
                          <Button
                            leftIcon={<IconDownload size={16} />}
                            size="xs"
                            onClick={() =>
                              exportElementToPdf(`ejercicio-pdf-${plan.id}`, `${plan.plan_name || "plan-ejercicio"}.pdf`)
                            }
                            className="btn-download"
                          >
                            Descargar PDF
                          </Button>
                        </Group>

                        <div id={`ejercicio-pdf-${plan.id}`} className="pdf-capture-root">
                          {(() => {
                            const { rows, notes } = buildExerciseRows(planEjercicio || []);
                            return (
                              <>
                                {rows.length > 0 ? (
                                  <div className="ex-table-wrap">
                                    <table className="ex-table">
                                      <thead>
                                        <tr>
                                          <th>Día</th>
                                          <th>Ejercicio</th>
                                          <th>Series</th>
                                          <th>Repeticiones</th>
                                          <th>Notas</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {rows.map((r, idx) => (
                                          <tr key={idx}>
                                            <td className="day-cell">{r.day}</td>
                                            <td>{r.exercise}</td>
                                            <td>{r.series}</td>
                                            <td>{r.reps}</td>
                                            <td>{r.note || "—"}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                ) : (
                                  <Text>No hay rutina cargada.</Text>
                                )}

                                {notes.length > 0 && (
                                  <Card mt="sm" p="sm" radius="md" style={{ backgroundColor: "#000", border: "1px dashed rgba(238,255,5,0.12)" }}>
                                    <Text size="sm" style={{ color: "#000", fontWeight: 700 }}>Notas / ítems no ubicados automáticamente</Text>
                                    <Stack mt="xs">
                                      {notes.map((n, i) => (
                                        <Text key={i} size="sm" style={{ color: "#fff" }}>{n}</Text>
                                      ))}
                                    </Stack>
                                  </Card>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      )}

      <Footer />
    </>
  );
}