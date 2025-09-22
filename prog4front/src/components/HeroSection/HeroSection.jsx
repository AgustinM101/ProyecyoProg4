import { Container,  Text, Button, ThemeIcon } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import "./HeroSection.css";

export function HeroSection() {
    return (
    <div className="hero">
        <div className="overlay" />

        <Container size="lg" className="hero-content">
            {/* titulos y slogan en vertical */}
            <div className="hero-header">
                <div>
                    <Text className="hero-title">
                        Transforma tu cuerpo y vida
                    </Text>
                </div>
                <div>
                    <Text className="hero-subtitle">
                        Descenso de peso, recomposición corporal y culturismo <br />
                        natural con un enfoque saludable y sostenible
                    </Text>
                </div>
                <div>
                    <Text className="hero-slogan">
                        𝔗𝔥𝔢 𝔠𝔥𝔞𝔪𝔭’𝔰 𝔥𝔬𝔪𝔢
                    </Text>
                </div>
            </div>

            {/* horarios, boton y ubicación en horizontal */}
            <div className="hero-bottom">
                <div className="hero-main-row">
                    <div className="hero-schedule">
                        <Text className="day">LUNES | MIÉRCOLES | VIERNES</Text>
                        <Text className="hours">07:00 hs - 22:00 hs</Text>
                        <Text className="day">MARTES | JUEVES</Text>
                        <Text className="hours">07:00 hs - 13:00 hs</Text>
                        <Text className="hours">15:00 hs - 21:00 hs</Text>
                        <Text className="day">SÁBADO</Text>
                        <Text className="hours">08:00 hs - 14:00 hs</Text>
                    </div>

                    <div className="hero-location">
                        <ThemeIcon color="yellow" radius="xl">
                            <IconMapPin size={20} />
                        </ThemeIcon>
                        <Text>SOLER 490, CHIVILCOY 6620</Text>
                        <a
                            href="https://wa.me/5492346551210"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Text size="sm">2346 55 1210 (Gym)</Text>
                        </a>
                        <a
                            href="https://wa.me/549234568702"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Text size="sm">2346 56 8702 (Asesorías)</Text>
                        </a>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  );
}