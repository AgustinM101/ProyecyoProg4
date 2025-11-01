import {
  Modal,
  Title,
  Text,
  Divider,
  Card,
  Group,
  Stack,
  ScrollArea,
  Badge,
} from "@mantine/core";

export function MyPlansDetalleModal({ opened, onClose, plan }) {
  if (!plan) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      title={<Title order={3}>Detalles del plan</Title>}
      overlayProps={{ backgroundOpacity: 0.4, blur: 4 }}
    >
      <ScrollArea style={{ maxHeight: "70vh" }} type="auto">
        <Stack spacing="md">
          {/* Información general del plan */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="sm">
              <Title order={4}>{plan.plan_name || plan.plan?.name}</Title>
              <Badge
                color={
                  plan.status === "active"
                    ? "green"
                    : plan.status === "confirmPayment"
                    ? "yellow"
                    : plan.status === "finished"
                    ? "gray"
                    : "orange"
                }
                size="lg"
                variant="filled"
              >
                {plan.status === "active"
                  ? "Activo"
                  : plan.status === "confirmPayment"
                  ? "Pendiente de pago"
                  : plan.status === "finished"
                  ? "Finalizado"
                  : "Pendiente"}
              </Badge>
            </Group>
            <Text size="sm" c="dimmed">
              Expira el: {plan.expiration_date || "Sin fecha definida"}
            </Text>
          </Card>

          {/* Formulario (PlansForm) */}
          <Card shadow="xs" radius="md" withBorder>
            <Title order={4} c="teal">
              Formulario del Plan
            </Title>
            <Divider my="xs" />
            {plan.forms && plan.forms.length > 0 ? (
              plan.forms.map((f) => (
                <Stack key={f.id} spacing={4}>
                  <Text><strong>Nombre:</strong> {f.nombre}</Text>
                  <Text><strong>Edad:</strong> {f.edad}</Text>
                  <Text><strong>Peso:</strong> {f.peso} kg</Text>
                  <Text><strong>Altura:</strong> {f.altura} cm</Text>
                  <Text><strong>Peso_actual:</strong> {f.peso_actual} kg</Text>
                  <Text><strong>peso_deseado:</strong> {f.peso_deseado} kg</Text>
                  <Text><strong>Actividad física:</strong> {f.actividad_fisica}</Text>
                  <Text><strong>Antecedentes_medicos:</strong> {f.antecedentes_medicos}</Text>
                  <Text><strong>Alergias:</strong> {f.alergias}</Text>
                  <Text><strong>Medicamentos:</strong> {f.medicamentos}</Text>
                  <Text><strong>Problemas_digestivos:</strong> {f.problemas_digestivos}</Text>
                  <Text><strong>Comidas_diarias:</strong> {f.comidas_diarias}</Text>
                  <Text><strong>Horarios_de_comidas:</strong> {f.horarios_de_comidas}</Text>
                  <Text><strong>consumo_de_agua:</strong> {f.consumo_de_agua}</Text>
                  <Text><strong>Consumo_de_alcohol:</strong> {f.consumo_de_alcohol}</Text>
                  <Divider my="xs" />
                </Stack>
              ))
            ) : (
              <Text size="sm" c="dimmed">
                No hay formulario asociado a este plan.
              </Text>
            )}
          </Card>

          {/* Plan de Alimentos */}
          <Card shadow="xs" radius="md" withBorder>
            <Title order={4} c="orange">
              Plan de Alimentos
            </Title>
            <Divider my="xs" />
            {plan.alimentos && plan.alimentos.length > 0 ? (
              plan.alimentos.map((a) => (
                <Stack key={a.id} spacing={4}>
                  <Text><strong>Nombre:</strong> {a.name}</Text>
                  <Text><strong>Calorías:</strong> {a.calorias} kcal</Text>
                  <Text><strong>Comidas diarias:</strong> {a.comidas}</Text>
                  <Divider my="xs" />
                </Stack>
              ))
            ) : (
              <Text size="sm" c="dimmed">
                No hay plan de alimentos asociado.
              </Text>
            )}
          </Card>

          {/* Plan de Ejercicio */}
          <Card shadow="xs" radius="md" withBorder>
            <Title order={4} c="blue">
              Plan de Ejercicio
            </Title>
            <Divider my="xs" />
            {plan.ejercicios && plan.ejercicios.length > 0 ? (
              plan.ejercicios.map((e) => (
                <Stack key={e.id} spacing={4}>
                  <Text><strong>Ejercicio:</strong> {e.nombre}</Text>
                  <Text><strong>Duración:</strong> {e.duracion} min</Text>
                  <Text><strong>Frecuencia:</strong> {e.frecuencia}</Text>
                  <Divider my="xs" />
                </Stack>
              ))
            ) : (
              <Text size="sm" c="dimmed">
                No hay plan de ejercicios asociado.
              </Text>
            )}
          </Card>
        </Stack>
      </ScrollArea>
    </Modal>
  );
}
