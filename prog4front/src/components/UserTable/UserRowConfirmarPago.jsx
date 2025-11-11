
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
      <td style={{ color: "orange", fontWeight: 700 }}>Expirado</td>
      <td>
        {pu.expiration_date
          ? dayjs(pu.expiration_date).format("DD/MM/YYYY")
          : "Expirado"}
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
            loading={loadingConfirm}
            disabled={loadingConfirm || loadingReject}
            onClick={handleConfirm}
            title="Confirmar pago"
          >
            Confirmar pago
          </Button>

          <Button
            variant="subtle"
            color="red"
            loading={loadingReject}
            disabled={loadingReject || loadingConfirm}
            onClick={handleReject}
            title="Rechazar pago"
          >
            Rechazar pago
          </Button>
        </Group>
      </td>
    </tr>
  );
}
