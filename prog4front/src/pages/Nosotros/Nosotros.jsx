
import { 
  Container, Title, Text, Card, Group, Image, Button, Stack, Typography 
} from "@mantine/core";
import { Grid, SimpleGrid } from '@mantine/core';
import { Footer } from "../../components/Footer/Footer";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu"; 
import "./Nosotros.css";

export function Nosotros() {
  return (
    <>
      {/* Header común */}
      <HeaderMenu />

      {/* Sección Nosotros */}
      <section id="nosotros" className="nosotros-section">
        <Container size="lg" py="xl">
          <Card className="nosotros-card">
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" align="flex-start">

              {/* Columna Imagen + Botón */}
              <Stack spacing="md" align="center">
                <Image
                  radius="md"
                  fit="contain"
                  src="https://res.cloudinary.com/del98x3di/image/upload/v1758065555/ABFDEA6E-476E-4720-9E6E-EC7F16E91A29_wc5q5z.jpg"
                  alt="Adrian Salvatori"
                />

                <Button 
                  variant="filled" 
                  color="#FFD60A" 
                  radius="md" 
                  size="md"
                  className="nosotros-button"
                >
                  TRABAJA CONMIGO Y EMPIEZA A PROGRESAR DE VERDAD
                </Button>
              </Stack>

              {/* Columna Texto */}
              <Grid gutter="md">
                <Grid.Col>
                  <Group spacing="md" align="flex-start" className="nosotros-header">
                    <Typography className="nosotros-encabezado">
                      PREPARADOR FÍSICO, ATLETA PROFESIONAL DE CULTURISMO NATURAL, GRADUADO EN CIENCIAS DE LA ACTIVIDAD FÍSICA Y DEL DEPORTE.
                    </Typography>
                    <Title order={2} className="nosotros-title">
                      <strong>ADRIAN SALVATORI</strong>
                    </Title>
                  </Group>
                </Grid.Col>

                <Grid.Col>
                  <Text size="sm" mt="md" className="nosotros-texto">
                    Soy médico, preparador físico, profesor y atleta de culturismo natural. 
                    Estudié Medicina en la Universidad del País Vasco (2013–2019) y tras 
                    finalizar mi residencia en Oviedo, conseguí una plaza en Medicina Interna 
                    en el Hospital Sant Pau de Barcelona, donde ejercí hasta marzo de 2021.
                    <br /><br />
                    Mi pasión por el culturismo natural comenzó en 2012 y se consolidó al 
                    combinar mi formación científica en fisiología, anatomía y bioquímica 
                    con la práctica del fitness. Esta combinación me llevó a dedicarme 
                    profesionalmente como preparador físico, ayudando a otros a alcanzar 
                    su mejor versión.
                    <br /><br />
                    Desde 2020 también formo parte del profesorado del Máster Universitario 
                    de Culturismo Natural de la Universidad Católica de Murcia, porque 
                    transmitir conocimientos y guiar a otros siempre ha sido una parte 
                    esencial de mi trayectoria.
                    <br /><br />
                    Como atleta, competí en Men’s Physique del Campeonato Vasconavarro: 
                    en 2017 logré un 1º puesto y en 2018 obtuve la medalla de oro de mi 
                    categoría. Inspirado por estas experiencias, creé el proyecto que hoy 
                    representa mi mayor motivación: Team Infinit, un espacio para entrenar, 
                    aprender y superarse día a día.
                  </Text>
                </Grid.Col>
              </Grid>
            </SimpleGrid>
          </Card>
        </Container>

        <Footer />
      </section>
    </>
  );
}
