import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { IconCheck, IconTrash, IconEye, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { ActionsMenu } from "./ActionsMenu";

export function UserRowConfirmarPago({ pu, onView, onConfirm, onReject }) {
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);

  const handleConfirm = async () => {
    setLoadingConfirm(true);
    try {
      await onConfirm(pu); // asumimos que onConfirm devuelve una promesa
      // notificar para que la tabla se refresque (padre puede escuchar)
      try {
        window.dispatchEvent(
          new CustomEvent("plansUser:refresh", {
            detail: { id: pu.id, action: "confirm" },
          })
        );
      } catch (e) {
        console.warn("dispatch plansUser:refresh failed", e);
      }
    } catch (e) {
      console.error("Error al confirmar pago:", e);
      throw e;
    } finally {
      setLoadingConfirm(false);
    }
  };

  const handleReject = async () => {
    setLoadingReject(true);
    try {
      await onReject(pu); // asumimos que onReject devuelve una promesa
      try {
        window.dispatchEvent(
          new CustomEvent("plansUser:refresh", {
            detail: { id: pu.id, action: "reject" },
          })
        );
      } catch (e) {
        console.warn("dispatch plansUser:refresh failed", e);
      }
    } catch (e) {
      console.error("Error al rechazar pago:", e);
      throw e;
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
      
      <td style={{ color: "orange", fontWeight: 700 }}>Expirado</td>
      <td>
        {pu.expiration_date
          ? dayjs(pu.expiration_date).format("DD/MM/YYYY")
          : "Expirado"}
      </td>
      <td>
        <ActionsMenu
          items={[
            {
              label: "Ver Formulario",
              icon: <IconEye size={16} />,
              onClick: () => onView(pu),
              disabled: loadingConfirm || loadingReject,
            },
            {
              // muestra estado de carga en la etiqueta y deshabilita mientras carga
              label: loadingConfirm ? "⏳ Confirmando..." : "Confirmar pago",
              icon: <IconCheck size={16} />,
              color: "green",
              onClick: handleConfirm,
              disabled: loadingConfirm || loadingReject,
            },
            {
              label: loadingReject ? "⏳ Rechazando..." : "Rechazar pago",
              icon: <IconX size={16} />,
              color: "red",
              onClick: handleReject,
              disabled: loadingReject || loadingConfirm,
            },
          ]}
        />
      </td>
    </tr>
  );
}
