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
}
