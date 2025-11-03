import { Card, Text, Title, Divider, Stack, Group, Badge } from "@mantine/core";

export function MyPlansActivo({ pu, onView }) {
  return (
    <tr>
      <td>{pu.id}</td>
      <td>{pu.plan_name || pu.plan?.name || "Sin plan"}</td>
      <td>
        <Badge color="green" radius="sm" variant="filled">
          Activo
        </Badge>
      </td>
      <td>{pu.expiration_date || "Sin fecha"}</td>
      <td>
        <Text
          onClick={() => onView(pu)}
          style={{
            color: "#1c7ed6",
            fontWeight: 500,
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Ver detalle
        </Text>
      </td>
    </tr>
  );
}

