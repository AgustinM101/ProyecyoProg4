<<<<<<< HEAD
import { Button, Group } from "@mantine/core";
import { IconCheck, IconTrash, IconEye, IconX } from "@tabler/icons-react";

export function UserRowConfirmarPago({ pu, onView, onConfirm, onReject }) {
  return (
    <tr>
      <td>{pu.id}</td>
      <td>{pu.user.name}</td>
      <td>{pu.user.email}</td>
      <td>{pu.plan?.name || "Sin plan"}</td>
      <td>{pu.plan?.price ? `$${pu.plan.price}` : "-"}</td>
      <td style={{ color: "orange", fontWeight: 700 }}>Confirmar pago</td>
      <td>{pu.expiration_date || "A definir"}</td>
      <td>
        <Group spacing="xs">
          {/* Ver formulario */}
=======
import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { IconCheck, IconTrash, IconEye, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";

export function UserRowConfirmarPago({ pu, onView, onConfirm, onReject }) {
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);

  const handleConfirm = async () => {
    setLoadingConfirm(true);
    try {
      await onConfirm(pu); // asumimos que onConfirm devuelve una promesa
    } finally {
      setLoadingConfirm(false);
    }
  };

  const handleReject = async () => {
    setLoadingReject(true);
    try {
      await onReject(pu); // asumimos que onReject devuelve una promesa
    } finally {
      setLoadingReject(false);
    }
  };

  return (
    <tr>
      <td>{pu.id}</td>
      <td>{pu.user?.name || pu.user_name}</td>
      <td>{pu.user?.email || pu.user_email}</td>
      <td>{pu.plan?.name || pu.plan_name || "Sin plan"}</td>
      <td>{pu.plan?.price ? `$${pu.plan.price}` : "-"}</td>
      <td style={{ color: "orange", fontWeight: 700 }}>Confirmar pago</td>
      <td>
        {pu.expiration_date
          ? dayjs(pu.expiration_date).format("DD/MM/YYYY")
          : "Expirado"}
      </td>
      <td>
        <Group spacing="xs">
>>>>>>> b8a5ec992ad9b8834b68e33b905f724b0cf2072e
          <Button
            variant="subtle"
            color="blue"
            onClick={() => onView(pu)}
            title="Ver formulario"
          >
            <IconEye size={18} />
          </Button>

<<<<<<< HEAD
          {/* Confirmar pago → cambia a activo */}
          <Button
            variant="subtle"
            color="green"
            onClick={() => onConfirm(pu.id)}
=======
          <Button
            variant="subtle"
            color="green"
            loading={loadingConfirm}
            disabled={loadingConfirm || loadingReject}
            onClick={handleConfirm}
>>>>>>> b8a5ec992ad9b8834b68e33b905f724b0cf2072e
            title="Confirmar pago"
          >
            <IconCheck size={18} />
          </Button>

<<<<<<< HEAD
          {/* Rechazar → cambia a finalizado */}
          <Button
            variant="subtle"
            color="red"
            onClick={() => onReject(pu.id)}
=======
          <Button
            variant="subtle"
            color="red"
            loading={loadingReject}
            disabled={loadingReject || loadingConfirm}
            onClick={handleReject}
>>>>>>> b8a5ec992ad9b8834b68e33b905f724b0cf2072e
            title="Rechazar pago"
          >
            <IconX size={16} />
          </Button>
        </Group>
      </td>
    </tr>
  );
}
