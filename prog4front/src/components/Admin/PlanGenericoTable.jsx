import { Table, Group, Button } from "@mantine/core";
import { IconTrash, IconPencil } from "@tabler/icons-react";

export function PlanGenericoTable({ plans, onEdit, onDelete }) {
  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {plans.map((plan) => (
          <tr key={plan.id}>
            <td>{plan.id}</td>
            <td>{plan.name}</td>
            <td>{plan.description}</td>
            <td>${plan.price}</td>
            <td>
              <Group gap="xs">
                <Button
                  variant="subtle"
                  color="blue"
                  onClick={() => onEdit(plan)}
                >
                  <IconPencil size={16} />
                </Button>
                <Button
                  variant="subtle"
                  color="red"
                  onClick={() => onDelete(plan.id)}
                >
                  <IconTrash size={16} />
                </Button>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
