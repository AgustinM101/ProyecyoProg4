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
                    ADRIAN SALVATORI- Preparador Físico & Atleta de Culturismo Natural 
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
                    Soy preparador físico, atleta de culturismo natural y especialista en nutrición deportiva. A lo largo de los años descubrí que el verdadero cambio no comienza en el gimnasio, sino en la mente. Por eso mi enfoque combina entrenamiento, nutrición, disciplina y mentalidad: cuatro pilares que transforman vidas.
                    <br />
                    <br />
                    Mi experiencia como competidor me enseñó que no existen atajos. Lo que sí existe es la constancia, el trabajo inteligente y la capacidad de superarse todos los días. Acompaño a cada alumno en ese camino, guiándolo para que logre su mejor versión física y mental.
                    <br />
                    <br />
                    Trabajo con un objetivo claro:
                    demostrarle a cada persona que puede mucho más de lo que cree.
                    <br />
                    <br />
                    Mi estilo de vida —entrenamiento diario, hábitos saludables y entre 10.000 y 12.000 pasos por día— refleja la filosofía que enseño: coherencia, esfuerzo y pasión.
                    La verdadera satisfacción no está en el resultado final, sino en el proceso y en ver cómo cada persona rompe sus propios límites.
                    <br />
                    <br />
                    
                 <Divider color="#d4af37" />

                <Text size="sm" fw={600} style={{ color: "#fff" }}>
                  Horarios:
                </Text>

                <Text size="sm" style={{ color: "#d4af37" }}>
                  Lunes a Viernes: 10:00–13:00  
                  <br />
                  Sábados: 10:00–13:00
                </Text>
                  </Text>
                </Stack>
              </ScrollArea>
            </SimpleGrid>
          </Card>
        </Container>

        {/* ========================================================= */}
        {/* === SECCIÓN PROFESORES / EQUIPO === */}
        {/* ========================================================= */}

        <Container size="lg" mt={90}>
          <Title
            order={2}
            ta="center"
            mb="lg"
            style={{
              color: "#d4af37",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            Nuestro Equipo de Profesores
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">

            

            {/* === PROFESOR 2 === */}
            <Card
              shadow="lg"
              radius="lg"
              padding="lg"
              style={{
                backgroundColor: "#0a0a0a",
                border: "2px solid #d4af37",
                color: "#fff",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 0 15px #d4af37";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Image
                src="https://res.cloudinary.com/del98x3di/image/upload/v1762952926/adrian_con_bruno_kfpw5f.jpg"
                height={200}
                radius="md"
                fit="cover"
                style={{ borderBottom: "2px solid #d4af37" }}
              />

              <Stack mt="md" spacing="xs">
                <Title order={4} style={{ color: "#d4af37", textTransform: "uppercase" }}>
                 Bruno Gimenez-Atleta y preparador físico
                </Title>

                <Text size="sm" style={{ color: "#ccc" }}>
                  Especialista en nutricion y acondicionamiento general.
                </Text>

                <Divider color="#d4af37" />

                <Text size="sm" fw={600} style={{ color: "#fff" }}>
                  Horarios:
                </Text>

                <Text size="sm" style={{ color: "#d4af37" }}>
                  Lunes a Viernes: 10:00–13:00  
                  <br />
                  Sábados: 10:00–13:00
                </Text>
              </Stack>
            </Card>

            {/* === PROFESOR 3 === */}
            <Card
              shadow="lg"
              radius="lg"
              padding="lg"
              style={{
                backgroundColor: "#0a0a0a",
                border: "2px solid #d4af37",
                color: "#fff",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 0 15px #d4af37";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Image
                src="https://res.cloudinary.com/del98x3di/image/upload/v1763764551/WhatsApp_Image_2025-11-21_at_19.23.59_kxbajr.jpg"
                height={200}
                radius="md"
                fit="cover"
                style={{ borderBottom: "2px solid #d4af37" }}
              />

              <Stack mt="md" spacing="xs">
                <Title order={4} style={{ color: "#d4af37", textTransform: "uppercase" }}>
                 Sebastian Robles — Instructor de Fuerza y Movilidad
                </Title>

                <Text size="sm" style={{ color: "#ccc" }}>
                  Instructor especializado en fuerza, movilidad y rendimiento.
                </Text>

                <Divider color="#d4af37" />

                <Text size="sm" fw={600} style={{ color: "#fff" }}>
                  Horarios:
                </Text>

                <Text size="sm" style={{ color: "#d4af37" }}>
                  Lunes, Miércoles y Viernes: 13:00–21:00
                </Text>
              </Stack>
            </Card>
            {/* === PROFESOR 4 === */}
            <Card
              shadow="lg"
              radius="lg"
              padding="lg"
              style={{
                backgroundColor: "#0a0a0a",
                border: "2px solid #d4af37",
                color: "#fff",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 0 15px #d4af37";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Image
                src="https://res.cloudinary.com/del98x3di/image/upload/v1763764551/WhatsApp_Image_2025-11-21_at_19.27.05_tsyw2s.jpg"
                height={200}
                radius="md"
                fit="cover"
                style={{ borderBottom: "2px solid #d4af37" }}
              />

              <Stack mt="md" spacing="xs">
                <Title order={4} style={{ color: "#d4af37", textTransform: "uppercase" }}>
                  Gonzalo Insaurralde- Preparador Físico
                </Title>

                <Text size="sm" style={{ color: "#ccc" }}>
                  Especialista en entrenamiento funcional y rehabilitación.
                </Text>

                <Divider color="#d4af37" />

                <Text size="sm" fw={600} style={{ color: "#fff" }}>
                  Horarios:
                </Text>

                <Text size="sm" style={{ color: "#d4af37" }}>
                  Lunes a Viernes: 08:00–10:00 / 16:00–20:00  
                  <br />
                  Sábados: 09:00–12:00
                </Text>
              </Stack>
            </Card>
          </SimpleGrid>
        </Container>

        <Footer />
      </section>
    </>
  );
}
