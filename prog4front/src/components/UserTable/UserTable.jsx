import "./UserTable.css";
import { Table, Text, Button, Group } from "@mantine/core";

export function UserTable({ users, onEdit, onDelete }) {
  return (
    <Table highlightOnHover className="user-table">

      <thead>
        <tr>
          <th>Usuario</th>
          <th>Email</th>
          <th>Plan</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Expira</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((pu) => (
          <tr key={`${pu.user.id}-${pu.plan.id}`}>
            <td>{pu.user.name}</td>
            <td>{pu.user.email}</td>
            <td>{pu.plan.name}</td>
            <td>${pu.plan.price}</td>
            <td>
              <Text fw={700} color={pu.status === "active" ? "green" : "red"}>
                {pu.status === "active" ? "Activo" : "Inactivo"}
              </Text>
            </td>
            <td>{pu.expiration_date}</td>
            <td>
              <Group spacing="xs">
                <Button
                  size="xs"
                  color="blue"
                  variant="light"
                  onClick={() => onEdit(pu)}
                >
                  Editar
                </Button>
                <Button
                  size="xs"
                  color="red"
                  variant="light"
                  onClick={() => onDelete(pu)}
                >
                  Eliminar
                </Button>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
