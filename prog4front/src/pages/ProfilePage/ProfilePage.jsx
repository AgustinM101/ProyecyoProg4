import { Container, Card, Title, Text, Stack, Button, Group } from "@mantine/core";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import "./ProfilePage.css";

export function ProfilePage() {
  // Simulación de datos de usuario
  const user = {
    nombre: "Norberto E. Díaz",
    email: "norberto@example.com",
    telefono: "+54 234 6551210",
    plan: "Plan PHAV",
  };

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
              <Text><strong>Nombre:</strong> {user.nombre}</Text>
              <Text><strong>Email:</strong> {user.email}</Text>
              <Text><strong>Teléfono:</strong> {user.telefono}</Text>
              <Text><strong>Plan contratado:</strong> {user.plan}</Text>

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
