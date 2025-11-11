import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash, IconEye } from "@tabler/icons-react";
import { UserPlansAccordion } from "./UserPlansAccordion";
import dayjs from "dayjs";

export function UserRowPendiente({ pu, onEdit, onDelete, onView, onActivate }) {
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
                            Ver Formulario
                        </Button>

                        <Button
                            variant="subtle"
                            color="yellow"
                            onClick={() => onEdit(pu)}
                            title="Editar plan"
                        >
                            Editar Estado/Fecha
                        </Button>

                        <Button
                            variant="subtle"
                            color="green"
                            onClick={handleToggleAccordion}
                            title={showAccordion ? "Ocultar plan" : "Crear plan"}
                        >
                            Agregar plan
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
                            action="create"
                            plansUserId={pu.id}
                            onFinish={() => setShowAccordion(false)}
                            onActivate={() => onActivate(pu.id)}
                        />
                    </td>
                </tr>
            )}
        </>
    );
}