import { useCallback, useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Progress, Image } from "@mantine/core";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import classes from "./GymCarousel.module.css";

export function GymCarousel() {
  const competitionImages = [
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792211/C4627F61-908C-4F51-90F6-F9E0987E635B_x9kvvb.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792216/IMG_4168_zxhbnj.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792210/ABFDEA6E-476E-4720-9E6E-EC7F16E91A29_aukmad.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792218/IMG_4169_blgaps.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792210/A353DAEB-B7BE-489F-9DE5-43058AC9C92B_y3nqsj.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792216/IMG_4167_a96m2z.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792211/E3005E72-2811-41C8-8474-DB6176CDF4E8_vzdewp.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792212/IMG_0367_n5yw1f.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792208/4F91A619-86FC-456D-BC40-F7C0B2A7DF3D_adhiuz.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792209/75366E64-21FF-4B38-84B4-B72AF8FB74E2_k2dgdh.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819236/gym10_af4qdl.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819236/gym8_lridve.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819236/gym7_gzyhhf.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819233/gym13_gbx7zq.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819233/gym5_p0guwa.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819233/gym1_tazud3.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819233/gym3_dw5x1p.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819233/gym4_hukszk.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819232/gym2_zvjypq.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819235/gym6_ih6dxq.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819236/gym11_u1mh55.jpg",
    "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757819237/gym9_gav8bw.jpg",

];

  // Estado y lógica para el segundo carrusel (competition)
  const [scrollProgressComp, setScrollProgressComp] = useState(0);
  const [emblaComp, setEmblaComp] = useState(null);

  const handleScrollComp = useCallback(() => {
    if (!emblaComp) return;
    const progress = Math.max(0, Math.min(1, emblaComp.scrollProgress()));
    setScrollProgressComp(progress * 100);
  }, [emblaComp]);

  useEffect(() => {
    if (emblaComp) {
      emblaComp.on("scroll", handleScrollComp);
      handleScrollComp();
    }
  }, [emblaComp, handleScrollComp]);

  return (
    <div className={classes.carouselBg}>
      <div className={classes.wrapper}>
        {/* Título y subtítulo */}
        <div className={classes.header}>
          <h2 className={classes.title}>NUESTRO EQUIPO DE COMPETICIÓN</h2>
          <p className={classes.subtitle}>
            El fisicoculturismo es una disciplina que combina entrenamiento de fuerza, nutrición y dedicación para esculpir el cuerpo. Nuestro equipo representa el esfuerzo, la constancia y la pasión por superar límites en cada competencia.
          </p>
        </div>
        {/* Carrusel de competición */}
        <div className={classes.carouselContainer}>
          <Carousel
            height={400}
            slideSize="100%"
            align="center"
            withIndicators
            loop
            nextControlIcon={<IconArrowRight size={32} />}
            previousControlIcon={<IconArrowLeft size={32} />}
            className={classes.carousel}
          >
            {competitionImages.map((src, i) => (
              <Carousel.Slide key={i}>
                <div className={classes.imageContainer}>
                  <Image
                    src={src}
                    alt={`img-${i}`}
                    fit="cover"
                    height={400}
                    radius="md"
                    style={{ width: "100%" }}
                  />
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
          
        </div> 
      </div>
    </div>
  );
}/*<Progress value={scrollProgressComp} maw={320} size="sm" mt="xl" mx="auto" /> */
