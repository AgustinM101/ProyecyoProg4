import { Modal, Stack, Text, Divider, Button } from "@mantine/core";

export function FormularioModal({ opened, onClose, form }) {
  if (!form) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="📄 Ver Formulario"
      centered
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    >
      <Stack>
        <Text><b>Nombre:</b> {form.nombre}</Text>
        <Text><b>Edad:</b> {form.edad}</Text>
        <Text><b>Objetivo:</b> {form.objetivo}</Text>
        <Text><b>Experiencia:</b> {form.experiencia}</Text>
        <Text><b>Frecuencia semanal:</b> {form.frecuencia}</Text>
        <Text><b>Alimentación actual:</b> {form.alimentacion}</Text>
        <Text><b>Alergias:</b> {form.alergias}</Text>
        <Text><b>Observaciones:</b> {form.observaciones}</Text>
        <Divider />
        <Button onClick={onClose} color="#FF6600">
          Cerrar
        </Button>
      </Stack>
    </Modal>
  );
}
