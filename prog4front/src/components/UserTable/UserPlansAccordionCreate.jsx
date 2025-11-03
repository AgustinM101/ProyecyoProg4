import { useState } from "react";
import { Accordion, Table, TextInput, Button, Group, Loader, Text } from "@mantine/core";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";
import { plansUserService } from "../../services/plansUserService";


export function UserPlansAccordionCreate({ pu, onPlanCreated }) {
  const [planAlimento, setPlanAlimento] = useState({});
  const [planEjercicio, setPlanEjercicio] = useState({});
  const [loading, setLoading] = useState(false);

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const tiposDefault = ["Desayuno", "Almuerzo", "Cena", "Snack"]; // puedes ajustar según tu DB
  const tiposEjercicio = ["Cardio", "Fuerza", "Flexibilidad", "Movilidad"]; // ajustar también



  
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
  const buildPayload = (plan, plansUserId) => {
    const items = [];

    dias.forEach((diaNombre, index) => {
      const contenidoDia = plan[diaNombre] || {};
      Object.entries(contenidoDia).forEach(([tipo, descripcion]) => {
        if (!descripcion || descripcion.trim() === "") return;
        items.push({
          tipo,
          descripcion,
          dia: (index + 1).toString(),
          id_plans_user: plansUserId,
        });
      });
    });

    return items;
  };

  const handleGuardar = async () => {
    setLoading(true);
    try {
      const id = pu.plans_user_id ?? pu.id;

      const alimentos = buildPayload(planAlimento, id);
      const ejercicios = buildPayload(planEjercicio, id);

      if (alimentos.length > 0) {
        await planAlimentosService.createPlan({ id_plans_user: id, items: alimentos });
      }

      if (ejercicios.length > 0) {
        await planEjerciciosService.createPlan({ id_plans_user: id, items: ejercicios });
      }

      alert("✅ Plan creado correctamente");
      onPlanCreated?.();
    } catch (e) {
      console.error(e);
      alert("❌ Error al crear el plan");
    } finally {
      setLoading(false);
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
                      handleChange(setter, plan, dia, tipo, e.currentTarget.value)
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

  if (loading) return <Loader color="orange" />;

  return (
    <Accordion variant="contained" multiple>
      <Accordion.Item value="alimentos">
        <Accordion.Control>🍗 Crear Plan de Alimentación</Accordion.Control>
        <Accordion.Panel>
          {renderTable(planAlimento, setPlanAlimento, tiposDefault)}
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="ejercicios">
        <Accordion.Control>🏋️ Crear Plan de Ejercicios</Accordion.Control>
        <Accordion.Panel>
          {renderTable(planEjercicio, setPlanEjercicio, tiposEjercicio)}
        </Accordion.Panel>
      </Accordion.Item>

      <Group mt="md" grow>
        <Button color="green" onClick={handleGuardar} loading={loading}>
          ✔ Crear Plan
        </Button>
      </Group>
    </Accordion>
  );
}
