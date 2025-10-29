// src/pages/MyPlansPage/MyPlansPage.jsx
import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Card,
  Stack,
  Title,
  Text,
  Center,
  Loader,
  Badge,
  Button,
  Group,
  Modal,
  TextInput,
  Textarea,
  Notification,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconPlus, IconTrash, IconEye, IconCheck, IconRefresh } from "@tabler/icons-react";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import { plansFormService } from "../../services/plansFormService";
import { userService } from "../../services/userService";
import { plansUserService } from "../../services/plansUserService";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";
import dayjs from "dayjs";
import "./MyPlansPage.css";


export default function MyPlansPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [user, setUser] = useState(null);

 
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  const [addPlanModalOpen, setAddPlanModalOpen] = useState(false);
  const [addPlanType, setAddPlanType] = useState("alimento"); 
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanDesc, setNewPlanDesc] = useState("");
  const [addPlanLoading, setAddPlanLoading] = useState(false);

  const [confirmPaymentLoading, setConfirmPaymentLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchAll();
  //HOOKS
  }, []);

  async function fetchAll() {
    setLoading(true);
    setError(undefined);
    try {
      const userResp = await userService.getCurrentUser();
      const currentUser = userResp?.data;
      if (!currentUser) throw new Error("No hay usuario logueado");
      setUser(currentUser);

      // 🔹 TRAIGO TODOS LOS PLANES Y FILTRO EN FRONTEND
  // 🔹 TRAIGO SOLO LOS PLANES DEL USUARIO LOGUEADO
const formsResp = await plansFormService.getPlansFormsByUser();
const userForms = Array.isArray(formsResp.data) ? formsResp.data : [];


      // 🔹 Agrego estado calculado
      const augmented = userForms.map((form) => ({ ...form, estado: calcularEstado(form) }));
      setForms(augmented);

    } catch (err) {
      console.error("Error al cargar datos MyPlans:", err);
      setError("Error al cargar tus planes. Revisá tu conexión o volvé a intentarlo.");
    } finally {
      setLoading(false);
    }
  }

  
  // Estado calculado por reglas
  
  function calcularEstado(form) {
    const hoy = dayjs();
    const fechaExpiracion = form.fecha_fin ? dayjs(form.fecha_fin) : null;

    if (fechaExpiracion && hoy.isAfter(fechaExpiracion)) return "finalizado";
    if (!form.pago_realizado && !form.confirmado) return "confirmar pago";
    if (form.pago_realizado && !form.activo) return "pendiente de carga";
    if (form.pago_realizado && form.activo) return "activo";
    return "pendiente de carga";
  }

  const EstadoBadge = ({ estado }) => {
    const colorMap = {
      "confirmar pago": "blue",
      "pendiente de carga": "orange",
      activo: "green",
      finalizado: "gray",
    };
    const labelMap = {
      "confirmar pago": "CONFIRMAR PAGO",
      "pendiente de carga": "PENDIENTE DE CARGA",
      activo: "ACTIVO",
      finalizado: "FINALIZADO",
    };
    return (
      <Badge color={colorMap[estado] || "gray"} size="lg" radius="md" variant="filled">
        {labelMap[estado] || estado.toUpperCase()}
      </Badge>
    );
  };

  
  // Handlers: ver, agregar, confirmar, eliminar, renovar

  function handleOpenView(form) {
    setSelectedForm(form);
    setViewModalOpen(true);
  }
  function handleCloseView() {
    setSelectedForm(null);
    setViewModalOpen(false);
  }
  function handleOpenAddPlan(form, type = "alimento") {
    setSelectedForm(form);
    setAddPlanType(type);
    setNewPlanName("");
    setNewPlanDesc("");
    setAddPlanModalOpen(true);
  }
  function handleCloseAddPlan() {
    setSelectedForm(null);
    setAddPlanModalOpen(false);
    setAddPlanLoading(false);
  }

  async function handleAddPlanSubmit() {
    if (!selectedForm) return;
    if (!newPlanName.trim()) {
      setNotification({ type: "error", message: "El nombre del plan es obligatorio." });
      return;
    }
    setAddPlanLoading(true);
    try {
      const payload = { name: newPlanName, description: newPlanDesc, plans_user_id: selectedForm.id };
      if (addPlanType === "alimento") await planAlimentosService.createPlan(payload);
      else await planEjerciciosService.createPlan(payload);

      await plansUserService.updatePlan(selectedForm.id, { pago_realizado: true, activo: true });
      setNotification({ type: "success", message: "Plan creado y marcado como activo." });
      handleCloseAddPlan();
      await fetchAll();
    } catch (err) {
      console.error("Error al agregar plan:", err);
      setNotification({ type: "error", message: "No se pudo crear el plan. Intentá de nuevo." });
    } finally {
      setAddPlanLoading(false);
    }
  }

  async function handleConfirmPayment(form) {
    if (!form) return;
    setConfirmPaymentLoading(true);
    try {
      await plansUserService.updatePlan(form.id, { confirmado: true, pago_realizado: true });
      setNotification({ type: "success", message: "Pago confirmado. Podés cargar tu plan." });
      await fetchAll();
    } catch (err) {
      console.error("Error al confirmar pago:", err);
      setNotification({ type: "error", message: "No se pudo confirmar el pago." });
    } finally {
      setConfirmPaymentLoading(false);
    }
  }

  async function handleDelete(form) {
    if (!form) return;
    try {
      await plansFormService.deletePlanForm(form.id);
      setNotification({ type: "success", message: "Formulario eliminado." });
      await fetchAll();
    } catch (err) {
      console.error("Error al eliminar formulario:", err);
      setNotification({ type: "error", message: "No se pudo eliminar el formulario." });
    }
  }

  async function handleRenew(form) {
    if (!form) return;
    try {
      const nuevaFechaFin = dayjs().add(30, "day").format("YYYY-MM-DD");
      await plansUserService.updatePlan(form.id, { fecha_fin: nuevaFechaFin, pago_realizado: true, activo: true });
      setNotification({ type: "success", message: "Plan renovado." });
      await fetchAll();
    } catch (err) {
      console.error("Error al renovar:", err);
      setNotification({ type: "error", message: "No se pudo renovar el plan." });
    }
  }


  // Render helpers por estado
  
  function renderCardByEstado(form) {
    switch (form.estado) {
      case "pendiente de carga":
        return (
          <Stack spacing="xs">
            <Text><strong>Nombre:</strong> {form.nombre}</Text>
            <Text><strong>Actividad:</strong> {form.actividad_fisica}</Text>
            <Text><strong>Fecha inicio:</strong> {form.fecha_inicio || "No definida"}</Text>
            <Text><strong>Fecha fin:</strong> {form.fecha_fin || "A definir"}</Text>
            <EstadoBadge estado={form.estado} />
            <Group mt="sm">
              <Button leftIcon={<IconEye size={16} />} onClick={() => handleOpenView(form)}>Ver Formulario</Button>
              <Button leftIcon={<IconPlus size={16} />} color="green" onClick={() => handleOpenAddPlan(form, "alimento")}>Subir Plan de Alimentos</Button>
              <Button leftIcon={<IconPlus size={16} />} color="teal" onClick={() => handleOpenAddPlan(form, "ejercicio")}>Subir Plan de Ejercicios</Button>
              <Button leftIcon={<IconTrash size={16} />} color="red" variant="subtle" onClick={() => handleDelete(form)}>Eliminar</Button>
            </Group>
          </Stack>
        );
      case "activo":
        return (
          <Stack spacing="xs">
            <Text><strong>Nombre:</strong> {form.nombre}</Text>
            <Text><strong>Actividad:</strong> {form.actividad_fisica}</Text>
            <Text><strong>Fecha fin:</strong> {form.fecha_fin || "No definida"}</Text>
            <EstadoBadge estado={form.estado} />
            <Group mt="sm">
              <Button leftIcon={<IconEye size={16} />} onClick={() => handleOpenView(form)}>Ver Planes Activos</Button>
              <Button leftIcon={<IconTrash size={16} />} color="red" variant="outline" onClick={() => handleDelete(form)}>Eliminar</Button>
            </Group>
          </Stack>
        );
      case "confirmar pago":
        return (
          <Stack spacing="xs">
            <Text><strong>Nombre:</strong> {form.nombre}</Text>
            <Text><strong>Edad:</strong> {form.edad} años</Text>
            <EstadoBadge estado={form.estado} />
            <Group mt="sm">
              <Button leftIcon={<IconEye size={16} />} onClick={() => handleOpenView(form)}>Ver Detalles</Button>
              <Button leftIcon={<IconCheck size={16} />} color="green" loading={confirmPaymentLoading} onClick={() => handleConfirmPayment(form)}>Confirmar Pago</Button>
              <Button leftIcon={<IconTrash size={16} />} color="red" variant="subtle" onClick={() => handleDelete(form)}>Eliminar</Button>
            </Group>
          </Stack>
        );
      case "finalizado":
        return (
          <Stack spacing="xs">
            <Text><strong>Nombre:</strong> {form.nombre}</Text>
            <Text><strong>Fecha fin:</strong> {form.fecha_fin}</Text>
            <EstadoBadge estado={form.estado} />
            <Group mt="sm">
              <Button leftIcon={<IconEye size={16} />} onClick={() => handleOpenView(form)}>Ver</Button>
              <Button leftIcon={<IconRefresh size={16} />} variant="outline" onClick={() => handleRenew(form)}>Renovar Plan</Button>
            </Group>
          </Stack>
        );
      default:
        return (
          <Stack>
            <Text>Estado desconocido</Text>
            <Button onClick={() => handleOpenView(form)}>Ver</Button>
          </Stack>
        );
    }
  }

  if (loading) return <Center style={{ height: "100vh" }}><Loader size="lg" /></Center>;
  if (error) return <Center style={{ height: "100vh" }}><Text color="red">{error}</Text></Center>;

  return (
    <>
      <HeaderMenu />
      <Container size="md" className="myplans-container" py="md">
        <Title order={2} mb="md">Mis Planes</Title>

        {notification && <Notification onClose={() => setNotification(null)} color={notification.type === "error" ? "red" : "green"} mb="sm">{notification.message}</Notification>}

        {forms.length === 0 ? <Text>No tenés formularios cargados.</Text> :
          <Stack spacing="md">{forms.map((form) => <Card key={form.id} shadow="sm" p="lg" radius="md">{renderCardByEstado(form)}</Card>)}</Stack>
        }
      </Container>
      <Footer />

      {/* Modal Ver detalle */}
      <Modal opened={viewModalOpen} onClose={handleCloseView} title="Detalle del formulario" size="lg" centered>
        {selectedForm ? (
          <Stack>
            <Text><strong>Nombre:</strong> {selectedForm.nombre}</Text>
            <Text><strong>Edad:</strong> {selectedForm.edad}</Text>
            <Text><strong>Actividad:</strong> {selectedForm.actividad_fisica}</Text>
            <Text><strong>Inicio:</strong> {selectedForm.fecha_inicio || "No definida"}</Text>
            <Text><strong>Fin:</strong> {selectedForm.fecha_fin || "No definida"}</Text>
            <Text><strong>Pago realizado:</strong> {selectedForm.pago_realizado ? "Sí" : "No"}</Text>
            <Text><strong>Activo:</strong> {selectedForm.activo ? "Sí" : "No"}</Text>
          </Stack>
        ) : <Center><Loader /></Center>}
      </Modal>

      {/* Modal Agregar plan */}
      <Modal opened={addPlanModalOpen} onClose={handleCloseAddPlan} title={`Agregar plan (${addPlanType})`} centered>
        <Stack>
          <Text><strong>Usuario:</strong> {selectedForm?.nombre}</Text>
          <TextInput label="Nombre del plan" value={newPlanName} onChange={(e) => setNewPlanName(e.currentTarget.value)} />
          <Textarea label="Descripción" value={newPlanDesc} onChange={(e) => setNewPlanDesc(e.currentTarget.value)} minRows={4} />
          <Group position="apart" mt="sm">
            <Button variant="default" onClick={handleCloseAddPlan}>Cancelar</Button>
            <Button loading={addPlanLoading} onClick={handleAddPlanSubmit} leftIcon={<IconPlus size={14} />}>
              Subir {addPlanType === "alimento" ? "Plan de Alimentos" : "Plan de Ejercicios"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

