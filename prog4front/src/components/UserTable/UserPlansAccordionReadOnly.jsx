import { useEffect, useState } from "react";
import { Accordion, Table, Loader, Text } from "@mantine/core";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";

export function UserPlansAccordionReadOnly({ pu }) {
  const [planAlimento, setPlanAlimento] = useState({});
  const [planEjercicio, setPlanEjercicio] = useState({});
  const [loading, setLoading] = useState(true);

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansUserId = pu.plans_user_id ?? pu.id;

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
  }, [pu]);

  if (loading) return <Loader size="sm" color="orange" />;

  /** ✅ TABLA DINÁMICA — se arma según lo que venga desde DB */
  const renderDynamicTable = (plan) => {
    const tiposUnicos = new Set();

    Object.values(plan).forEach((dia) => {
      Object.keys(dia).forEach((tipo) => tiposUnicos.add(tipo));
    });

    if (tiposUnicos.size === 0)
      return <Text color="dimmed">No hay datos disponibles</Text>;

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
          {[...tiposUnicos].map((tipo) => (
            <tr key={tipo}>
              <td style={{ fontWeight: "bold" }}>{tipo}</td>
              {dias.map((dia) => (
                <td key={dia}>{plan[dia]?.[tipo] || "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Accordion variant="contained" multiple>
      <Accordion.Item value="alimentos">
        <Accordion.Control>🍗 Plan de Alimentación</Accordion.Control>
        <Accordion.Panel>
          {renderDynamicTable(planAlimento)}
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="ejercicios">
        <Accordion.Control>🏋️ Plan de Ejercicios</Accordion.Control>
        <Accordion.Panel>
          {renderDynamicTable(planEjercicio)}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
