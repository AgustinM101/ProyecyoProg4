import { Accordion, Container, Grid, Image, Title } from '@mantine/core';
import './Faqs.css'; 

export function Faqs() {
  return (
    <div className="wrapper" id='faqs'>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image 
              src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757829935/pensamiento_tfyvbz.png" 
              alt="Preguntas Frecuentes logo" 
              className="faq-icon-blur"  
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="center" className="title">
              FAQS
            </Title>
            <p className="subtitle">
              <span className="preguntas">PREGUNTAS</span> <span className="frecuentes">FRECUENTES</span>
            </p>

            <Accordion
              chevronPosition="right"
              defaultValue="plan-phav"
              variant="default"
            >
              <Accordion.Item className="item" value="plan-phav">
                <Accordion.Control>¿Qué incluye el plan PHAV?</Accordion.Control>
                <Accordion.Panel>
                  El plan PHAV incluye entrenamientos personalizados, planes nutricionales semanales y seguimiento de progreso con nuestro equipo de profesionales.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className="item" value="experience">
                <Accordion.Control>¿Necesito experiencia previa para entrenar?</Accordion.Control>
                <Accordion.Panel>
                  No necesitas experiencia previa. Nuestros entrenadores adaptan los ejercicios a tu nivel y te guían paso a paso.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className="item" value="payment-methods">
                <Accordion.Control>¿Cuáles son las formas de pago?</Accordion.Control>
                <Accordion.Panel>
                  Aceptamos tarjeta de crédito, débito, transferencia bancaria y pagos a través de MercadoPago.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className="item" value="progress-tracking">
                <Accordion.Control>¿Cómo se hace el seguimiento de los avances?</Accordion.Control>
                <Accordion.Panel>
                  Podrás registrar tus entrenamientos, medidas y peso en nuestra app, y nuestros entrenadores revisarán tu progreso semanalmente.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
