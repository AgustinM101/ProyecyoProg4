import { Table, Avatar } from "@mantine/core";

export function UserTable({ users }) {
  const rows = users.map((user) => (
    <tr key={user.id}>
      <td>
        <Avatar src={user.image} radius="xl" />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.plan?.name || "Sin plan"}</td>
      <td>{user.plan?.price ? `$${user.plan.price}` : "-"}</td>
    </tr>
  ));

  return (
    <Table striped highlightOnHover verticalSpacing="sm">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Plan</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
