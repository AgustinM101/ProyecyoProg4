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
      {/* Header común */}
      <HeaderMenu />

      <div className="competicion-wrapper">
        <Container size="md" className="competicion-container">
          <Card shadow="xl" padding="lg" radius="lg" className="competicion-card">

            <div className="competicion-logo-container">
              <img
                src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757462534/logo_nuevo_infinit_sports_nsmg9n.png"
                alt="Logo del Gym"
                className="competicion-logo"
              />
            </div>

            <Title order={2} className="competicion-title">
              PLAN COMPETICIÓN
            </Title>

            <Text size="lg" className="competicion-description">
              {plan.description}
              <br /><br />
              Si estás preparado para dar el siguiente paso, podés ponerte en contacto 
              directamente con nuestro equipo vía WhatsApp.
            </Text>

            <div className="competicion-actions">
              <Button
                component="a"
                href="https://wa.me/542346551210?text=Hola%2C%20estoy%20interesado%20en%20el%20Plan%20Competici%C3%B3n%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                radius="md"
                className="competicion-btn"
              >
                Contactar por WhatsApp
              </Button>
            </div>
          </Card>
        </Container>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
