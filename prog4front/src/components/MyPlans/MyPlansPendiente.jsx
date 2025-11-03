import { Card, Stack, Text, Button, Group, Badge } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";


export  function MyPlansPendiente({ form }) {
  return (
    <Card shadow="sm" p="lg" radius="md">
      <Stack spacing="xs">
        <Text><strong>Nombre:</strong> {form.nombre}</Text>
        <Text><strong>Edad:</strong> {form.edad} años</Text>
        <Text><strong>Fecha fin:</strong> {form.fecha_fin || "A definir"}</Text>

        <Badge color="orange">Pendiente de carga</Badge>

        <Group mt="sm">
           <Button leftIcon={<IconPlus size={18} />} variant="light" color="green" mt="sm">
          Ver formulario
        </Button>
           <Button leftIcon={<IconPlus size={18} />} variant="light" color="green" mt="sm">
          Editar formulario
        </Button>
         <Button leftIcon={<IconPlus size={18} />} variant="light" color="green" mt="sm">
          Eliminar 
        </Button>
        </Group>
      </Stack>
    </Card>
  );
}
