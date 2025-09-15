import { Carousel } from "@mantine/carousel";
import { Title, Text } from "@mantine/core";
import classes from "./BannerGym.module.css";

export function BannerGym() {
  return (
    <section className={classes.bannerGymSection}>
      <div className={classes.bannerGymContent}>
        {/* Texto a la izquierda */}
        <div className={classes.bannerGymText}>
          <Title order={2}>Entrená con Nosotros</Title>
          <Text size="lg">Transformá tu cuerpo en un ambiente motivador</Text>
        </div>

        {/* Carrusel a la derecha */}
        <div className={classes.bannerGymCarousel}>
            <Carousel withIndicators height={300} slideSize="80%" slideGap="md" loop>
                <Carousel.Slide>
                    <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792209/12492DBD-14C5-4D57-AAF2-FD193B7559F7_slw9wn.jpg" alt="Gym 1" />
                </Carousel.Slide>
                <Carousel.Slide>
                    <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792208/5607F484-0890-4227-B154-67B45051E638_llzsrm.jpg" alt="Gym 2" />
                </Carousel.Slide>
                <Carousel.Slide>
                    <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792208/151F91D9-5B13-43A5-9C7B-F2F6875E7057_e1zipk.jpg" alt="Gym 3" />
                </Carousel.Slide>
                <Carousel.Slide>
                    <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792208/0186B8D8-2C6A-464A-825C-8A5BC3DE443F_yz4rw8.jpg" alt="Gym 4" />
                </Carousel.Slide>
                <Carousel.Slide>
                    <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792208/27A92B9C-9133-4289-9A60-571D8D66D8B3_xq9yrl.jpg" alt="Gym 5" />
                </Carousel.Slide>
                <Carousel.Slide>
                    <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792207/5359F4AC-359D-48F6-95E2-55A460396581_u1s4ge.jpg" alt="Gym 6" />
                </Carousel.Slide>
                <Carousel.Slide>
                    <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792207/4775B320-247A-44A6-BF75-B001596D751C_jm1qba.jpg" alt="Gym 7" />
                </Carousel.Slide>
                <Carousel.Slide>
                    <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792211/D11182BB-0E57-4270-A17D-96A0F3508A3A_v72wx4.jpg" alt="Gym 8" />
                </Carousel.Slide>
                <Carousel.Slide>
                    <img src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792211/CA165CC1-AD68-4642-9B31-DDFB289ECC91_s3ly6d.jpg" alt="Gym 9" />
                </Carousel.Slide>

            </Carousel>
        </div>
      </div>
    </section>
  );
}
