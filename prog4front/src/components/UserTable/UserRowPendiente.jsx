import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash, IconEye } from "@tabler/icons-react";
import { UserPlansAccordionCreate } from "./UserPlansAccordionCreate";

export function UserRowPendiente({ pu, onEdit, onDelete, onView }) {
  const [showAccordion, setShowAccordion] = useState(false);

  const handleToggleAccordion = () => setShowAccordion((prev) => !prev);

  return (
    <>
      <tr>
        <td>{pu.id}</td>
        <td>{pu.user_name || pu.user?.name}</td>
        <td>{pu.user_email || pu.user?.email}</td>
        <td>{pu.plan_name || pu.plan?.name || "Sin plan"}</td>
        <td>{pu.plan?.price ? `$${pu.plan.price}` : "-"}</td>
        <td style={{ color: "orange", fontWeight: 700 }}>Pendiente</td>
        <td>{pu.expiration_date || "A definir"}</td>
        <td>
          <Group spacing="xs">
            <Button variant="subtle" color="blue" onClick={() => onView(pu)} title="Ver formulario">
              <IconEye size={18} />
            </Button>

            <Button variant="subtle" color="yellow" onClick={() => onEdit(pu)} title="Editar plan">
              <IconPencil size={18} />
            </Button>

            <Button
              variant="subtle"
              color="green"
              onClick={handleToggleAccordion}
              title={showAccordion ? "Ocultar plan" : "Crear plan"}
            >
              <IconPlus size={18} />
            </Button>

            <Button
              variant="subtle"
              color="red"
              onClick={() => onDelete(pu)}
              title="Eliminar registro"
            >
              <IconTrash size={18} />
            </Button>
          </Group>
        </td>
      </tr>

      {showAccordion && (
        <tr>
          <td colSpan="8">
            <UserPlansAccordionCreate pu={pu} onPlanCreated={() => setShowAccordion(false)} />
          </td>
        </tr>
      )}
    </>
  );
}
