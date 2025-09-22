import { Container, Card, Title, Text, Group, Divider } from "@mantine/core";
import { IconUser, IconMail, IconPhone, IconCreditCard, IconCalendar, IconClockHour4 } from "@tabler/icons-react";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import "./ProfilePage.css";

export function ProfilePage() {
  // Recuperamos datos del localStorage
  const userData = JSON.parse(localStorage.getItem("userProfile"));

  return (
    <>
      <HeaderMenu />

      <div className="profile-wrapper">
        <Container size="md" className="profile-container">
          <Card shadow="xl" radius="lg" padding="xl" className="profile-card">
            <Title order={2} className="profile-title">
              Mi Perfil
            </Title>

            {!userData ? (
              <Text>No hay datos de usuario. Por favor realiza una compra.</Text>
            ) : (
              <div className="profile-info">
                <Group spacing="md">
                  <IconUser size={24} className="profile-icon" />
                  <Text><strong>Nombre:</strong> {userData.nombre}</Text>
                </Group>

                <Group spacing="md">
                  <IconMail size={24} className="profile-icon" />
                  <Text><strong>Email:</strong> {userData.email}</Text>
                </Group>

                <Group spacing="md">
                  <IconPhone size={24} className="profile-icon" />
                  <Text><strong>Teléfono:</strong> {userData.telefono}</Text>
                </Group>

                <Divider my="md" />

                <Group spacing="md">
                  <IconCreditCard size={24} className="profile-icon" />
                  <Text><strong>Método de pago:</strong> {userData.paymentMethod}</Text>
                </Group>

                <Group spacing="md">
                  <IconCalendar size={24} className="profile-icon" />
                  <Text><strong>Fecha de compra:</strong> {userData.fechaCompra}</Text>
                </Group>

                <Group spacing="md">
                  <IconClockHour4 size={24} className="profile-icon" />
                  <Text><strong>Duración:</strong> 3 meses</Text>
                </Group>

                <Group spacing="md">
                  <Text><strong>Plan adquirido:</strong> {userData.plan}</Text>
                </Group>
              </div>
            )}
          </Card>
        </Container>
      </div>

      <Footer />
    </>
  );
}

