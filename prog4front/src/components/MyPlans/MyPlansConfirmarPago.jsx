import { Stack, Text, Badge } from "@mantine/core";

export function MyPlansConfirmarPago({ form }) {
  return (
    <Stack spacing="xs">
      <Text><strong>Nombre:</strong> {form.nombre}</Text>
      <Text><strong>Edad:</strong> {form.edad}</Text>
      <Badge color="blue">Confirmar pago</Badge>
    </Stack>
  );
}
