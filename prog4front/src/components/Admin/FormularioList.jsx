import { Table, Button, Group } from "@mantine/core";
import { IconTrash, IconEye } from "@tabler/icons-react";

export function FormularioList({ formularios, onVer, onEliminar }) {
  return (
    <Table
      striped
      highlightOnHover
      withColumnBorders
      style={{
        backgroundColor: "#1A1A1A",
        color: "white",
        borderRadius: "8px",
      }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Usuario</Table.Th>
          <Table.Th>Edad</Table.Th>
          <Table.Th>Objetivo</Table.Th>
          <Table.Th>Experiencia</Table.Th>
          <Table.Th>Fecha envío</Table.Th>
          <Table.Th>Acciones</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {formularios.length === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={7} style={{ textAlign: "center", color: "gray" }}>
              No hay formularios cargados.
            </Table.Td>
          </Table.Tr>
        ) : (
          formularios.map((form) => (
            <Table.Tr key={form.id}>
              <Table.Td>{form.id}</Table.Td>
              <Table.Td>{form.usuario}</Table.Td>
              <Table.Td>{form.edad}</Table.Td>
              <Table.Td>{form.objetivo}</Table.Td>
              <Table.Td>{form.experiencia}</Table.Td>
              <Table.Td>{form.fecha_envio}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Button
                    size="xs"
                    color="#FF6600"
                    variant="light"
                    onClick={() => onVer(form)}
                  >
                    <IconEye size={16} />
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    variant="light"
                    onClick={() => onEliminar(form.id)}
                  >
                    <IconTrash size={16} />
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))
        )}
      </Table.Tbody>
    </Table>
  );
}
