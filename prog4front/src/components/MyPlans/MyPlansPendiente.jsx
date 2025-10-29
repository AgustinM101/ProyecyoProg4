import { Card, Stack, Text, Button, Group, Badge } from "@mantine/core";
import { Eye, Edit, Trash } from "lucide-react";

export default function PlanPendiente({ form }) {
  return (
    <Card shadow="sm" p="lg" radius="md">
      <Stack spacing="xs">
        <Text><strong>Nombre:</strong> {form.nombre}</Text>
        <Text><strong>Edad:</strong> {form.edad} años</Text>
        <Text><strong>Fecha fin:</strong> {form.fecha_fin || "A definir"}</Text>

        <Badge color="orange">Pendiente de carga</Badge>

        <Group mt="sm">
          <Button leftIcon={<Eye size={16} />} variant="outline" color="blue">
            Ver Formulario
          </Button>
          <Button leftIcon={<Edit size={16} />} variant="outline" color="yellow">
            Editar
          </Button>
          <Button leftIcon={<Trash size={16} />} variant="outline" color="red">
            Eliminar
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
