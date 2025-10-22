import React, { use, useEffect, useState } from "react";
import dayjs from "dayjs";
import "./UserTable.css";
import { Table, Text, Button, Group, Accordion, Card } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";

export function UserTable({ users, onEdit, onDelete }) {
  

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
          <UserRow pu={pu} key={`${pu.user.id}-${pu.plan.id}`}/>
        ))}
      </tbody>
    </Table>
  );
}

function UserRow({pu}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const [alimentos, setAlimentos] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);

  async function fetchData(){
    // Cambiar las funciones getPlans() por una nueva funciion
    // que llame a la ruta que filtra por user_plan_id
    const [alimentosRes, ejerciciosRes] = await Promise.all([
      planAlimentosService.getPlans(),
      planEjerciciosService.getPlans()
    ]);

    setAlimentos(alimentosRes.data);
    setEjercicios(ejerciciosRes.data);
  }

  useEffect(() => {
    if(expanded && alimentos.length === 0 && ejercicios.length === 0){
      fetchData();
    }
  }, [expanded]);

  return <React.Fragment>
    <tr> 
      <td>{pu.id}</td>
      <td>{pu.user.name}</td>
      <td>{pu.user.email}</td>
      <td
        style={{ cursor: "pointer" }}
        onClick={() => toggleExpanded()}
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

    {expanded && (
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

                <div className="alimentosEjerciciosGrid">
                  <div>
                    <p>Alimentos</p>
                    <ul>
                      {alimentos.map((alimento) => (
                        <li key={alimento.id}>{alimento.name}</li>
                      ))}
                    </ul>
                  </div>

                 <div>
                   <p>Ejercicios</p>
                    <ul>
                      {ejercicios.map((ejercicio) => (
                        <li key={ejercicio.id}>{ejercicio.name}</li>
                      ))}
                    </ul>
                 </div>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </td>
      </tr>
    )}

  </React.Fragment>
}