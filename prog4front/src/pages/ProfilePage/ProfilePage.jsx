import { useState, useEffect } from "react";
import { Container, Card, Title, Text, Stack, Button, Group } from "@mantine/core";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import "./ProfilePage.css";

export function ProfilePage() {
  const [user, setUser] = useState(null); // Estado para guardar los datos del backend
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    // Suponiendo que tu endpoint es /user/logged
    fetch("http://localhost:9091/user/logged", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Si usas token para autenticación:
        // "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al traer los datos del usuario");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <HeaderMenu />

      <div className="profile-wrapper">
        <Container size="sm">
          <Card className="profile-card" shadow="lg" padding="xl" radius="lg">
            <Title order={2} className="profile-title">
              Perfil de Usuario
            </Title>

            <Stack spacing="md" mt="lg">
              <Text><strong>Nombre:</strong> {user.name}</Text>
              <Text><strong>Email:</strong> {user.email}</Text>
              <Text><strong>Teléfono:</strong> {user.phone || "-"}</Text>
              <Text><strong>Plan contratado:</strong> {user.plan || "-"}</Text>

              <Group position="center" mt="xl">
                <Link to="/plans">
                  <Button variant="outline" radius="md">
                    Ver planes
                  </Button>
                </Link>
                <Button variant="filled" radius="md" color="#FFD60A">
                  Editar perfil
                </Button>
              </Group>
            </Stack>
          </Card>
        </Container>
      </div>

      <Footer />
    </>
  );
}
