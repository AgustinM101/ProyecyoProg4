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
import { DateInput } from "@mantine/dates";
import { plansUserService } from "../../services/plansUserService";
import { UserTable } from "../../components/UserTable/UserTable";
import "./ClientesPage.css";
import { AdminNavbar } from "../../components/Admin/AdminNavbar";
import { plansFormService } from "../../services/plansFormService";
import { FormularioModal } from "../../components/Admin/FormularioModal";
import { AdminPageLoader } from "../../components/Admin/AdminPageLoader";

export function ClientesPage() {
  const [plansUsers, setPlansUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ nuevo modal y datos para ver formulario
  const [viewModal, setViewModal] = useState(false);
  const [formDetails, setFormDetails] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false); // NUEVO estado para loader de eliminar

  const itemsPerPage = 5;

  const STATUS_OPTIONS = [
    { value: "chargePending", label: "Pendiente de carga" },
    { value: "active", label: "Activo" },
    { value: "expired", label: "Confirmar pago" },
    { value: "finished", label: "Finalizado" },
  ];

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
      status: pu.status,
      expiration_date: pu.expiration_date,
      plans_user_id: pu.id,
    }));
  }, [paginatedUsers]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
  if (!selectedUser) return;

  setDeleting(true); // activamos loader
  try {
    await plansUserService.deletePlan(selectedUser.id);
    setDeleteModal(false);   // cerramos modal
    fetchPlansUsers();       // refrescamos tabla
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    alert("❌ No se pudo eliminar el usuario");
  } finally {
    setDeleting(false); // desactivamos loader
  }
};

  const handleConfirmPayment = async (pu, newStatus) => {
    if (!pu) return;

    try {
      await plansUserService.updatePlan(pu.id, {
        status: newStatus,
        expiration_date: pu.expiration_date,
      });

      fetchPlansUsers();
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("❌ No se pudo actualizar el estado");
    }
  };

  // ✅ NUEVO: ver formulario
  const handleView = async (pu) => {
    if (!pu?.id) return;

    setViewModal(true);
    setLoadingForm(true);
    setFormDetails(null);

    try {
      const response = await plansFormService.getPlansFormsByPlansUser(pu.id);
      setFormDetails(response.data);
    } catch (error) {
      console.error("Error al obtener formulario:", error);
      alert("❌ Este usuario aún no cargó el formulario.");
    } finally {
      setLoadingForm(false);
    }
  };


  if (loading) {
    return (
      <>
        <AdminNavbar />
        <AdminPageLoader />
      </>
    );
  }

  return (
    <>
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
                onConfirmPayment={handleConfirmPayment}
                onView={handleView}
                fetchPlansUsers={fetchPlansUsers}
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

          {/* Modal editar */}
          <Modal
            opened={editModal}
            onClose={() => setEditModal(false)}
            title={`Editar Usuario: ${selectedUser?.user.name || ""}`}
            centered
            size="lg"
          >
            {selectedUser && (
              <Stack spacing="md">
                <Select
                  label="Estado"
                  placeholder="Seleccionar estado"
                  value={selectedUser.status}
                  onChange={(value) =>
                    setSelectedUser({ ...selectedUser, status: value })
                  }
                  data={STATUS_OPTIONS}
                />

                <DateInput
                  label="Expiración"
                  valueFormat="DD/MM/YYYY"
                  value={selectedUser.expiration_date}
                  onChange={(date) =>
                    setSelectedUser({ ...selectedUser, expiration_date: date })
                  }
                />

                {/* BOTÓN CON LOADER */}
                <Button
                  fullWidth
                  color="blue"
                  loading={saving}           // muestra el spinner
                  disabled={saving}          // deshabilita mientras se procesa
                  onClick={async () => {
                    if (!selectedUser) return;
                    setSaving(true);         // activamos loader

                    const payload = { status: selectedUser.status, expiration_date: null };
                    if (selectedUser.expiration_date) {
                      payload.expiration_date = selectedUser.expiration_date;
                    }

                    try {
                      await plansUserService.updatePlan(selectedUser.id, payload);
                      setEditModal(false);    // cerramos modal
                      fetchPlansUsers();      // refrescamos tabla
                    } catch (error) {
                      console.error("Error al actualizar usuario:", error);
                      alert("❌ No se pudo actualizar el usuario");
                    } finally {
                      setSaving(false);       // desactivamos loader
                    }
                  }}
                >
                  Guardar Cambios
                </Button>
              </Stack>
            )}
          </Modal>


          {/* ✅ Modal eliminar */}
          <Modal
            opened={deleteModal}
            onClose={() => setDeleteModal(false)}
            title="Confirmar Eliminación"
            centered
          >
            <Text mb="md">
              ¿Estás seguro de que deseas eliminar este registro?
            </Text>
            <Group position="apart">
              <Button color="gray" onClick={() => setDeleteModal(false)} disabled={deleting}>
                Cancelar
              </Button>
              <Button color="red" onClick={handleConfirmDelete} loading={deleting} disabled={deleting}>
                Eliminar definitivamente
              </Button>
            </Group>
          </Modal>


          {/* ✅ Modal ver formulario */}
          <FormularioModal
            opened={viewModal}
            onClose={() => setViewModal(false)}
            form={formDetails}
          />

        </Container>
      </div>
    </>
  );
}
