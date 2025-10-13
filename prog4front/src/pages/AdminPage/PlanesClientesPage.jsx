import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Group,
  Title,
  Text,
  Loader,
  Center,
  Select,
  TextInput,
  Stack,
  Badge,
} from "@mantine/core";
import { plansUserService } from "../../services/plansUserService";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";
import { AdminNavbar } from "../../components/Admin/AdminNavbar";

export function PlanesClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  // Formularios de creación/edición
  const [formAlimento, setFormAlimento] = useState({
    name: "",
    tipo: "",
    description: "",
  });
  const [formEjercicio, setFormEjercicio] = useState({
    name: "",
    tipo: "",
    description: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resClientes, resAlimentos, resEjercicios] = await Promise.all([
        plansUserService.getPlansUsers(),
        planAlimentosService.getPlans(),
        planEjerciciosService.getPlans(),
      ]);

      const clientesData = resClientes.data;
      const alimentos = resAlimentos.data;
      const ejercicios = resEjercicios.data;

      // Combinar datos de ambas tablas según id_plans_user
      const merged = clientesData.map((cliente) => {
        const planAl = alimentos.find((a) => a.id_plans_user === cliente.id);
        const planEj = ejercicios.find((e) => e.id_plans_user === cliente.id);

        return {
          id: cliente.id,
          nombre: cliente.user_name,
          planAlimento: planAl ? planAl.name : null,
          planEjercicio: planEj ? planEj.name : null,
          status: cliente.status,
        };
      });

      setClientes(merged);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenNew = (cliente) => {
    setEditMode(false);
    setSelectedCliente(cliente);
    setFormAlimento({ name: "", tipo: "", description: "" });
    setFormEjercicio({ name: "", tipo: "", description: "" });
    setOpened(true);
  };

  const handleEdit = (cliente) => {
    setEditMode(true);
    setSelectedCliente(cliente);
    setFormAlimento({
      name: cliente.planAlimento || "",
      tipo: "",
      description: "",
    });
    setFormEjercicio({
      name: cliente.planEjercicio || "",
      tipo: "",
      description: "",
    });
    setOpened(true);
  };

  const handleDelete = async (cliente) => {
    if (!confirm(`¿Eliminar los planes de ${cliente.nombre}?`)) return;
    try {
      const [alimentos, ejercicios] = await Promise.all([
        planAlimentosService.getAll(),
        planEjerciciosService.getAll(),
      ]);
      const planAl = alimentos.find((a) => a.id_plans_user === cliente.id);
      const planEj = ejercicios.find((e) => e.id_plans_user === cliente.id);

      if (planAl) await planAlimentosService.delete(planAl.id);
      if (planEj) await planEjerciciosService.delete(planEj.id);

      fetchData();
    } catch (error) {
      console.error("Error al eliminar planes:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        // PUT para actualizar
        const [alimentos, ejercicios] = await Promise.all([
          planAlimentosService.getAll(),
          planEjerciciosService.getAll(),
        ]);
        const planAl = alimentos.find((a) => a.id_plans_user === selectedCliente.id);
        const planEj = ejercicios.find((e) => e.id_plans_user === selectedCliente.id);

        if (planAl)
          await planAlimentosService.update(planAl.id, formAlimento);
        if (planEj)
          await planEjerciciosService.update(planEj.id, formEjercicio);
      } else {
        // POST para crear ambos
        await Promise.all([
          planAlimentosService.create({
            ...formAlimento,
            id_plans_user: selectedCliente.id,
          }),
          planEjerciciosService.create({
            ...formEjercicio,
            id_plans_user: selectedCliente.id,
          }),
        ]);
      }

      setOpened(false);
      fetchData();
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

  const activos = clientes.filter((c) => c.planAlimento && c.planEjercicio).length;
  const pendientes = clientes.length - activos;

  return (
    <>
    <AdminNavbar/>
    <Container size="xl" py="md">
      <Group position="apart" mb="lg">
        <Title order={2}>🧍 Planes Personalizados de Clientes</Title>
        <Button color="green" onClick={() => fetchData()}>
          🔄 Actualizar
        </Button>
      </Group>

      {clientes.length === 0 ? (
        <Text>No hay clientes registrados.</Text>
      ) : (
        <Table striped highlightOnHover withTableBorder>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Plan Alimentación</th>
              <th>Plan Ejercicio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.planAlimento || "— No asignado —"}</td>
                <td>{cliente.planEjercicio || "— No asignado —"}</td>
                <td>
                  <Badge color={cliente.planAlimento && cliente.planEjercicio ? "green" : "yellow"}>
                    {cliente.planAlimento && cliente.planEjercicio ? "Activo" : "Pendiente"}
                  </Badge>
                </td>
                <td>
                  <Group spacing="xs">
                    {cliente.planAlimento && cliente.planEjercicio ? (
                      <>
                        <Button size="xs" color="blue" onClick={() => handleEdit(cliente)}>
                          ✏️ Editar
                        </Button>
                        <Button size="xs" color="red" onClick={() => handleDelete(cliente)}>
                          🗑️ Eliminar
                        </Button>
                      </>
                    ) : (
                      <Button size="xs" color="green" onClick={() => handleOpenNew(cliente)}>
                        ➕ Crear
                      </Button>
                    )}
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Text fw={500} mt="md">
        🧮 {activos} planes activos / {pendientes} pendientes
      </Text>

      {/* Modal de creación/edición */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={editMode ? "Editar Plan" : "Nuevo Plan"}
        centered
      >
        <Stack>
          <Text fw={500}>Cliente: {selectedCliente?.nombre}</Text>

          <Title order={5}>🥗 Plan de Alimentación</Title>
          <TextInput
            label="Nombre"
            value={formAlimento.name}
            onChange={(e) => setFormAlimento({ ...formAlimento, name: e.currentTarget.value })}
          />
          <TextInput
            label="Tipo"
            value={formAlimento.tipo}
            onChange={(e) => setFormAlimento({ ...formAlimento, tipo: e.currentTarget.value })}
          />
          <TextInput
            label="Descripción"
            value={formAlimento.description}
            onChange={(e) => setFormAlimento({ ...formAlimento, description: e.currentTarget.value })}
          />

          <Title order={5} mt="sm">🏋️ Plan de Ejercicio</Title>
          <TextInput
            label="Nombre"
            value={formEjercicio.name}
            onChange={(e) => setFormEjercicio({ ...formEjercicio, name: e.currentTarget.value })}
          />
          <TextInput
            label="Tipo"
            value={formEjercicio.tipo}
            onChange={(e) => setFormEjercicio({ ...formEjercicio, tipo: e.currentTarget.value })}
          />
          <TextInput
            label="Descripción"
            value={formEjercicio.description}
            onChange={(e) => setFormEjercicio({ ...formEjercicio, description: e.currentTarget.value })}
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
    </>
  );
}
