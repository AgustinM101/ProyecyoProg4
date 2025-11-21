import { Container, Title, Text, Card, Button, Group, Divider, Center, Loader } from "@mantine/core";
import { IconClockHour4, IconCurrencyDollar, IconBarbell } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import "./PlanPhavPage.css";
import { useEffect, useState } from "react";
import { plansService } from "../../services/plansService";
import { PurchaseModal } from "../../components/Purchase/PurchaseModal";

export function PlanPhavPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBuy = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setOpen(true);
    } else {
      navigate("/login");
    }
  };

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
      <PurchaseModal opened={open} onClose={() => setOpen(false)} plan={plan} />

      <HeaderMenu />

      <div className="phav-wrapper">
        <Container size="md" className="phav-container">
          <Card shadow="xl" padding="lg" radius="lg" className="phav-card">

            <Title order={1} className="phav-title">
              {plan.name}
            </Title>
            <div className="phav-title-line"></div>


            <Text className="phav-subtitle">
              Plan profesional enfocado en rendimiento, fuerza y transformación física
            </Text>

            <Text className="phav-description">
              {plan.description}
            </Text>
            <div className="phav-benefits">
              <div className="phav-benefit">
                ✅ Seguimiento personalizado
              </div>
              <div className="phav-benefit">
                ✅ Rutinas progresivas
              </div>
              <div className="phav-benefit">
                ✅ Evaluación mensual
              </div>
              <div className="phav-benefit">
                ✅ Guía nutricional básica
              </div>
            </div>


            <Divider my="lg" />

            <Group className="phav-details">
              <div className="phav-item">
                <IconBarbell size={30} className="phav-icon" />
                <div>
                  <Text fw={700}>Entrenamiento</Text>
                  <Text>5 días semanales</Text>
                </div>
              </div>


              <div className="phav-item">
                <IconClockHour4 size={34} className="phav-icon" />
                <div>
                  <Text fw={700}>Duración</Text>
                  <Text>3 meses renovable</Text>
                </div>
              </div>

              <div className="phav-item">
                <IconBarbell size={30} className="phav-icon" />
                <div>
                  <Text fw={700}> Entrenamiento</Text>
                  <Text>5 días semanales</Text>
                </div>
              </div>
            </Group>

            <Button size="lg" className="phav-btn" onClick={handleBuy}>
              Contratar Plan
            </Button>

          </Card>
        </Container>
      </div>

      <Footer />
    </>
  );
}
