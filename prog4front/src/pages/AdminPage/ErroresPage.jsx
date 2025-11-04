// src/pages/AdminPage/ErroresPage.jsx
import { useEffect, useState } from "react";
import { Table, Card, Text, Group, Badge } from "@mantine/core";
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
        console.log("Respuesta logs:", response);
        const erroresFiltrados = response.data
        
          .filter((l) => Boolean(l.is_alert))
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

  // Texto según severidad
  const getSeverityText = (sev) => {
    switch (Number(sev)) {
      case 3:
        return "Alta";
      case 2:
        return "Media";
      default:
        return "Baja";
    }
  };

  // Color según severidad
  const getSeverityColor = (sev) => {
    switch (Number(sev)) {
      case 3:
        return "red";
      case 2:
        return "orange";
      default:
        return "gray";
    }
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
                  {errores.map((e, index) => {
                    const sevText = getSeverityText(e.severity);
                    const sevColor = getSeverityColor(e.severity);

                    return (
                      <Table.Tr key={index}>
                        <Table.Td>
                          {new Date(e.created_at).toLocaleString("es-AR")}
                        </Table.Td>

                        <Table.Td>{e.text}</Table.Td>

                        <Table.Td>
                          <Badge color={sevColor}>{sevText}</Badge>
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
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
