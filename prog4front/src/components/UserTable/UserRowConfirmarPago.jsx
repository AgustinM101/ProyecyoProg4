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
          <Button
            variant="subtle"
            color="blue"
            onClick={() => onView(pu)}
            title="Ver formulario"
          >
            <IconEye size={18} />
          </Button>

          {/* Confirmar pago → cambia a activo */}
          <Button
            variant="subtle"
            color="green"
            onClick={() => onConfirm(pu.id)}
            title="Confirmar pago"
          >
            <IconCheck size={18} />
          </Button>

          {/* Rechazar → cambia a finalizado */}
          <Button
            variant="subtle"
            color="red"
            onClick={() => onReject(pu.id)}
            title="Rechazar pago"
          >
            <IconX size={16} />
          </Button>
        </Group>
      </td>
    </tr>
  );
}
