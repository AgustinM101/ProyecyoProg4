import { Container, Title, Text, Card, Button } from "@mantine/core";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import "./PlanCompeticionPage.css";

export function PlanCompeticionPage() {
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
              El plan de Competición está diseñado para quienes buscan ingresar al equipo 
              competitivo de fisicoculturismo. Este programa exige cumplir con condiciones 
              físicas y disciplina estricta para alcanzar los objetivos planteados y competir 
              al máximo nivel. <br /><br />
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
