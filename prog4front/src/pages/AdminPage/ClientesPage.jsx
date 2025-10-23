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
} from "@mantine/core";
import { plansUserService } from "../../services/plansUserService";
import { DateInput } from '@mantine/dates';
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
    return paginatedUsers.map((pu) => {
      return {
        id: pu.id,
        user: {
          id: pu.id_user,
          name: pu.user_name,
          email: pu.user_email,
        },
        plan: {
          id: pu.id_plan,
          name: pu.plan_name,
          price: pu.plan_price ?? 0,
        },
        status: pu.status?.toLowerCase(),
        expiration_date: pu.expiration_date,
      };
    });
  }, [paginatedUsers]);


  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;
    try {
      await plansUserService.updatePlan(selectedUser.id, {
      status: selectedUser.status,
      expiration_date: selectedUser.expiration_date,
      });

      setEditModal(false);
      fetchPlansUsers();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleConfirmDelete = async () => {
  if (!selectedUser) return;
  try {
    await plansUserService.deletePlan(selectedUser.id); // <-- usar deletePlan
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

            <DateInput
              label="Expiración"
              valueFormat="DD/MM/YYYY"
              value={selectedUser.expiration_date}
              onChange={(date) =>
                setSelectedUser({
                  ...selectedUser,
                  expiration_date: date
                })
              }
            />

            <Button onClick={handleUpdate} fullWidth color="blue">
              Guardar Cambios
            </Button>
          </Stack>
        )}
      </Modal>

      {/* Modal de confirmación de eliminación */}
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
