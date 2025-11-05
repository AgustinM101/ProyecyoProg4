<<<<<<< HEAD
// UserRowActivo.jsx
import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash, IconEye } from "@tabler/icons-react";
import { UserPlansAccordion } from "./UserPlansAccordion";

export function UserRowActivo({ pu, onEdit, onDelete, onView }) {
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
        <td style={{ color: "green", fontWeight: 700 }}>Activo</td>
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
              title={showAccordion ? "Ocultar plan" : "Ver plan"}
            >
              <IconPlus size={18} />
            </Button>

            <Button
              variant="subtle"
              color="red"
              onClick={() => onDelete(pu)} // pasa todo el objeto
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
            <UserPlansAccordion pu={pu} />
          </td>
        </tr>
      )}
    </>
  );
=======
import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { IconPlus, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { UserPlansAccordion } from "./UserPlansAccordion";
import dayjs from "dayjs";

export function UserRowActivo({ pu, onEdit, onDelete, onView }) {
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
                <td style={{ color: "green", fontWeight: 700 }}>Activo</td>
                <td>
                    {pu.expiration_date
                        ? dayjs(pu.expiration_date).format("DD/MM/YYYY")
                        : "A definir"}
                </td>
                <td>
                    <Group spacing="xs">
                        <Button
                            variant="subtle"
                            color="blue"
                            onClick={() => onView(pu)}
                            title="Ver formulario"
                        >
                            <IconEye size={18} />
                        </Button>

                        <Button
                            variant="subtle"
                            color="yellow"
                            onClick={() => onEdit(pu)}
                            title="Editar plan"
                        >
                            <IconPencil size={18} />
                        </Button>

                        <Button
                            variant="subtle"
                            color="green"
                            onClick={handleToggleAccordion}
                            title={showAccordion ? "Ocultar plan" : "Ver plan"}
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
                        <UserPlansAccordion
                            action="update"
                            plansUserId={pu.id}
                            onFinish={() => setShowAccordion(false)}
                        />
                    </td>
                </tr>
            )}
        </>
    );
>>>>>>> b8a5ec992ad9b8834b68e33b905f724b0cf2072e
}
