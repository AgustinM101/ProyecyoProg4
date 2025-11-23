import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { IconPlus, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { ActionsMenu } from "./ActionsMenu";
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
                    <ActionsMenu
                        items={[
                            {
                                label: "Ver Formulario",
                                icon: <IconEye size={16} />,
                                onClick: () => onView(pu),
                            },
                            {
                                label: "Editar Estado/Fecha",
                                icon: <IconPencil size={16} />,
                                onClick: () => onEdit(pu),
                            },
                            {
                                label: showAccordion ? "Ocultar plan" : "Ver/Editar planes",
                                icon: <IconPlus size={16} />,
                                onClick: handleToggleAccordion,
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
}