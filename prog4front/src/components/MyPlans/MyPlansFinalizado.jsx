import { Card, Stack, Text, Badge, Button } from "@mantine/core";
import { RefreshCw } from "lucide-react";

export default function PlanFinalizado({ form }) {
  return (
    <Card shadow="sm" p="lg" radius="md">
      <Stack spacing="xs">
        <Text><strong>Nombre:</strong> {form.nombre}</Text>
        <Text><strong>Fecha fin:</strong> {form.fecha_fin}</Text>

        <Badge color="gray">Finalizado</Badge>

        <Button
          leftIcon={<RefreshCw size={16} />}
          variant="light"
          color="gray"
          mt="sm"
        >
          Renovar Plan
        </Button>
      </Stack>
    </Card>
  );
}
