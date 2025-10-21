import React, { useState } from "react";
import dayjs from "dayjs";
import "./UserTable.css";
import { Table, Text, Button, Group, Accordion, Card } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export function UserTable({ users, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(null);

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Table highlightOnHover className="user-table admin-page">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Email</th>
          <th>Plan</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Expira</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((pu) => (
          <React.Fragment key={`${pu.user.id}-${pu.plan.id}`}>
            <tr> 
              <td>{pu.id}</td>
              <td>{pu.user.name}</td>
              <td>{pu.user.email}</td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => handleExpand(pu.id_plans_user)}
              >
                <Group gap={6} align="center" justify="center">
                  {pu.plan.name}
                  <IconPlus
                    className="icon-plus"
                    size={18}
                    style={{
                      color:
                        expanded === pu.id_plans_user ? "#f5b301" : "#aaa",
                    }}
                  />
                </Group>
              </td>
              <td>${pu.plan.price}</td>
              <td>
                <Text fw={700} color={pu.status === "active" ? "green" : "red"}>
                  {pu.status === "active" ? "Activo" : "Inactivo"}
                </Text>
              </td>
              <td>
                {pu.expiration_date
                  ? dayjs(pu.expiration_date).format("DD/MM/YYYY")
                  : null}
              </td>
              <td>
                <Group spacing="xs" justify="center">
                  <Button
                    size="xs"
                    color="blue"
                    variant="light"
                    onClick={() => onEdit(pu)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    variant="light"
                    onClick={() => onDelete(pu)}
                  >
                    Eliminar
                  </Button>
                </Group>
              </td>
            </tr>

            {expanded === pu.id_plans_user && (
              <tr className="accordion-row">
                <td colSpan="7">
                  <Accordion variant="contained" className="accordion-inside">
                    <Accordion.Item value="form" className="accordion-item">
                      <Accordion.Control className="accordion-control">
                        Plan personalizado de{" "}
                        <span style={{ color: "#f5b301" }}>{pu.user.name}</span>
                      </Accordion.Control>
                      <Accordion.Panel className="accordion-panel">
                        Aquí podrás cargar los datos del plan de alimentación
                        y ejercicio personalizados para este usuario.
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </td>
              </tr>
            )}

          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
}
