import { Modal, Stack, Text, Divider, Button, Group, Title, ScrollArea, Badge } from "@mantine/core";

export function FormularioModal({ opened, onClose, form }) {
  if (!form) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>📄 Formulario del Usuario</Title>}
      centered
      size="lg"
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      radius="md"
      padding="lg"
    >
      <ScrollArea h={400} type="always">
        <Stack gap="sm">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">Fecha de registro:</Text>
            <Badge color="orange" variant="light">
              {form.fecha_registro || "Sin fecha"}
            </Badge>
          </Group>

          <Divider my="xs" label="Datos personales" labelPosition="center" />

          <Text><b>Nombre:</b> {form.nombre}</Text>
          <Text><b>Edad:</b> {form.edad}</Text>
          <Text><b>Sexo:</b> {form.sexo}</Text>
          <Text><b>Altura:</b> {form.altura} cm</Text>
          <Text><b>Peso actual:</b> {form.peso_actual} kg</Text>
          <Text><b>Peso deseado:</b> {form.peso_deseado} kg</Text>

          <Divider my="xs" label="Estilo de vida" labelPosition="center" />

          <Text><b>Actividad física:</b> {form.actividad_fisica}</Text>
          <Text><b>Comidas diarias:</b> {form.comidas_diarias}</Text>
          <Text><b>Horarios de comidas:</b> {form.horarios_comidas}</Text>
          <Text><b>Consumo de agua:</b> {form.consumo_agua} L/día</Text>
          <Text><b>Consumo de alcohol:</b> {form.consumo_alcohol}</Text>

          <Divider my="xs" label="Salud y antecedentes" labelPosition="center" />

          <Text><b>Antecedentes médicos:</b> {form.antecedentes_medicos || "Ninguno"}</Text>
          <Text><b>Alergias:</b> {form.alergias || "Ninguna"}</Text>
          <Text><b>Medicamentos:</b> {form.medicamentos || "Ninguno"}</Text>
          <Text><b>Problemas digestivos:</b> {form.problemas_digestivos || "Ninguno"}</Text>
          <Text><b>Alimentos a evitar:</b> {form.alimentos_evitar || "Ninguno"}</Text>
        </Stack>
      </ScrollArea>

      <Divider my="md" />

      <Group justify="center">
        <Button onClick={onClose} color="orange" radius="md">
          Cerrar
        </Button>
      </Group>
    </Modal>
  );
}
