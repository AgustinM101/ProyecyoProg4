<<<<<<< HEAD
// components/UserTable/UserPlansAccordion.jsx
import React, { useState, useEffect } from "react";
import { Accordion, Table, TextInput, Button, Group } from "@mantine/core";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";

export function UserPlansAccordion({ pu }) {
  const [planAlimento, setPlanAlimento] = useState({});
  const [planEjercicio, setPlanEjercicio] = useState({});
  const [loading, setLoading] = useState(false);

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const comidas = ["Desayuno", "Almuerzo", "Merienda", "Cena"];
  const tiposEjercicio = ["Fuerza", "Cardio", "Flexibilidad", "Descanso"];

  // 🔹 Si el status es "activo", se cargan los planes existentes
  useEffect(() => {
    const fetchPlanes = async () => {
      if (pu.status !== "activo") return;
      setLoading(true);
      try {
        const [planAl, planEj] = await Promise.all([
          planAlimentosService.getByUser(pu.id),
          planEjerciciosService.getByUser(pu.id),
        ]);
        setPlanAlimento(planAl?.plan || {});
        setPlanEjercicio(planEj?.plan || {});
      } catch (error) {
        console.error("❌ Error al obtener los planes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanes();
  }, [pu]);

  const handleAlimentoChange = (dia, comida, value) => {
    setPlanAlimento((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [comida]: value },
    }));
  };

  const handleEjercicioChange = (dia, tipo, value) => {
    setPlanEjercicio((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [tipo]: value },
    }));
  };

  const handleGuardarPlanes = async () => {
    setLoading(true);
    try {
      if (pu.status === "pendiente_carga") {
        // 🔹 Si el plan aún no existe → crear
        await Promise.all([
          planAlimentosService.createPlan({
            plans_user_id: pu.id,
            plan: planAlimento,
          }),
          planEjerciciosService.createPlan({
            plans_user_id: pu.id,
            plan: planEjercicio,
          }),
        ]);
        alert("✅ Planes creados correctamente");
      } else if (pu.status === "activo") {
        // 🔹 Si el plan ya existe → actualizar
        await Promise.all([
          planAlimentosService.updatePlan({
            plans_user_id: pu.id,
            plan: planAlimento,
          }),
          planEjerciciosService.updatePlan({
            plans_user_id: pu.id,
            plan: planEjercicio,
          }),
        ]);
        alert("✅ Planes actualizados correctamente");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar los planes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion variant="contained" multiple>
      {/* PLAN ALIMENTO */}
      <Accordion.Item value="alimentos">
        <Accordion.Control>🍗 Plan de Alimentación</Accordion.Control>
        <Accordion.Panel>
          <Table striped withBorder>
            <thead>
              <tr>
                <th>Comida</th>
                {dias.map((dia) => (
                  <th key={dia}>{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comidas.map((comida) => (
                <tr key={comida}>
                  <td style={{ fontWeight: "bold" }}>{comida}</td>
                  {dias.map((dia) => (
                    <td key={dia}>
                      <TextInput
                        placeholder={`${comida} (${dia})`}
                        size="xs"
                        value={planAlimento[dia]?.[comida] || ""}
                        onChange={(e) =>
                          handleAlimentoChange(dia, comida, e.currentTarget.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Accordion.Panel>
      </Accordion.Item>

      {/* PLAN EJERCICIO */}
      <Accordion.Item value="ejercicios">
        <Accordion.Control>🏋️ Plan de Ejercicios</Accordion.Control>
        <Accordion.Panel>
          <Table striped withBorder>
            <thead>
              <tr>
                <th>Tipo</th>
                {dias.map((dia) => (
                  <th key={dia}>{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tiposEjercicio.map((tipo) => (
                <tr key={tipo}>
                  <td style={{ fontWeight: "bold" }}>{tipo}</td>
                  {dias.map((dia) => (
                    <td key={dia}>
                      <TextInput
                        placeholder={`${tipo} (${dia})`}
                        size="xs"
                        value={planEjercicio[dia]?.[tipo] || ""}
                        onChange={(e) =>
                          handleEjercicioChange(dia, tipo, e.currentTarget.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Accordion.Panel>
      </Accordion.Item>

      <Group mt="md" grow>
        <Button color="green" onClick={handleGuardarPlanes} loading={loading}>
          {loading ? "Guardando..." : pu.status === "activo" ? "Actualizar Planes" : "Guardar Planes"}
        </Button>
      </Group>
    </Accordion>
  );
=======
import { useEffect, useState } from "react";
import {
    Accordion,
    Table,
    TextInput,
    Button,
    Group,
    Loader,
} from "@mantine/core";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";

export function UserPlansAccordion({ action, plansUserId, onFinish }) {
    const [loading, setLoading] = useState(false);
    const [planAlimento, setPlanAlimento] = useState({});
    const [planEjercicio, setPlanEjercicio] = useState({});

    const dias = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];
    const tiposAlimento = ["Desayuno", "Almuerzo", "Cena", "Snack"];
    const tiposEjercicio = ["Cardio", "Fuerza", "Flexibilidad", "Movilidad"];

    // ✅ Manejo de cambios inline
    const handleChange = (setter, plan, dia, tipo, value) => {
        setter({
            ...plan,
            [dia]: {
                ...plan[dia],
                [tipo]: value,
            },
        });
    };

    // ✅ Generar payload para POST
    const buildPayload = (plan) => {
        const items = [];

        dias.forEach((diaNombre, index) => {
            const contenidoDia = plan[diaNombre] || {};
            Object.entries(contenidoDia).forEach(([tipo, descripcion]) => {
                if (!descripcion || descripcion.trim() === "") return;
                items.push({
                    tipo,
                    descripcion,
                    dia: (index + 1).toString(),
                });
            });
        });

        return items;
    };

    const [saving, setSaving] = useState(false);
    const handleGuardar = async () => {
        setSaving(true);
        try {
            const alimentos = buildPayload(planAlimento);
            const ejercicios = buildPayload(planEjercicio);

            const promises = [];

            if (action === "create" && alimentos.length > 0) {
                promises.push(
                    planAlimentosService.createPlan({
                        id_plans_user: plansUserId,
                        items: alimentos,
                    })
                );
            } else if (action === "update") {
                promises.push(
                    planAlimentosService.updatePlan({
                        id_plans_user: plansUserId,
                        items: alimentos,
                    })
                );
            }

            if (action === "create" && ejercicios.length > 0) {
                promises.push(
                    planEjerciciosService.createPlan({
                        id_plans_user: plansUserId,
                        items: ejercicios,
                    })
                );
            } else if (action === "update") {
                promises.push(
                    planEjerciciosService.updatePlan({
                        id_plans_user: plansUserId,
                        items: ejercicios,
                    })
                );
            }

            // Ejecutar ambos al mismo tiempo
            await Promise.all(promises);

            alert("✅ Plan actualizado correctamente");
            onFinish?.();
        } catch (e) {
            console.error(e);
            alert("❌ Error al actualizar el plan");
        } finally {
            setSaving(false);
        }
    };

    // ✅ Render table editable
    const renderTable = (plan, setter, tipos) => {
        return (
            <Table striped withBorder>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        {dias.map((dia) => (
                            <th key={dia}>{dia}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tipos.map((tipo) => (
                        <tr key={tipo}>
                            <td style={{ fontWeight: "bold" }}>{tipo}</td>
                            {dias.map((dia) => (
                                <td key={dia}>
                                    <TextInput
                                        size="xs"
                                        placeholder={`${tipo} - ${dia}`}
                                        value={plan[dia]?.[tipo] || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                setter,
                                                plan,
                                                dia,
                                                tipo,
                                                e.currentTarget.value
                                            )
                                        }
                                        readOnly={
                                            action !== "create" &&
                                            action !== "update"
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    };

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setLoading(true);
                const [resA, resE] = await Promise.all([
                    planAlimentosService.getPlanAlimentosByUser(plansUserId),
                    planEjerciciosService.getPlanEjerciciosByUser(plansUserId),
                ]);

                const capitalize = (str) =>
                    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

                const transform = (items) => {
                    const estructura = {};
                    dias.forEach((d) => (estructura[d] = {}));

                    (items || []).forEach((item) => {
                        const diaIndex = Number(item.dias) - 1;
                        const diaNombre = dias[diaIndex];
                        if (!diaNombre) return;

                        const tipoKey = capitalize(item.tipo.trim());
                        estructura[diaNombre][tipoKey] = item.description;
                    });

                    return estructura;
                };

                setPlanAlimento(transform(resA?.data || []));
                setPlanEjercicio(transform(resE?.data || []));
            } catch (error) {
                console.error("Error al traer planes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plansUserId]);

    if (loading) return <Loader color="orange" />;

    return (
        <Accordion variant="contained" multiple>
            <Accordion.Item value="alimentos">
                <Accordion.Control>🍗 Plan de Alimentación</Accordion.Control>
                <Accordion.Panel>
                    {renderTable(planAlimento, setPlanAlimento, tiposAlimento)}
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="ejercicios">
                <Accordion.Control>🏋️ Plan de Ejercicios</Accordion.Control>
                <Accordion.Panel>
                    {renderTable(
                        planEjercicio,
                        setPlanEjercicio,
                        tiposEjercicio
                    )}
                </Accordion.Panel>
            </Accordion.Item>

            {action === "create" || action === "update" ? (
                <Group mt="md" grow>
                    <Button
                        color="green"
                        onClick={handleGuardar}
                        loading={saving}
                    >
                        ✔ {action === "create" ? "Crear" : "Guardar"} plan
                    </Button>
                </Group>
            ) : null}
        </Accordion>
    );
>>>>>>> b8a5ec992ad9b8834b68e33b905f724b0cf2072e
}
