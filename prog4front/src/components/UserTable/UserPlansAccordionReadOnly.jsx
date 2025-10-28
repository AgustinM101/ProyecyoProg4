// components/UserTable/UserPlansAccordionReadOnly.jsx
import React, { useEffect, useState } from "react";
import { Accordion, Table, Loader, Text } from "@mantine/core";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";

export function UserPlansAccordionReadOnly({ pu }) {
  const [planAlimento, setPlanAlimento] = useState({});
  const [planEjercicio, setPlanEjercicio] = useState({});
  const [loading, setLoading] = useState(true);

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const comidas = ["Desayuno", "Almuerzo", "Merienda", "Cena"];
  const tiposEjercicio = ["Fuerza", "Cardio", "Flexibilidad", "Descanso"];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansUserId = pu.plans_user_id ?? pu.id;
        const [resA, resE] = await Promise.all([
          planAlimentosService.getByPlansUserId(plansUserId),
          planEjerciciosService.getByPlansUserId(plansUserId),
        ]);

        // Si vienen como objetos con una propiedad 'plan', accedemos a ella
        setPlanAlimento(resA?.data?.plan || {});
        setPlanEjercicio(resE?.data?.plan || {});
      } catch (error) {
        console.error("Error al traer planes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [pu]);

  if (loading) return <Loader size="sm" color="orange" />;

  const renderTable = (plan, filas, tipoPlan) => (
    <Table striped withBorder>
      <thead>
        <tr>
          <th>{tipoPlan === "alimento" ? "Comida" : "Tipo"}</th>
          {dias.map((dia) => (
            <th key={dia}>{dia}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filas.map((tipo) => (
          <tr key={tipo}>
            <td style={{ fontWeight: "bold" }}>{tipo}</td>
            {dias.map((dia) => (
              <td key={dia}>
                {plan[dia]?.[tipo] || "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Accordion variant="contained" multiple>
      {/* Plan de Alimentos */}
      <Accordion.Item value="alimentos">
        <Accordion.Control>🍗 Plan de Alimentación</Accordion.Control>
        <Accordion.Panel>
          {Object.keys(planAlimento).length > 0
            ? renderTable(planAlimento, comidas, "alimento")
            : <Text color="dimmed">No hay plan de alimentos</Text>}
        </Accordion.Panel>
      </Accordion.Item>

      {/* Plan de Ejercicios */}
      <Accordion.Item value="ejercicios">
        <Accordion.Control>🏋️ Plan de Ejercicios</Accordion.Control>
        <Accordion.Panel>
          {Object.keys(planEjercicio).length > 0
            ? renderTable(planEjercicio, tiposEjercicio, "ejercicio")
            : <Text color="dimmed">No hay plan de ejercicios</Text>}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
