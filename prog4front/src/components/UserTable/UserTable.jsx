import { Table, Avatar, Badge, Button, Group, Center } from "@mantine/core";
import "./UserTable.css";

export function UserTable({ users, onApprovePlan, onRejectPlan }) {
  const rows = users.map((user) => (
    <tr key={user.id}>
      {/* Avatar */}
      <td className="avatar-col">
        <Center>
          <Avatar src={user.image} radius="xl" />
        </Center>
      </td>

      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.plan?.name || "Sin plan"}</td>
      <td>{user.plan?.price ? `$${user.plan.price}` : "-"}</td>

      {/* Estado */}
      <td className="estado-col">
        <Badge
          fullWidth
          color={
            user.plan?.status === "aprobado"
              ? "green"
              : user.plan?.status === "rechazado"
              ? "red"
              : "orange"
          }
        >
          {user.plan?.status?.toUpperCase() || "PENDIENTE"}
        </Badge>
      </td>

      {/* Acciones */}
      <td className="acciones-col">
        {user.plan ? (
          <Group justify="center" gap="xs">
            <Button
              size="xs"
              color="green"
              onClick={() => onApprovePlan?.(user.id)}
            >
              Aprobar
            </Button>
            <Button
              size="xs"
              color="red"
              variant="outline"
              onClick={() => onRejectPlan?.(user.id)}
            >
              Rechazar
            </Button>
          </Group>
        ) : (
          <Center>-</Center>
        )}
      </td>
    </tr>
  ));

  return (
    <Table striped highlightOnHover verticalSpacing="sm" withColumnBorders>
      <thead>
        <tr>
          <th className="avatar-col">Avatar</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Plan</th>
          <th>Precio</th>
          <th className="estado-col">Estado</th>
          <th className="acciones-col">Acciones</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}


