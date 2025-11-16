
import { Container, Title, Text, Card, Button, Group, Divider, Center, Loader } from "@mantine/core";
import { IconClockHour4, IconCurrencyDollar } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import "./PlanPhavPage.css";
import { useEffect, useState } from "react";
import { plansService } from "../../services/plansService";
import { PurchaseModal } from "../../components/Purchase/PurchaseModal"; // importa el modal 
 

export function PlanPhavPage() {
  const navigate = useNavigate();

  // 👇 estado nuevo para controlar si el modal está abierto
  const [open, setOpen] = useState(false);

  const handleBuy = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // 👇 si el usuario está logueado, abrimos el modal
      setOpen(true);
    } else {
      // 👇 si no está logueado, lo mandamos al login
      navigate("/login");
    }
  };

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const response = await plansService.getPlanPhavId();
        setPlan(response.data);
      } catch (error) {
        console.error("Error al traer el plan PHAV:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlan();
  }, []);

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader />
      </Center>
    );
  }

  if (!plan) {
    return (
      <Center style={{ height: "100vh" }}>
        <Text>No se encontró el plan PHAV.</Text>
      </Center>
    );
  }

  return (
    <>
      {/*  el modal recibe las props opened y onClose */}
      <PurchaseModal opened={open} onClose={() => setOpen(false)} plan={plan} />

      <HeaderMenu />

      <div className="phav-wrapper">
        <Container size="md" className="phav-container">
          <Card shadow="xl" padding="lg" radius="lg" className="phav-card">
            <div className="phav-logo-container">
              <img
                src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757462534/logo_nuevo_infinit_sports_nsmg9n.png"
                alt="Logo del Gym"
                className="phav-logo"
              />
            </div>

            <Title order={2} className="phav-title">
              {plan?.name?.toUpperCase() || ""}

            </Title>

            <Text size="lg" className="phav-description">
              {plan.description}
            </Text>

            <Divider my="md" />

            <Group className="phav-details" direction="column" spacing="md">
              <div className="phav-item">
                <IconCurrencyDollar size={30} className="phav-icon" />
                <div>
                  <Text fw={700}>Precio</Text>
                  <Text>${plan.price} / mes</Text>
                </div>
              </div>

              <div className="phav-item">
                <IconClockHour4 size={30} className="phav-icon" />
                <div>
                  <Text fw={700}>Duración</Text>
                  <Text>3 meses (renovable)</Text>
                </div>
              </div>

              <div className="phav-item">
                <div>
                  <Text fw={700}>Entrenamiento</Text>
                  <Text>5 días por semana</Text>
                </div>
              </div>
            </Group>

            <Divider my="md" />

            <Group position="center" spacing="md" mt="lg">
              {/* 👇 este botón usa el handleBuy con setOpen */}
              <Button size="lg" radius="md" className="phav-btn" onClick={handleBuy}>
                Comprar plan
              </Button>

              <Button
                size="lg"
                variant="outline"
                radius="md"
                color="gray"
                onClick={() => navigate("/plansforms")}
              >
                Volver a planes
              </Button>
            </Group>
          </Card>
        </Container>
      </div>

      <Footer />
    </>
  );
}