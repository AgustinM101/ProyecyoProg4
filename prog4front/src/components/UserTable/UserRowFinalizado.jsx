import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { IconEye, IconTrash, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { UserPlansAccordion } from "./UserPlansAccordion";

export function UserRowFinalizado({ pu, onView, onDelete }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <tr>
                <td>{pu.id}</td>
                <td>{pu.user?.name ?? pu.user_name}</td>
                <td>{pu.user?.email ?? pu.user_email}</td>
                <td>{pu.plan?.name ?? pu.plan_name ?? "Sin plan"}</td>
                <td>{pu.plan?.price ? `$${pu.plan.price}` : "-"}</td>
                <td style={{ color: "gray", fontWeight: 700 }}>Finalizado</td>
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
                            color="green"
                            onClick={() => setExpanded((prev) => !prev)}
                            title="Ver planes del usuario"
                        >
                            Ver planes
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

            {expanded && (
                <tr>
                    <td colSpan="8">
                        <UserPlansAccordion action="read" plansUserId={pu.id} />
                    </td>
                </tr>
            )}
        </>
    );
}