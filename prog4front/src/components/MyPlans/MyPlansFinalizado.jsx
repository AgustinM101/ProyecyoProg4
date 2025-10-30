import { Stack, Text, Badge } from "@mantine/core";

export function MyPlansFinalizado({ form }) {
  return (
    <Stack spacing="xs">
      <Text><strong>Nombre:</strong> {form.nombre}</Text>
      <Text><strong>Fecha fin:</strong> {form.fecha_fin}</Text>
      <Badge color="gray">Finalizado</Badge>
    </Stack>
  );
}
