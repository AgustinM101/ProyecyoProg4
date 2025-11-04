// src/pages/AdminPage/SolicitudesPagoPage.jsx
import { useEffect, useState } from "react";
import { Table, Card, Text, Loader, Group, Button } from "@mantine/core";
import { AdminNavbar } from "../../components/Admin/AdminNavbar";

import { IconCheck, IconX } from "@tabler/icons-react";
import "./SolicitudesPagoPage.css";
import { plansUserService } from "../../services/plansUserService";

export function SolicitudesPagoPage() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);


 



  const fetchSolicitudes = async () => {
    try {
      const response = await plansUserService.getPlansUsers();
      const data = response.data.filter((pu) => pu.status === "paymentRequest");
      setSolicitudes(data);
    } catch (error) {
      console.error("Error cargando solicitudes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

const aceptarSolicitud = async (pu) => {
  try {
    // Convertimos expiration_date a string SQL si existe, o null
    let expiration = pu.expiration_date
      ? new Date(pu.expiration_date).toISOString().slice(0, 19).replace("T", " ")
      : null;

    await plansUserService.updatePlan(pu.id, {
      status: "chargePending",
      expiration_date: expiration,
    });

    fetchSolicitudes();
  } catch (err) {
    console.error(err);
    alert("❌ Error al aceptar solicitud");
  }
};








  const rechazarSolicitud = async (id) => {
    try {
      await plansUserService.deletePlan(id);
      fetchSolicitudes();
    } catch (err) {
      console.error(err);
      alert("❌ Error al rechazar solicitud");
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="solicitudes-loader">
          <Loader color="#f5b301" size="xl" />
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="solicitudes-background admin-page">
        <Card shadow="sm" p="lg" radius="md" className="solicitudes-card">
          <Group justify="space-between" mb="md">
            <Text size="xl" fw={700} c="#f5b301">
              💰 Solicitudes de Pago de Clientes
            </Text>
            <Text c="#ccc">Total: {solicitudes.length}</Text>
          </Group>

          {solicitudes.length > 0 ? (
            <div className="solicitudes-table-container">
              <Table striped highlightOnHover withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Fecha</Table.Th>
                    <Table.Th>Mensaje</Table.Th>
                    <Table.Th>Acciones</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {solicitudes.map((pu) => (
                    <Table.Tr key={pu.id}>
                      <Table.Td>
                        {new Date(pu.created_at).toLocaleString("es-AR")}
                      </Table.Td>

                      <Table.Td>
                        {pu.user?.name
                          ? `${pu.user.name} solicita ser cliente del plan ${pu.plan?.name ?? "N/A"}`
                          : "Solicitud sin información"}
                      </Table.Td>

                      <Table.Td>
                        <Group>
                          <Button
                            size="xs"
                            color="green"
                            leftSection={<IconCheck size={16} />}
                            onClick={() => aceptarSolicitud(pu)}
                          >
                            Aceptar
                          </Button>

                          <Button
                            size="xs"
                            color="red"
                            leftSection={<IconX size={16} />}
                            onClick={() => rechazarSolicitud(pu.id)}
                          >
                            Rechazar
                          </Button>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          ) : (
            <Text c="#ccc">No hay solicitudes pendientes.</Text>
          )}
        </Card>
      </div>
    </>
  );
}
