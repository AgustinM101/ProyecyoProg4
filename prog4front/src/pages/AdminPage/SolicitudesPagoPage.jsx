// src/pages/AdminPage/SolicitudesPagoPage.jsx
import { useEffect, useState } from "react";
import { Table, Card, Text, Group, Button, Loader } from "@mantine/core";
import { AdminNavbar } from "../../components/Admin/AdminNavbar";
import { IconCheck, IconX } from "@tabler/icons-react";
import "./SolicitudesPagoPage.css";
import { plansUserService } from "../../services/plansUserService";
import dayjs from "dayjs";

// ✅ Importamos el loader global
import { AdminPageLoader } from "../../components/Admin/AdminPageLoader";

export function SolicitudesPagoPage() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(null);

  const fetchSolicitudes = async () => {
    try {
      const response = await plansUserService.getPlansUsers();
      const data = response.data.filter((pu) => pu.status === "paymentRequest");

      const completas = await Promise.all(
        data.map(async (pu) => {
          try {
            const detalle = await plansUserService.getByUserId(pu.id_user);
            const info = detalle.data[0];

            return {
              ...pu,
              created_at: info?.created_at,
              user: {
                name: info?.user_name,
                email: info?.user_email,
              },
              plan: {
                name: info?.plan_name,
              },
            };
          } catch {
            return { ...pu, created_at: pu.created_at };
          }
        })
      );

      setSolicitudes(completas);
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
    setLoadingAction(pu.id);
    try {
      const expiration = pu.expiration_date
        ? new Date(pu.expiration_date).toISOString().slice(0, 19).replace("T", " ")
        : null;

      await plansUserService.updatePlan(pu.id, {
        status: "chargePending",
        expiration_date: expiration,
      });

      alert("✅ Solicitud aceptada correctamente");
      fetchSolicitudes();
    } catch {
      alert("❌ Error al aceptar solicitud");
    } finally {
      setLoadingAction(null);
    }
  };

  const rechazarSolicitud = async (id) => {
    setLoadingAction(id);
    try {
      await plansUserService.deletePlan(id);
      alert("✅ Solicitud rechazada correctamente");
      fetchSolicitudes();
    } catch {
      alert("❌ Error al rechazar solicitud");
    } finally {
      setLoadingAction(null);
    }
  };

  // ✅ Reemplazo del loader anterior por el global
  if (loading) {
    return (
      <>
        <AdminNavbar />
        <AdminPageLoader color="#f5b301" />
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
                        {pu.created_at
                          ? dayjs(pu.created_at).format("DD/MM/YYYY HH:mm:ss")
                          : "Sin fecha"}
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
                            leftSection={
                              loadingAction === pu.id ? (
                                <Loader size="xs" />
                              ) : (
                                <IconCheck size={16} />
                              )
                            }
                            onClick={() => aceptarSolicitud(pu)}
                            disabled={loadingAction === pu.id}
                          >
                            Aceptar
                          </Button>

                          <Button
                            size="xs"
                            color="red"
                            leftSection={
                              loadingAction === pu.id ? (
                                <Loader size="xs" />
                              ) : (
                                <IconX size={16} />
                              )
                            }
                            onClick={() => rechazarSolicitud(pu.id)}
                            disabled={loadingAction === pu.id}
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
