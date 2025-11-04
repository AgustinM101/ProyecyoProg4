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
} from "@mantine/core";
import { plansService } from "../../services/plansService";
import { AdminNavbar } from "../../components/Admin/AdminNavbar";
import { PlanGenericoTable } from "../../components/Admin/PlanGenericoTable";
import { PlanGenericoModal } from "../../components/Admin/PlanGenericoModal";
import { AdminPageLoader } from "../../components/Admin/AdminPageLoader";

export function PlanesGenericosPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const itemsPerPage = 5;
  const [deleting, setDeleting] = useState(false);


  // 🔹 Obtener planes del backend
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await plansService.getPlans();
      setPlans(response.data);
    } catch (error) {
      console.error("Error al traer los planes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // 🔍 Filtro de búsqueda
  const filteredPlans = useMemo(() => {
    return plans.filter(
      (p) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [plans, search]);

  // 📄 Paginación
  const paginatedPlans = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredPlans.slice(start, start + itemsPerPage);
  }, [filteredPlans, page]);

  // ✏️ Crear / editar plan
  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setModalOpened(true);
  };

  const handleCreate = () => {
    setSelectedPlan(null);
    setModalOpened(true);
  };

  const handleSave = async (formData) => {
    try {
      if (selectedPlan) {
        await plansService.updatePlan(selectedPlan.id, formData);
      } else {
        await plansService.createPlan(formData);
      }
      setModalOpened(false);
      fetchPlans();
    } catch (error) {
      console.error("Error al guardar el plan:", error);
    }
  };

  //  Eliminar plan
  const handleDelete = async (planId) => {
  if (!window.confirm("¿Seguro que deseas eliminar este plan?")) return;
  setDeleting(true);
  try {
    await plansService.deletePlan(planId);
    fetchPlans();
  } catch (error) {
    console.error("Error al eliminar plan:", error);
  } finally {
    setDeleting(false);
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
              Admin - Planes Genéricos
            </Text>
            <Group>
              <TextInput
                placeholder="Buscar por nombre o descripción"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
              <Button color="#FF6600" onClick={handleCreate}>
                ➕ Nuevo Plan
              </Button>
            </Group>
          </Group>

          {filteredPlans.length === 0 ? (
            <Center>
              <Text>No hay resultados</Text>
            </Center>
          ) : (
            <>
              <PlanGenericoTable
                plans={paginatedPlans}
                onEdit={handleEdit}
                onDelete={handleDelete}
                deleting={deleting}
              />
              <Center mt="md">
                <Pagination
                  page={page}
                  onChange={setPage}
                  total={Math.ceil(filteredPlans.length / itemsPerPage)}
                />
              </Center>
            </>
          )}

          {/* Modal de crear/editar plan */}
          <PlanGenericoModal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            plan={selectedPlan}
            onSave={handleSave}
          />
        </Container>
      </div>
    </>
  );
}
