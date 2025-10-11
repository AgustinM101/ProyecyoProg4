import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  TextInput,
  Textarea,
  NumberInput,
  Group,
  Title,
  Text,
  Loader,
  Center,
  Badge,
  Stack,
} from "@mantine/core";
import { plansService } from "../../services/plansService";

export function PlanesGenericosPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Obtener planes del backend
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await plansService.getPlans();
      setPlans(response.data);
    } catch (error) {
      console.error("Error al obtener planes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleOpenNew = () => {
    setEditMode(false);
    setFormData({ name: "", description: "", price: "" });
    setOpened(true);
  };

  const handleEdit = (plan) => {
    setEditMode(true);
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      price: plan.price,
    });
    setOpened(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este plan?")) return;
    try {
      await plansService.deletePlan(id);
      fetchPlans();
    } catch (error) {
      console.error("Error al eliminar plan:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editMode && selectedPlan) {
        await plansService.updatePlan(selectedPlan.id, formData);
      } else {
        await plansService.createPlan(formData);
      }
      setOpened(false);
      fetchPlans();
    } catch (error) {
      console.error("Error al guardar plan:", error);
    }
  };

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader />
      </Center>
    );
  }

  const totalActivos = plans.filter((p) => !p.deleted).length;
  const totalEliminados = plans.filter((p) => p.deleted).length;

  return (
    <Container size="lg" py="md">
      <Group position="apart" mb="lg">
        <Title order={2}>📦 Planes Genéricos</Title>
        <Button onClick={handleOpenNew} color="green">
          + Nuevo Plan
        </Button>
      </Group>

      {plans.length === 0 ? (
        <Text>No hay planes creados.</Text>
      ) : (
        <Table striped highlightOnHover withTableBorder>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.id}</td>
                <td>{plan.name}</td>
                <td>{plan.description}</td>
                <td>${plan.price}</td>
                <td>
                  <Badge color={plan.deleted ? "red" : "green"}>
                    {plan.deleted ? "Eliminado" : "Activo"}
                  </Badge>
                </td>
                <td>
                  <Group spacing="xs">
                    <Button size="xs" color="blue" onClick={() => handleEdit(plan)}>
                      ✏️ Editar
                    </Button>
                    <Button size="xs" color="red" onClick={() => handleDelete(plan.id)}>
                      🗑️ Eliminar
                    </Button>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Stack mt="md">
        <Text fw={500}>
          🧮 Total Planes: {totalActivos} activos / {totalEliminados} eliminados
        </Text>
      </Stack>

      {/* Modal para crear/editar */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={editMode ? "Editar Plan" : "Nuevo Plan"}
        centered
      >
        <Stack>
          <TextInput
            label="Nombre"
            placeholder="Ej: Plan Avanzado"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.currentTarget.value })
            }
          />

          <Textarea
            label="Descripción"
            placeholder="Ej: Rutina + Nutrición personalizada"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.currentTarget.value })
            }
          />

          <NumberInput
            label="Precio"
            placeholder="Ej: 20000"
            value={formData.price}
            onChange={(val) => setFormData({ ...formData, price: val })}
          />

          <Group position="right" mt="md">
            <Button variant="light" onClick={() => setOpened(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} color="blue">
              Guardar
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
