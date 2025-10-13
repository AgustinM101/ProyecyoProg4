import { useEffect, useState } from "react";
import { Container, Group, Text, Button } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { AdminNavbar } from "../../components/Admin/AdminNavbar";
import { FormularioList } from "../../components/Admin/FormularioList";
import { FormularioModal } from "../../components/Admin/FormularioModal";
// import { formsService } from "../../services/formsService"; // 🔜 activar cuando tengas endpoints

export function FormulariosPage() {
  const fecha = new Date().toLocaleDateString("es-AR");
  const [formularios, setFormularios] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  // 📦 Datos de ejemplo (para test sin backend)
  const fakeForms = [
    {
      id: 1,
      nombre: "Agustín Masso",
      email: "agus@gmail.com",
      objetivo: "Ganar masa muscular",
      nivel: "Intermedio",
      comentarios: "Entreno 3 veces por semana y tomo mate 😎",
    },
    {
      id: 2,
      nombre: "Lucía Torres",
      email: "lucia@gmail.com",
      objetivo: "Perder grasa corporal",
      nivel: "Principiante",
      comentarios: "Necesito ayuda con la alimentación.",
    },
  ];

  const fetchData = async () => {
    try {
      // 🔹 En producción, usar:
      // const { data } = await formsService.getForms();
      // setFormularios(data);

      // 🔸 En desarrollo (mock):
      setFormularios(fakeForms);
    } catch (error) {
      console.error("Error al obtener formularios:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVer = (form) => {
    setSelectedForm(form);
    setOpened(true);
  };

  const handleEliminar = (id) => {
    if (confirm("¿Seguro que querés eliminar este formulario?")) {
      setFormularios((prev) => prev.filter((f) => f.id !== id));
    }
  };

  return (
    <>
      <AdminNavbar />

      {/* Header con fecha */}
      <Group justify="space-between" p="md" bg="#1A1A1A" c="white">
        <Text size="lg">📝 Formularios Completados</Text>
        <Text>Fecha: {fecha}</Text>
      </Group>

      {/* Contenido */}
      <Container fluid bg="#0D0D0D" p="xl" style={{ minHeight: "100vh" }}>
        <Group justify="space-between" mb="md">
          <Text size="xl" fw={700} c="#FF6600">
            FORMULARIOS DE USUARIOS
          </Text>
          <Button
            leftSection={<IconRefresh size={18} />}
            color="#FF6600"
            variant="filled"
            onClick={fetchData}
          >
            Actualizar
          </Button>
        </Group>

        <FormularioList
          formularios={formularios}
          onVer={handleVer}
          onEliminar={handleEliminar}
        />

        <FormularioModal
          opened={opened}
          onClose={() => setOpened(false)}
          form={selectedForm}
        />
      </Container>
    </>
  );
}
