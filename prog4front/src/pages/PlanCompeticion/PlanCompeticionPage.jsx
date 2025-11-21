import { Container, Title, Text, Card, Button, Loader, Center } from "@mantine/core";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import "./PlanCompeticionPage.css";
import { useEffect, useState } from "react";
import { plansService } from "../../services/plansService";

export function PlanCompeticionPage() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const response = await plansService.getPlanCompeticionId();
        setPlan(response.data);
      } catch (error) {
        console.error("Error al traer el plan Competicion:", error);
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
        <Text>No se encontró el plan Competicion.</Text>
      </Center>
    );
  }

  return (
    <>
      <HeaderMenu />

      <div className="competicion-wrapper">
        <Container size="lg" className="competicion-container">
          <Card className="competicion-card">

            <div className="competicion-layout">

              {/* IMAGEN */}
              <div className="competicion-image">
                <img
                  src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1763758600/foto_vmfjkx.jpg"
                  alt="Plan competición"
                />
              </div>

              {/* INFO */}
              <div className="competicion-info">

                <Title className="competicion-title">
                  PLAN COMPETICIÓN
                </Title>

                <Text className="competicion-subtitle">
                  Preparación avanzada para atletas comprometidos
                </Text>

                <ul className="competicion-benefits">
                  <li>🏋️ Rutinas personalizadas según tu categoría</li>
                  <li>📈 Seguimiento y ajustes semanales</li>
                  <li>🥗 Asesoramiento nutricional específico</li>
                  <li>🎯 Estrategia completa para escenarios competitivos</li>
                </ul>

                <Button
                  component="a"
                  href="https://wa.me/542346551210?text=Hola%2C%20estoy%20interesado%20en%20el%20Plan%20Competici%C3%B3n"
                  target="_blank"
                  size="lg"
                  className="competicion-btn"
                >
                  Contactar por WhatsApp
                </Button>

              </div>
            </div>

          </Card>
        </Container>
      </div>

      <Footer />
    </>
  );
}
