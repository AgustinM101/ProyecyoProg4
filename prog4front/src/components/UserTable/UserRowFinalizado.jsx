import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { IconEye, IconTrash, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { UserPlansAccordion } from "./UserPlansAccordion";
import { ActionsMenu } from "./ActionsMenu";

export function UserRowFinalizado({ pu, onView, onDelete }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <tr>
                <td>{pu.id}</td>
                <td>{pu.user?.name ?? pu.user_name}</td>
                <td>{pu.user?.email ?? pu.user_email}</td>
                <td>{pu.plan?.name ?? pu.plan_name ?? "Sin plan"}</td>
         
                <td style={{ color: "gray", fontWeight: 700 }}>Finalizado</td>
                <td>
                    {pu.expiration_date
                        ? dayjs(pu.expiration_date).format("DD/MM/YYYY")
                        : "A definir"}
                </td>
                <td>
                    <ActionsMenu
                        items={[
                            {
                                label: "Ver Formulario",
                                icon: <IconEye size={16} />,
                                onClick: () => onView(pu),
                            },
                            {
                                label: expanded ? "Ocultar planes" : "Ver planes",
                                icon: <IconPlus size={16} />,
                                onClick: () => setExpanded((prev) => !prev),
                            },
                            {
                                label: "Eliminar",
                                icon: <IconTrash size={16} />,
                                color: "red",
                                onClick: () => onDelete(pu),
                            },
                        ]}
                    />
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