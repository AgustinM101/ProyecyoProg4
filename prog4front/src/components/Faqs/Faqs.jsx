import { Accordion, Container, Grid, Image, Title } from '@mantine/core';
import './Faqs.css'; 

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';

export function Faqs() {
  return (
    <div className="wrapper" id='faqs'>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Image src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757829935/pensamiento_tfyvbz.png" 
                    alt="Preguntas Frecuentes logo" 
                    className="faq-icon-blur"  
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Title  order={2} ta="center" className="title">
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
                    <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className="item" value="experience">
                    <Accordion.Control>¿Necesito experiencia previa para entrenar?</Accordion.Control>
                    <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className="item" value="payment-methods">
                    <Accordion.Control>
                        ¿Cuáles son las formas de pago?
                    </Accordion.Control>
                    <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className="item" value="progress-tracking">
                    <Accordion.Control>
                        ¿Cómo se hace el seguimiento de los avances?
                    </Accordion.Control>
                    <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
