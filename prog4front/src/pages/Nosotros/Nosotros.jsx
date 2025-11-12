import {
  Container,
  Title,
  Text,
  Card,
  Button,
  Stack,
  ScrollArea,
  Divider,
  SimpleGrid,
  Image,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { Footer } from "../../components/Footer/Footer";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import "./Nosotros.css";

export function Nosotros() {
  const imagenes = [
    "https://res.cloudinary.com/del98x3di/image/upload/v1758065555/ABFDEA6E-476E-4720-9E6E-EC7F16E91A29_wc5q5z.jpg",
    "https://res.cloudinary.com/del98x3di/image/upload/v1762952922/adrian_mirando_la_nada_r6dwas.jpg",
    "https://res.cloudinary.com/del98x3di/image/upload/v1762952922/adrian_con_trofeo_wy0dbj.jpg",
    "https://res.cloudinary.com/del98x3di/image/upload/v1762952930/WhatsApp_Image_2025-11-12_at_01.07.36_1_ob4bn5.jpg",
    "https://res.cloudinary.com/del98x3di/image/upload/v1762952922/adrian_con_viviana_ea4tzx.jpg",
  ];

  return (
    <>
      <HeaderMenu />

      <section id="nosotros" className="nosotros-section">
        <Container size="lg" py="xl">
          <Card
            shadow="xl"
            radius="lg"
            withBorder
            style={{
              backgroundColor: "#0a0a0a",
              color: "#fff",
              borderColor: "#d4af37",
              padding: "2.5rem",
              boxShadow: "0 0 25px rgba(212,175,55,0.25)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.01)";
              e.currentTarget.style.boxShadow =
                "0 0 40px rgba(212,175,55,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(212,175,55,0.25)";
            }}
          >
            <SimpleGrid
              cols={{ base: 1, sm: 2 }}
              spacing="xl"
              align="center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* === COLUMNA IZQUIERDA: CARRUSEL === */}
              <Stack spacing="lg" align="center">
                <Carousel
                  withIndicators
                  height={420}
                  loop
                  align="center"
                  nextControlIcon={<IconArrowRight size={28} color="#d4af37" />}
                  previousControlIcon={
                    <IconArrowLeft size={28} color="#d4af37" />
                  }
                  styles={{
                    indicator: {
                      width: 10,
                      height: 4,
                      transition: "width 250ms ease",
                      backgroundColor: "rgba(255,255,255,0.4)",
                      "&[data-active]": {
                        backgroundColor: "#d4af37",
                        width: 20,
                      },
                    },
                    control: {
                      backgroundColor: "rgba(0,0,0,0.6)",
                      border: "1px solid #d4af37",
                      transition: "all 0.3s ease",
                      "&:hover": { backgroundColor: "#d4af37", color: "#000" },
                    },
                  }}
                  style={{
                    border: "3px solid #d4af37",
                    borderRadius: "12px",
                    boxShadow: "0 0 20px #d4af37",
                    overflow: "hidden",
                    maxWidth: 450,
                  }}
                >
                  {imagenes.map((src, i) => (
                    <Carousel.Slide key={i}>
                      <Image
                        src={src}
                        alt={`img-${i}`}
                        fit="cover"
                        height={420}
                        width="100%"
                        radius="md"
                        style={{
                          objectPosition: "center",
                          transition: "all 0.4s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.03)";
                          e.currentTarget.style.filter = "brightness(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.filter = "brightness(1)";
                        }}
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>

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
                    boxShadow: "0 0 12px #d4af37",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 0 18px #d4af37";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 0 12px #d4af37";
                  }}
                >
                  Contactame por WhatsApp
                </Button>
              </Stack>

              {/* === COLUMNA DERECHA: TEXTO === */}
              <ScrollArea h={600} type="auto" scrollbarSize={8}>
                <Stack spacing="lg">
                  <Title
                    order={2}
                    style={{
                      color: "#d4af37",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Preparador Físico & Atleta de Culturismo Natural
                  </Title>

                  <Divider color="#d4af37" size="sm" />

                  <Text
                    size="md"
                    style={{
                      lineHeight: 1.8,
                      textAlign: "justify",
                      fontSize: "1rem",
                      color: "#e0e0e0",
                    }}
                  >
                    Soy preparador físico, atleta profesional de culturismo natural y
                    especialista en nutrición aplicada al deporte. Cuento con diversas
                    formaciones que respaldan mi trabajo: Preparador de culturismo
                    (Federación Argentina de Musculación), Entrenamiento aplicado a la
                    salud y la obesidad (JMI), Nutrición aplicada al deporte (JMI),
                    Formación en la Academia de Entrenadores Online y Experto en
                    Culturismo Natural (ECN).
                    <br />
                    <br />
                    Mi experiencia como competidor me permite comprender tanto el
                    proceso físico como mental que atraviesan quienes buscan un cambio
                    o se preparan para competir.
                    <br />
                    <br />
                    Al iniciarme en el entrenamiento descubrí que mi verdadera pasión
                    es ayudar a las personas a transformar su vida. Creo firmemente que
                    los límites están en la mente y que, con disciplina, constancia y
                    amor por lo que hacemos, todo es posible.
                    <br />
                    <br />
                    Fundé mi gimnasio el <b>14 de septiembre de 2020</b> con la misión
                    de ofrecer un espacio donde las personas puedan mejorar su salud,
                    cambiar hábitos y formar atletas de culturismo natural.
                    <br />
                    <br />
                    Nuestra filosofía se basa en la disciplina, la superación personal,
                    la salud y la comunidad. Buscamos demostrar que cualquier objetivo
                    puede cumplirse con constancia y compromiso.
                    <br />
                    <br />
                    Vivo el culturismo como un estilo de vida. Mantengo una rutina
                    saludable, con entrenamiento constante y entre 10.000 y 12.000
                    pasos diarios. Mi mayor satisfacción es ver cómo las personas
                    transforman su cuerpo y su vida, confirmando que lo que parecía
                    imposible, con disciplina y pasión, se vuelve realidad.
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
