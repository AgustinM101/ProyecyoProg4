import { Title, Text, Grid, Card, Image, Center, Stack, Group, Avatar } from "@mantine/core";
import classes from "./Transformations.module.css";

export function Transformations() {
    const transformations = [
        {
        src: "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887027/Transformacion_Fisica_8_u6valg.png",
        caption: "1",
        link: "https://www.instagram.com/p/DF6Dv7qSMnE/"
    },
        {
        src: "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887026/Transformacion_Fisica_7_gslytj.png",
        caption: "2",
        link: "https://www.instagram.com/p/CGgexz5FOGA/"
    },
        {
        src: "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887031/Transformacion_Fisica_12_yahdz4.png",
        caption: "3",
        link: "https://www.instagram.com/p/Cufm59Isw24/"
    },
        {
        src: "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887026/Transformacion_Fisica_11_ia8yoa.png",
        caption: "4",
        link: "https://www.instagram.com/p/DF76KIuR3NA/"
    },
        {
        src: "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887026/Transformacion_Fisica_2_qeq0oy.png",
        caption: "5",
        link: "https://www.instagram.com/p/COYKip0laSJ/"
    },
        {
        src: "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887026/Transformacion_Fisica_9_v96q2o.png",
        caption: "6",
        link: "https://www.instagram.com/p/CfAVdOFs-18"
    },
        {
        src: "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887025/Transformacion_Fisica_1_d49bdp.png",
        caption: "7 ",
        link: "https://www.instagram.com/p/DF1R4YJsPJQ/"
    },
        {
        src: "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887024/Transformacion_Fisica_5_r52obt.png",
        caption: "8",
        link: "https://www.instagram.com/p/CGF8GB3Fchg/"
    },
        {
        src: "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887025/Transformacion_Fisica_4_qc1gwo.png",
        caption: "9",
        link: "https://www.instagram.com/p/C0IS5GrsQw8"
    },
        {
        src: "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887025/Transformacion_Fisica_3_wzzaam.png",
        caption: "10",
        link: "https://www.instagram.com/p/DHEBgQ3MUQK/"
    },
        {
        src: "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887026/Transformacion_Fisica_10_sgn2ub.png",
        caption: "11",
        link: "https://www.instagram.com/p/DFfnPb7xFix/"
    },
        {
        src: "https://res.cloudinary.com/dkv58dvqy/image/upload/v1757887025/Transformacion_Fisica_6_lh9hyy.png",
        caption: "12",
        link: "https://www.instagram.com/p/CY1SYk_L024"
    }
    
  ];

  return (
    <div className={classes.wrapper} id="transformations">
      {/* Encabezado */}
      <Center className={classes.header}>
        <Stack align="center" gap="xs">
          <Title order={1} className={classes.mainTitle}>
            TRANSFORMACIONES
          </Title>
          <img
            src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757462534/logo_nuevo_infinit_sports_nsmg9n.png"
            alt="Infinit Sports logo"
            className={classes.logo}
          />
          <Text className={classes.subTitle}>
            RESULTADOS <span> DE NUESTROS </span> CLIENTES
          </Text>
        </Stack>
      </Center>

      {/* Grid de transformaciones */}
      <Grid gutter="lg">
        {transformations.map((item, i) => (
          <Grid.Col key={i} span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              className={classes.card}
              onClick={() => window.open(item.link, "_blank")}
              style={{ cursor: "pointer" }}
            >
              {/* Header tipo Instagram */}
              <div className={classes.cardHeader}>
                <Avatar
                  src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757792207/4FBB1BCE-A702-42C5-942E-410424669533_irk86f.jpg"
                  radius="xl"
                  size={36}
                />
                <Text fw={500} size="md" c="white">
                  infinit_sport_
                </Text>
              </div>

              {/* Imagen con aspecto de post */}
              <img src={item.src} alt={item.caption} className={classes.image} />

              {/* Footer tipo post */}
              <div className={classes.cardFooter}>
                <Text size="xs">Ver publicación</Text>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/87/87390.png"
                  height="18"
                  alt="Instagram Icon"
                />
              </div>
            </Card>


            </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
