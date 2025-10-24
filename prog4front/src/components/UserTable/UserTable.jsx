import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./UserTable.css";
import { Table, Text, Button, Group, Accordion, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";

export function UserTable({ users, onEdit, onDelete }) {
  return (
    <Table highlightOnHover className="user-table admin-page">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
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
          <UserRow pu={pu} key={`${pu.user.id}-${pu.plan.id}`} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </Table>
  );
}

function UserRow({ pu, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [planAlimento, setPlanAlimento] = useState({});
  const [planEjercicio, setPlanEjercicio] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const comidas = ["Desayuno", "Almuerzo", "Merienda", "Cena"];
  const tiposEjercicio = ["Fuerza", "Cardio", "Flexibilidad", "Descanso"];

  // Función para manejar cambios en el plan de alimentación
  const handleAlimentoChange = (dia, comida, value) => {
    setPlanAlimento((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [comida]: value },
    }));
  };

  // Función para manejar cambios en el plan de ejercicios
  const handleEjercicioChange = (dia, tipo, value) => {
    setPlanEjercicio((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [tipo]: value },
    }));
  };

  // Enviar datos a backend
  const handleEnviar = async () => {
    setLoading(true);
    try {
      // Preparamos los datos según tu backend
      const alimentosPayload = {
        plans_user_id: pu.plans_user_id,
        plan: planAlimento,
      };

      const ejerciciosPayload = {
        plans_user_id: pu.plans_user_id,
        plan: planEjercicio,
      };

      // Enviamos ambos en paralelo
      await Promise.all([
        planAlimentosService.createPlan(alimentosPayload),
        planEjerciciosService.createPlan(ejerciciosPayload),
      ]);

      alert("✅ Planes guardados correctamente");
    } catch (error) {
      console.error("Error al enviar los planes:", error);
      alert("❌ Error al guardar los planes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <tr>
        <td>{pu.id}</td>
        <td>{pu.user.name}</td>
        <td>{pu.user.email}</td>
        <td style={{ cursor: "pointer" }} onClick={toggleExpanded}>
          <Group gap={6} align="center" justify="center">
            {pu.plan.name}
            <IconPlus
              className="icon-plus"
              size={18}
              style={{ color: expanded ? "#f5b301" : "#aaa" }}
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
            <Button size="xs" color="blue" variant="light" onClick={() => onEdit(pu)}>
              Editar
            </Button>
            <Button size="xs" color="red" variant="light" onClick={() => onDelete(pu)}>
              Eliminar
            </Button>
          </Group>
        </td>
      </tr>

      {expanded && (
        <tr className="accordion-row">
          <td colSpan="8">
            <Accordion variant="contained" className="accordion-inside">
              <Accordion.Item value="form" className="accordion-item">
                <Accordion.Control className="accordion-control">
                  Plan personalizado de <span style={{ color: "#f5b301" }}>{pu.user.name}</span>
                </Accordion.Control>

                <Accordion.Panel className="accordion-panel">
                  <p>Completa los planes personalizados de alimentación y ejercicio para este usuario.</p>

                  {/* PLAN DE ALIMENTACIÓN */}
                  <h4 style={{ marginTop: "20px" }}>Plan Semanal de Alimentación</h4>
                  <Table striped withBorder>
                    <thead>
                      <tr>
                        <th>Comida</th>
                        {dias.map((dia) => (
                          <th key={dia}>{dia}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comidas.map((comida) => (
                        <tr key={comida}>
                          <td style={{ fontWeight: "bold" }}>{comida}</td>
                          {dias.map((dia) => (
                            <td key={dia}>
                              <TextInput
                                placeholder={`Detalle ${comida.toLowerCase()} de ${dia}`}
                                size="xs"
                                value={planAlimento[dia]?.[comida] || ""}
                                onChange={(e) =>
                                  handleAlimentoChange(dia, comida, e.currentTarget.value)
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* PLAN DE EJERCICIOS */}
                  <h4 style={{ marginTop: "25px" }}>Calendario Semanal de Ejercicios</h4>
                  <Table striped withBorder>
                    <thead>
                      <tr>
                        <th>Tipo</th>
                        {dias.map((dia) => (
                          <th key={dia}>{dia}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tiposEjercicio.map((tipo) => (
                        <tr key={tipo}>
                          <td style={{ fontWeight: "bold" }}>{tipo}</td>
                          {dias.map((dia) => (
                            <td key={dia}>
                              <TextInput
                                placeholder={`Ejercicio ${dia}`}
                                size="xs"
                                value={planEjercicio[dia]?.[tipo] || ""}
                                onChange={(e) =>
                                  handleEjercicioChange(dia, tipo, e.currentTarget.value)
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* BOTÓN DE ENVÍO */}
                  <Group mt="md" grow>
                    <Button color="green" onClick={handleEnviar} loading={loading}>
                      {loading ? "Enviando..." : "Guardar Planes"}
                    </Button>
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </td>
        </tr>
      )}
    </>
  );
}
