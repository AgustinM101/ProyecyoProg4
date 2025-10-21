import { 
  Container, Title, Text, Card, Group, Image, Button, Stack, ScrollArea, Divider 
} from "@mantine/core";
import { SimpleGrid } from "@mantine/core";
import { Footer } from "../../components/Footer/Footer";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu"; 
import "./Nosotros.css";

export function Nosotros() {
  return (
    <>
      <HeaderMenu />

      <section id="nosotros" className="nosotros-section">
        <Container size="lg" py="xl">
          <Card 
            className="nosotros-card" 
            shadow="xl" 
            radius="lg" 
            style={{
              backgroundColor: "#000",
              color: "#fff",
              border: "2px solid #d4af37",
              padding: "2rem"
            }}
          >
            <SimpleGrid 
              cols={{ base: 1, sm: 2 }} 
              spacing="xl" 
              align="center" 
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              
              {/* COLUMNA IMAGEN */}
              <Stack spacing="md" align="center">
                <Image
                  radius="md"
                  fit="contain"
                  src="https://res.cloudinary.com/del98x3di/image/upload/v1758065555/ABFDEA6E-476E-4720-9E6E-EC7F16E91A29_wc5q5z.jpg"
                  alt="Adrian Salvatori"
                  width={450}
                  height="auto"
                  style={{
                    border: "3px solid #d4af37",
                    borderRadius: "12px",
                    boxShadow: "0 0 15px #d4af37",
                  }}
                />

                <Button
                  component="a"
                  href="https://wa.me/5491123456789"
                  target="_blank"
                  variant="gradient"
                  gradient={{ from: "#d4af37", to: "#ffffff" }}
                  radius="md"
                  size="md"
                  style={{
                    fontWeight: "bold",
                    color: "#000",
                    boxShadow: "0 0 10px #d4af37",
                  }}
                >
                  CONTACTAME POR WHATSAPP
                </Button>
              </Stack>

              {/* COLUMNA TEXTO */}
              <ScrollArea h={600} type="auto" scrollbarSize={8}>
                <Stack spacing="lg">
                  <Title order={2} style={{ color: "#d4af37", fontWeight: 700 }}>
                    PREPARADOR FÍSICO Y ATLETA DE CULTURISMO NATURAL
                  </Title>

                  <Divider color="#d4af37" size="sm" />

                  <Text size="md" style={{ lineHeight: 1.7, textAlign: "justify" }}>
                    Soy preparador físico, atleta profesional de culturismo natural y especialista en nutrición aplicada al deporte. 
                    Cuento con diversas formaciones que respaldan mi trabajo: Preparador de culturismo (Federación Argentina de Musculación), 
                    Entrenamiento aplicado a la salud y la obesidad (JMI), Nutrición aplicada al deporte (JMI), Formación en la Academia de Entrenadores Online 
                    y Experto en culturismo natural (ECN). 
                    <br /><br />
                    Mi experiencia como competidor de culturismo natural me permite comprender tanto el proceso físico 
                    como el mental que atraviesan quienes buscan un cambio o se preparan para competir.
                    <br /><br />
                    Al iniciarme en el entrenamiento descubrí que mi verdadera pasión es ayudar a las personas a transformar su vida. 
                    Creo firmemente que los límites están en la mente y que, con disciplina, constancia, compromiso y amor por lo que hacemos, 
                    todo es posible. Con esta visión, fundé mi gimnasio el 14 de septiembre de 2020, con el objetivo de brindar un espacio donde 
                    mejorar la salud, cambiar hábitos, transformar el estilo de vida y formar atletas de culturismo natural.
                    <br /><br />
                    Nuestro gimnasio se sostiene en valores como disciplina, superación personal, salud y comunidad. 
                    Nuestra misión es cambiar la mentalidad de las personas, demostrando que todo objetivo puede cumplirse con constancia y compromiso, 
                    y nuestra visión es ser un referente en culturismo natural y en la promoción de un estilo de vida saludable y sostenible. 
                    <br /><br />
                    Personalmente, me considero atleta todo el año, manteniendo un estilo de vida saludable basado en alimentación consciente, 
                    entrenamiento constante y actividad física diaria de 10.000 a 12.000 pasos. 
                    Todo esto lo hago por pasión y elección, con la mirada puesta en seguir compitiendo en culturismo natural. 
                    Mi mayor orgullo es ver cómo muchas personas que llegaron con dudas o inseguridades hoy transformaron su cuerpo y su vida, 
                    confirmando que lo que parecía imposible, con disciplina y trabajo, se vuelve realidad.
                  </Text>
                </Stack>
              </ScrollArea>
            </SimpleGrid>
          </Card>
        </Container>

        <Footer />
      </section>
    </>
  );
}
