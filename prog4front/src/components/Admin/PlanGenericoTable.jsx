import { Table, Button } from "@mantine/core";
import { IconTrash, IconPencil } from "@tabler/icons-react";
import "./PlanGenericoTable.css";

export function PlanGenericoTable({ plans, onEdit, onDelete, deleting }) {
  return (
    <Table className="plan-table">
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
            <td>${plan.price?.toFixed(2)}</td>
            <td>
              <div className="actions-group">
                <Button variant="subtle" color="blue" onClick={() => onEdit(plan)}>
                  <IconPencil size={16} />
                </Button>
                <Button variant="subtle" color="red" loading={deleting} disabled={deleting} onClick={() => onDelete(plan.id)}>
                  <IconTrash size={16} />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
