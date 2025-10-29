import { Card, Stack, Text, Button, Badge } from "@mantine/core";
import { Eye } from "lucide-react";

export default function PlanActivo({ form }) {
  return (
    <Card shadow="sm" p="lg" radius="md">
      <Stack spacing="xs">
        <Text><strong>Nombre:</strong> {form.nombre}</Text>
        <Text><strong>Actividad:</strong> {form.actividad_fisica}</Text>
        <Text><strong>Fecha fin:</strong> {form.fecha_fin || "No definida"}</Text>

        <Badge color="green">Activo</Badge>

        <Button leftIcon={<Eye size={16} />} variant="light" color="green" mt="sm">
          Ver Planes Activos
        </Button>
      </Stack>
    </Card>
  );
}
