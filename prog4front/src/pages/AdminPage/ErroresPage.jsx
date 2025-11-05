// src/pages/AdminPage/ErroresPage.jsx
import { useEffect, useState } from "react";
import { Table, Card, Text, Loader, Group, Badge } from "@mantine/core";
import { logsService } from "../../services/logsService";
import { AdminNavbar } from "../../components/Admin/AdminNavbar";
import "./ErroresPage.css";
import { AdminPageLoader } from "../../components/Admin/AdminPageLoader";

export function ErroresPage() {
  const [errores, setErrores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchErrores() {
      try {
        const response = await logsService.getLogs();

        // ✅ Filtramos solo los que son alerta
        const erroresFiltrados = response.data
          .filter((l) => l.is_alert === true)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setErrores(erroresFiltrados);
      } catch (error) {
        console.error("Error al cargar los errores:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchErrores();
  }, []);

  // ✅ Severidad en función del número (1,2,3)
  const getSeverityName = (sev) => {
    if (sev === 3) return "Alta";
    if (sev === 2) return "Media";
    if (sev === 1) return "Baja";
    return "-";
  };

  const getSeverityColor = (sev) => {
    if (sev === 3) return "red";
    if (sev === 2) return "orange";
    if (sev === 1) return "green";
    return "gray";
  };

  if (loading) {
    return (
      <>
              
        <AdminNavbar />
        <AdminPageLoader />
      
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="errores-background admin-page">
        <Card shadow="sm" p="lg" radius="md" className="errores-card">
          <Group justify="space-between" mb="md">
            <Text size="xl" fw={700} c="#f5b301">
              ⚠️ Registro de Errores del Sistema
            </Text>
            <Text c="#ccc">Total: {errores.length}</Text>
          </Group>

          {errores.length > 0 ? (
            <div className="errores-table-container">
              <Table striped highlightOnHover withTableBorder className="errores-table">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Fecha</Table.Th>
                    <Table.Th>Mensaje</Table.Th>
                    <Table.Th>Severidad</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {errores.map((e) => (
                    <Table.Tr key={e.id}>
                      <Table.Td>
                        {new Date(e.created_at).toLocaleString("es-AR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </Table.Td>

                      <Table.Td>{e.text}</Table.Td>
                      <Table.Td>
                        {e.severity ? (
                          <Badge color={getSeverityColor(e.severity)}>
                            {getSeverityName(e.severity)}
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          ) : (
            <Text c="#ccc">No hay errores registrados.</Text>
          )}
        </Card>
      </div>
    </>
  );
}
