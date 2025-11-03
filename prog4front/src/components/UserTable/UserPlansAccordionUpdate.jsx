import { useEffect, useState } from "react";
import { Accordion, Table, Text, Button, Group, Loader, Select, TextInput, Modal } from "@mantine/core";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";

export function UserPlansAccordionUpdate({ pu, onPlanUpdated }) {
  const [planAlimento, setPlanAlimento] = useState({});
  const [planEjercicio, setPlanEjercicio] = useState({});
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    tipo: "",
    dia: "Lunes",
    descripcion: "",
    planType: "alimento"
  });

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  // Transform backend data
  const transform = (items) => {
    const estructura = {};
    dias.forEach((d) => (estructura[d] = {}));
    (items || []).forEach((item) => {
      const diaIndex = Number(item.dia) - 1;
      const diaNombre = dias[diaIndex];
      if (!diaNombre) return;
      estructura[diaNombre] = estructura[diaNombre] || {};
      estructura[diaNombre][item.tipo] = {
        id: item.id,
        descripcion: item.description || ""
      };
    });
    return estructura;
  };

  // Cargar planes
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const plansUserId = pu.plans_user_id ?? pu.id;
      const [resA, resE] = await Promise.all([
        planAlimentosService.getPlanAlimentosByUser(plansUserId),
        planEjerciciosService.getPlanEjerciciosByUser(plansUserId)
      ]);
      setPlanAlimento(transform(resA?.data || []));
      setPlanEjercicio(transform(resE?.data || []));
    } catch (error) {
      console.error("Error al cargar planes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [pu]);

  // Agregar nuevo item
  const handleAgregar = async () => {
    if (!modalData.tipo || !modalData.descripcion) {
      alert("❌ Complete tipo y descripción");
      return;
    }

    try {
      const id = pu.plans_user_id ?? pu.id;
      const newItem = {
        tipo: modalData.tipo,
        descripcion: modalData.descripcion,
        dia: (dias.indexOf(modalData.dia) + 1).toString(),
        id_plans_user: id
      };

      if (modalData.planType === "alimento") {
        await planAlimentosService.createPlan(id, [newItem]);
      } else {
        await planEjerciciosService.createPlan(id, [newItem]);
      }

      setModalOpen(false);
      setModalData({ tipo: "", dia: "Lunes", descripcion: "", planType: "alimento" });
      await fetchPlans();
      onPlanUpdated?.();
    } catch (error) {
      console.error(error);
      alert("❌ Error al agregar item");
    }
  };

  // Render read-only table
  const renderTable = (plan) => {
    const tipos = new Set();
    Object.values(plan).forEach((dia) =>
      Object.keys(dia).forEach((t) => tipos.add(t))
    );

    if (tipos.size === 0) return <Text color="dimmed">No hay datos cargados aún</Text>;

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
          {[...tipos].map((tipo) => (
            <tr key={tipo}>
              <td style={{ fontWeight: "bold" }}>{tipo}</td>
              {dias.map((dia) => (
                <td key={dia}>{plan[dia]?.[tipo]?.descripcion || "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  if (loading) return <Loader color="orange" />;

  return (
    <>
      <Accordion variant="contained" multiple>
        <Accordion.Item value="alimentos">
          <Accordion.Control>🍗 Plan de Alimentación</Accordion.Control>
          <Accordion.Panel>
            {renderTable(planAlimento)}
            <Button mt="sm" onClick={() => setModalOpen(true)}>+ Agregar alimento</Button>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="ejercicios">
          <Accordion.Control>🏋️ Plan de Ejercicios</Accordion.Control>
          <Accordion.Panel>
            {renderTable(planEjercicio)}
            <Button mt="sm" onClick={() => setModalOpen(true)}>+ Agregar ejercicio</Button>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {/* Modal */}
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Agregar nuevo item">
        <Select
          label="Tipo"
          placeholder="Ingrese tipo"
          value={modalData.tipo}
          onChange={(val) => setModalData((prev) => ({ ...prev, tipo: val }))}
          data={[]} searchable creatable
          getCreateLabel={(query) => `+ Crear ${query}`}
          onCreate={(query) => setModalData((prev) => ({ ...prev, tipo: query }))}
        />
        <Select
          label="Día"
          value={modalData.dia}
          onChange={(val) => setModalData((prev) => ({ ...prev, dia: val }))}
          data={dias}
        />
        <TextInput
          label="Descripción"
          value={modalData.descripcion}
          onChange={(e) => setModalData((prev) => ({ ...prev, descripcion: e.currentTarget.value }))}
        />
        <Select
          label="Plan"
          value={modalData.planType}
          onChange={(val) => setModalData((prev) => ({ ...prev, planType: val }))}
          data={[
            { value: "alimento", label: "Alimento" },
            { value: "ejercicio", label: "Ejercicio" }
          ]}
        />
        <Group mt="md" position="right">
          <Button onClick={handleAgregar}>Agregar</Button>
        </Group>
      </Modal>
    </>
  );
}
