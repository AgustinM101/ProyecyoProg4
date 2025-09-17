import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Link } from "react-router-dom"; 
import "./PlansPage.css";
import { Footer } from "../../components/Footer/Footer";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";

export function PlansPage() {
  const plans = [
    {
      title: "PLAN PHAV",
      description: "El objetivo de este plan es lograr una adecuada recomposición corporal.",
      images: [
        "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887025/Transformacion_Fisica_1_d49bdp.png",
        "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887025/Transformacion_Fisica_6_lh9hyy.png",
        "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887027/Transformacion_Fisica_8_u6valg.png",
        "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887026/Transformacion_Fisica_7_gslytj.png",
        "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887031/Transformacion_Fisica_12_yahdz4.png",
      ],
    },
    {
      title: "PLAN COMPETICIÓN",
      description:
        "Contamos con un plan de competición sin límite de tiempo. La planificación se adapta a la condición física y objetivos del atleta que desee unirse al equipo.",
      images: [
        "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792216/IMG_4168_zxhbnj.jpg",
        "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792210/ABFDEA6E-476E-4720-9E6E-EC7F16E91A29_aukmad.jpg",
        "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792218/IMG_4169_blgaps.jpg",
        "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792211/C4627F61-908C-4F51-90F6-F9E0987E635B_x9kvvb.jpg",
        "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792210/A353DAEB-B7BE-489F-9DE5-43058AC9C92B_y3nqsj.jpg",
      ],
    },
  ];

  return (
    <>
    <HeaderMenu />
    <div className="plans-container">
      <h1 className="plans-title">Elegí tu plan</h1>

      {/* Botón para volver al inicio */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Link to="/">
          <button className="btn-plan">Volver al inicio</button>
        </Link>
      </div>

      <div className="plans-grid">
        {plans.map((plan, index) => (
          <div className="plan-card" key={index}>
            <h2 className="plan-title">{plan.title}</h2>
            <p className="plan-description">{plan.description}</p>

            <Carousel
              withIndicators
              height={200}
              slideGap="md"
              loop
              className="plan-carousel"
            >
              {plan.images.map((img, i) => (
                <Carousel.Slide key={i}>
                  <img src={img} alt={`avance ${i}`} className="plan-img" />
                </Carousel.Slide>
              ))}
            </Carousel>

            <button className="btn-plan">Elegir Plan</button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}
