import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Loader,
  Center,
  Text,
  Pagination,
  TextInput,
  Group,
  Button,
  Modal,
  Select,
  Stack,
  Accordion,
  Textarea,
} from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { plansUserService } from "../../services/plansUserService";
import { UserTable } from "../../components/UserTable/UserTable";
import "./ClientesPage.css";
import { AdminNavbar } from "../../components/Admin/AdminNavbar";

export function ClientesPage() {
  const [plansUsers, setPlansUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [planAlimento, setPlanAlimento] = useState([]);
  const [planEjercicio, setPlanEjercicio] = useState([]);

  const itemsPerPage = 5;

  const fetchPlansUsers = async () => {
    setLoading(true);
    try {
      const response = await plansUserService.getPlansUsers();
      setPlansUsers(response.data);
    } catch (error) {
      console.error("Error al traer usuarios con planes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlansUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return plansUsers.filter(
      (pu) =>
        pu.user_name?.toLowerCase().includes(search.toLowerCase()) ||
        pu.user_email?.toLowerCase().includes(search.toLowerCase()) ||
        pu.plan_name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [plansUsers, search]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, page]);

  const formattedUsers = useMemo(() => {
    return paginatedUsers.map((pu) => ({
      id: pu.id,
      user: { id: pu.id_user, name: pu.user_name, email: pu.user_email },
      plan: { id: pu.id_plan, name: pu.plan_name, price: pu.plan_price ?? 0 },
      status: pu.status?.toLowerCase(),
      expiration_date: pu.expiration_date,
    }));
  }, [paginatedUsers]);

  const handleEdit = async (user) => {
    setSelectedUser(user);
    setEditModal(true);

    // Cargar planes personalizados
    try {
      const resAlimento = await fetch(`http://localhost/userPlanAlimentos?id=${user.id}`);
      const dataAlimento = await resAlimento.json();
      setPlanAlimento(Array.isArray(dataAlimento) ? dataAlimento : [dataAlimento]);

      const resEjercicio = await fetch(`http://localhost/userPlanEjercicios?id=${user.id}`);
      const dataEjercicio = await resEjercicio.json();
      setPlanEjercicio(Array.isArray(dataEjercicio) ? dataEjercicio : [dataEjercicio]);
    } catch (error) {
      console.error("Error al cargar planes personalizados:", error);
      setPlanAlimento([]);
      setPlanEjercicio([]);
    }
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      // Actualizar estado y fecha de expiración del usuario
      await plansUserService.updatePlan(selectedUser.id, {
        status: selectedUser.status,
        expiration_date: selectedUser.expiration_date,
      });

      // ✅ Opcional: aquí podrías hacer requests para actualizar los planes de alimentos/ejercicios si tu API lo permite
      // por ejemplo: actualizarPlanAlimento(planAlimento) y actualizarPlanEjercicio(planEjercicio)

      setEditModal(false);
      fetchPlansUsers();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await plansUserService.deletePlan(selectedUser.id);
      setDeleteModal(false);
      fetchPlansUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader />
      </Center>
    );
  }

  return (
    <>

    {/* Navbar */}
        <AdminNavbar />
  <div className="admin-page"> 
    <Container size="lg" py="md">
      <Group position="apart" mb="md">
        <Text size="xl" fw={700}>
          Admin - Usuarios con Planes
        </Text>
        <TextInput
          placeholder="Buscar por usuario o plan"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Group>

      {filteredUsers.length === 0 ? (
        <Center>
          <Text>No hay resultados</Text>
        </Center>
      ) : (
        <>
          <UserTable
            users={formattedUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Center mt="md">
            <Pagination
              page={page}
              onChange={setPage}
              total={Math.ceil(filteredUsers.length / itemsPerPage)}
            />
          </Center>
        </>
      )}

      {/* Modal de edición */}
      <Modal
        opened={editModal}
        onClose={() => setEditModal(false)}
        title="Editar Usuario"
        centered
      >
        {selectedUser && (
          <Stack>
            <Select
              label="Estado"
              value={selectedUser.status}
              onChange={(value) =>
                setSelectedUser({ ...selectedUser, status: value })
              }
              data={[
                { value: "active", label: "Activo" },
                { value: "pending", label: "Pendiente" },
                { value: "finished", label: "Finalizado" },
              ]}

            />
          </Group>

          {filteredUsers.length === 0 ? (
            <Center>
              <Text>No hay resultados</Text>
            </Center>
          ) : (
            <>
              <UserTable
                users={formattedUsers}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              <Center mt="md">
                <Pagination
                  page={page}
                  onChange={setPage}
                  total={Math.ceil(filteredUsers.length / itemsPerPage)}
                />
              </Center>
            </>
          )}

          {/* Modal de edición con campos editables */}
          <Modal
            opened={editModal}
            onClose={() => setEditModal(false)}
            title={`Editar Usuario: ${selectedUser?.user.name}`}
            centered
            size="lg"
          >
            {selectedUser && (
              <Stack spacing="md">
                <Accordion variant="contained" multiple>
                  {/* Plan de alimentos */}
                  <Accordion.Item value="alimentos">
                    <Accordion.Control>🍗 Plan de Alimentos</Accordion.Control>
                    <Accordion.Panel>
                      {planAlimento.length > 0 ? (
                        planAlimento.map((a, index) => (
                          <Stack key={a.id} spacing={4} mb={8}>
                            <TextInput
                              label="Nombre"
                              value={a.name}
                              onChange={(e) => {
                                const updated = [...planAlimento];
                                updated[index].name = e.target.value;
                                setPlanAlimento(updated);
                              }}
                            />
                            <Textarea
                              label="Descripción"
                              value={a.description}
                              onChange={(e) => {
                                const updated = [...planAlimento];
                                updated[index].description = e.target.value;
                                setPlanAlimento(updated);
                              }}
                            />
                          </Stack>
                        ))
                      ) : (
                        <Text color="dimmed">No hay plan de alimentos</Text>
                      )}
                    </Accordion.Panel>
                  </Accordion.Item>

                  {/* Plan de ejercicios */}
                  <Accordion.Item value="ejercicios">
                    <Accordion.Control>🏋️ Plan de Ejercicios</Accordion.Control>
                    <Accordion.Panel>
                      {planEjercicio.length > 0 ? (
                        planEjercicio.map((e, index) => (
                          <Stack key={e.id} spacing={4} mb={8}>
                            <TextInput
                              label="Nombre"
                              value={e.name}
                              onChange={(ev) => {
                                const updated = [...planEjercicio];
                                updated[index].name = ev.target.value;
                                setPlanEjercicio(updated);
                              }}
                            />
                            <Textarea
                              label="Descripción"
                              value={e.description}
                              onChange={(ev) => {
                                const updated = [...planEjercicio];
                                updated[index].description = ev.target.value;
                                setPlanEjercicio(updated);
                              }}
                            />
                          </Stack>
                        ))
                      ) : (
                        <Text color="dimmed">No hay plan de ejercicios</Text>
                      )}
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>

                {/* Estado del usuario */}
                <Select
                  label="Estado"
                  value={selectedUser.status}
                  onChange={(value) =>
                    setSelectedUser({ ...selectedUser, status: value })
                  }
                  data={[
                    { value: "active", label: "Activo" },
                    { value: "inactive", label: "Inactivo" },
                  ]}
                />

                {/* Fecha de expiración */}
                <DateInput
                  label="Expiración"
                  valueFormat="DD/MM/YYYY"
                  value={selectedUser.expiration_date}
                  onChange={(date) =>
                    setSelectedUser({ ...selectedUser, expiration_date: date })
                  }
                />

                <Button onClick={handleUpdate} fullWidth color="blue">
                  Guardar Cambios
                </Button>
              </Stack>
            )}
          </Modal>

          {/* Modal de eliminación */}
          <Modal
            opened={deleteModal}
            onClose={() => setDeleteModal(false)}
            title="Confirmar Eliminación"
            centered
          >
            <Text mb="md">
              ¿Estás seguro de que deseas eliminar **permanentemente** este
              registro? Esta acción no se puede deshacer.
            </Text>
            <Group position="apart">
              <Button color="gray" onClick={() => setDeleteModal(false)}>
                Cancelar
              </Button>
              <Button color="red" onClick={handleConfirmDelete}>
                Eliminar definitivamente
              </Button>
            </Group>
          </Modal>
        </Container>
      </div>
    </>
  );
}
