import { Card, Stack, Text, Button, Badge, Group } from "@mantine/core";
import { CreditCard, Eye } from "lucide-react";

export default function PlanConfirmarPago({ form }) {
  return (
    <Card shadow="sm" p="lg" radius="md">
      <Stack spacing="xs">
        <Text><strong>Nombre:</strong> {form.nombre}</Text>
        <Text><strong>Edad:</strong> {form.edad} años</Text>
        <Badge color="blue">Confirmar Pago</Badge>

        <Group mt="sm">
          <Button leftIcon={<CreditCard size={16} />} color="blue">
            Confirmar Pago
          </Button>
          <Button leftIcon={<Eye size={16} />} variant="outline" color="gray">
            Ver Detalles
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
