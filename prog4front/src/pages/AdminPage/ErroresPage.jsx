// src/pages/AdminPage/ErroresPage.jsx
import { useEffect, useState } from "react";
import { Table, Card, Text, Loader, Group, Badge } from "@mantine/core";
import { logsService } from "../../services/logsService";
import { AdminNavbar } from "../../components/Admin/AdminNavbar";
import "./ErroresPage.css";

export function ErroresPage() {
  const [errores, setErrores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchErrores() {
      try {
        const response = await logsService.getLogs();
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

  // 🔍 Generar severidad visual según el texto
  const getSeverity = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("error") || lower.includes("crítico")) return "Alta";
    if (lower.includes("falló") || lower.includes("advertencia")) return "Media";
    return "Baja";
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Alta":
        return "red";
      case "Media":
        return "orange";
      default:
        return "gray";
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="errores-loader">
          <Loader color="#f5b301" size="xl" />
        </div>
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
                    const sev = getSeverity(e.text);
                    return (
                      <Table.Tr key={index}>
                        <Table.Td>
                          {new Date(e.created_at).toLocaleString("es-AR")}
                        </Table.Td>
                        <Table.Td>{e.text}</Table.Td>
                        <Table.Td>
                          <Badge color={getSeverityColor(sev)}>{sev}</Badge>
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
