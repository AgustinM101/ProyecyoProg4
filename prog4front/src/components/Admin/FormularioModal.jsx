import { Modal, Text, Loader, Center, Stack } from "@mantine/core";

export function FormularioModal({ opened, onClose, form }) {
  const loading = !form; // Si no hay datos todavía, mostramos loader

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Formulario del Usuario"
      centered
      size="lg"
    >
      {loading ? (
        <Center py="xl">
          <Loader />
        </Center>
      ) : (
        <Stack spacing="xs">
          <Text size="sm">
            <strong>Nombre:</strong> {form.nombre || "-"}
          </Text>
          <Text size="sm">
            <strong>Edad:</strong> {form.edad || "-"}
          </Text>
          <Text size="sm">
            <strong>Sexo:</strong> {form.sexo || "-"}
          </Text>
          <Text size="sm">
            <strong>Altura:</strong> {form.altura || "-"} cm
          </Text>
          <Text size="sm">
            <strong>Peso actual:</strong> {form.peso_actual || "-"} kg
          </Text>
          <Text size="sm">
            <strong>Peso deseado:</strong> {form.peso_deseado || "-"} kg
          </Text>

          <Text size="sm">
            <strong>Actividad física:</strong> {form.actividad_fisica || "-"}
          </Text>
          <Text size="sm">
            <strong>Comidas diarias:</strong> {form.comidas_diarias || "-"}
          </Text>
          <Text size="sm">
            <strong>Horarios comidas:</strong> {form.horarios_comidas || "-"}
          </Text>
          <Text size="sm">
            <strong>Consumo agua:</strong> {form.consumo_agua || "-"} vasos/día
          </Text>
          <Text size="sm">
            <strong>Consumo alcohol:</strong> {form.consumo_alcohol || "-"}
          </Text>

          <Text size="sm">
            <strong>Alergias:</strong> {form.alergias || "-"}
          </Text>
          <Text size="sm">
            <strong>Alimentos a evitar:</strong> {form.alimentos_evitar || "-"}
          </Text>
          <Text size="sm">
            <strong>Antecedentes médicos:</strong>{" "}
            {form.antecedentes_medicos || "-"}
          </Text>
          <Text size="sm">
            <strong>Medicamentos:</strong> {form.medicamentos || "-"}
          </Text>
          <Text size="sm">
            <strong>Problemas digestivos:</strong>{" "}
            {form.problemas_digestivos || "-"}
          </Text>

          <Text size="sm" c="dimmed" mt="xs">
            <strong>Fecha registro:</strong> {form.fecha_registro || "-"}
          </Text>
        </Stack>
      )}
    </Modal>
  );
}
