import { Table, Button, Group, Card, Title, Loader } from "@mantine/core";
import { IconTrash, IconEye } from "@tabler/icons-react";
import { useState } from "react";
import { AdminNavbar } from "./AdminNavbar";
import "./FormularioList.css";

export function FormularioList({ formularios, onVer, onEliminar }) {
  

  if (formularios.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "gray" }}>
        No hay formularios cargados.
      </p>
    );

  }

  return (
    <div className="tabla-vertical-container">
      {formularios.map((form) => (
        <Card key={form.id} className="tabla-vertical-card">
          <Title order={4} className="tabla-vertical-titulo">
            Formulario #{form.id}
          </Title>

          <Table className="tabla-vertical">
            <Table.Tbody>
              <Table.Tr>
                <Table.Th>Nombre</Table.Th>
                <Table.Td>{form.nombre}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Edad</Table.Th>
                <Table.Td>{form.edad}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Sexo</Table.Th>
                <Table.Td>{form.sexo}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Altura</Table.Th>
                <Table.Td>{form.altura}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Peso actual</Table.Th>
                <Table.Td>{form.peso_actual}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Peso deseado</Table.Th>
                <Table.Td>{form.peso_deseado}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Actividad física</Table.Th>
                <Table.Td>{form.actividad_fisica}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Antecedentes médicos</Table.Th>
                <Table.Td>{form.antecedentes_medicos}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Alergias</Table.Th>
                <Table.Td>{form.alergias}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Medicamentos</Table.Th>
                <Table.Td>{form.medicamentos}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Problemas digestivos</Table.Th>
                <Table.Td>{form.problemas_digestivos}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Comidas diarias</Table.Th>
                <Table.Td>{form.comidas_diarias}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Alimentos a evitar</Table.Th>
                <Table.Td>{form.alimentos_evitar}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Horarios comidas</Table.Th>
                <Table.Td>{form.horarios_comidas}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Consumo de agua</Table.Th>
                <Table.Td>{form.consumo_agua}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Consumo de alcohol</Table.Th>
                <Table.Td>{form.consumo_alcohol}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Fecha de registro</Table.Th>
                <Table.Td>{form.fecha_registro}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>

          <Group justify="center" mt="md">
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
        </Card>
      ))}
    </div>
  );
}
