import { useCallback, useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import {
  Container,
  Grid,
  Title,
  Text,
  Image,
  useMantineTheme,
  Paper,
  Button,
  Stack,
} from "@mantine/core";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

export function GymCarousel() {
  const theme = useMantineTheme();
  const [embla, setEmbla] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const competitionImages = [
    "https://res.cloudinary.com/del98x3di/image/upload/v1762952930/WhatsApp_Image_2025-11-12_at_01.07.36_1_ob4bn5.jpg",
    "https://res.cloudinary.com/del98x3di/image/upload/v1762952926/adrian_con_bruno_kfpw5f.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792211/C4627F61-908C-4F51-90F6-F9E0987E635B_x9kvvb.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792216/IMG_4168_zxhbnj.jpg",
    "https://res.cloudinary.com/del98x3di/image/upload/v1762952924/WhatsApp_Image_2025-11-12_at_01.07.36_kvndjv.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792210/ABFDEA6E-476E-4720-9E6E-EC7F16E91A29_aukmad.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819233/gym5_p0guwa.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819233/gym4_hukszk.jpg",
  ];

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla, handleScroll]);

  // URL de WhatsApp personalizada (modificá el número y mensaje)
  const whatsappLink =
    "https://wa.me/5491123456789?text=¡Hola! Quiero formar parte del Team Infinit 💪";

  return (
    <Paper
      style={{
        backgroundColor: "#000",
        padding: "4rem 0",
      }}
      id="culturismo"
    >
      <Container size="lg">
        <Grid gutter="xl" align="center">
          {/* Carrusel de imágenes */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Carousel
              height={450}
              slideSize="100%"
              align="center"
              withIndicators
              loop
              nextControlIcon={<IconArrowRight size={32} />}
              previousControlIcon={<IconArrowLeft size={32} />}
              getEmblaApi={setEmbla}
              styles={{
                control: { color: "white" },
                indicator: {
                  backgroundColor: theme.colors.yellow[4],
                },
              }}
            >
              {competitionImages.map((src, i) => (
                <Carousel.Slide key={i}>
                  <Image
                    src={src}
                    alt={`Competición ${i}`}
                    fit="contain"
                    height={450}
                    radius="lg"
                    style={{
                      width: "100%",
                      display: "block",
                      margin: "0 auto",
                      backgroundColor: "#000",
                      objectFit: "contain",
                    }}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Grid.Col>

          {/* Texto y botón a la derecha */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack
              align="flex-end"
              style={{
                color: "white",
                textAlign: "right",
              }}
            >
              <Title order={2} mb="md" c="yellow.4">
                NUESTRO EQUIPO DE COMPETICIÓN
              </Title>
              <Text size="lg" fw={500} mb="sm">
                El fallo no es opcional, es el umbral de la verdadera ganancia,
                la prueba de que has empujado tus límites.
              </Text>
              <Text size="sm" c="gray.3" mb="lg">
                Nunca podrás saber qué tan bueno puedes ser a menos que lo
                intentes. Tu cuerpo es un proyecto en constante evolución, y tú
                sos el arquitecto. Nuestro equipo representa el esfuerzo y la
                pasión por superar límites, dentro y fuera del escenario.
              </Text>

              <Button
                size="md"
                radius="lg"
                color="yellow"
                variant="filled"
                component="a"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontWeight: "bold",
                  color: "black",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFD700";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFF00";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Formá parte del Team Infinit
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Paper>
  );
}
