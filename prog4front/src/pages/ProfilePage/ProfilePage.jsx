import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Title,
  Text,
  Stack,
  Button,
  Group,
  Loader,
  Modal,
  TextInput,
  Notification,
  Skeleton,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import { plansUserService } from "../../services/plansUserService";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import "./ProfilePage.css";

export const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);

  const [loading, setLoading] = useState(true);
  const [planLoading, setPlanLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ------------------ CARGA DE DATOS ------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        const userRes = await userService.getCurrentUser();
        setUser(userRes.data);

        setName(userRes.data.name);
        setEmail(userRes.data.email);

        const plansRes = await plansUserService.getByUserId(userRes.data.id);
        const plans = plansRes.data;

        let activePlan = plans.find((p) => p.status === "active");
        if (!activePlan && plans.length > 0) activePlan = plans[0];

        setPlan(activePlan);
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setLoading(false);
        setPlanLoading(false);
      }
    };

    loadData();
  }, []);

  // ------------------ GUARDAR CAMBIOS ------------------
  const handleSave = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);

      await userService.updateProfile(formData);

      setUser({ ...user, name, email });
      setSuccessMessage("Perfil actualizado correctamente");
      setEditOpen(false);
    } catch (err) {
      console.error(err);
      setErrorMessage("Error al actualizar el perfil");
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <HeaderMenu />

      <div
        className="profile-wrapper"
        style={{
          animation: "fadeIn 0.6s ease-out",
        }}
      >
        <Container className="profile-container">
          <Card
            shadow="xl"
            className="profile-card"
            style={{
              transition: "transform 0.25s ease, box-shadow 0.25s",
              animation: "slideUp 0.6s ease-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.015)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(255,214,10,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 3px 15px rgba(0,0,0,0.2)";
            }}
          >
            <Title className="profile-title">Mi Perfil</Title>

            <Stack spacing="md" mt="md" className="profile-info">
              {/* SKELETONS MIENTRAS CARGA */}
              {loading ? (
                <>
                  <Skeleton height={20} radius="xl" />
                  <Skeleton height={20} radius="xl" />
                  <Skeleton height={30} mt={20} radius="xl" />
                </>
              ) : (
                <>
                  <Text>
                    <strong>Nombre:</strong> {user.name}
                  </Text>

                  <Text>
                    <strong>Email:</strong> {user.email}
                  </Text>
                </>
              )}

              {/* ---------------- DATOS DEL PLAN ---------------- */}
              <Title
                order={3}
                style={{
                  marginTop: "20px",
                  color: "#FFD60A",
                  animation: "pulseGlow 2s infinite",
                }}
              >
                Información del Plan
              </Title>

              {planLoading ? (
                <>
                  <Skeleton height={20} radius="xl" />
                  <Skeleton height={20} radius="xl" />
                  <Skeleton height={20} radius="xl" />
                </>
              ) : plan ? (
                <>
                  <Text>
                    <strong>Estado:</strong>{" "}
                    <span
                      style={{
                        color:
                          plan.status === "active" ? "#4CAF50" : "#FFD60A",
                        fontWeight: "bold",
                      }}
                    >
                      {plan.status}
                    </span>
                  </Text>

                  <Text>
                    <strong>Fecha de creación:</strong>{" "}
                    {formatDate(plan.created_at)}
                  </Text>

                  <Text>
                    <strong>Fecha de expiración:</strong>{" "}
                    {plan.expiration_date
                      ? formatDate(plan.expiration_date)
                      : "—"}
                  </Text>
                </>
              ) : (
                <Text>No tenés planes asociados</Text>
              )}

              {/* ACCIONES */}
              <Group position="center" mt="md">
                <Button
                  color="yellow"
                  radius="md"
                  onClick={() => setEditOpen(true)}
                  style={{
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.08)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Editar Perfil
                </Button>

                <Button
                  variant="outline"
                  color="yellow"
                  radius="md"
                  onClick={() => navigate("/myplans")}
                  style={{
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.08)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Mis Planes
                </Button>
              </Group>
            </Stack>
          </Card>
        </Container>
      </div>

      {/* ---------------- MODAL DE EDICIÓN ---------------- */}
      <Modal
  opened={editOpen}
  onClose={() => setEditOpen(false)}
  title="Editar Perfil"
  centered
  radius="lg"
  size="sm"
  overlayProps={{
    color: "#000",
    opacity: 0.85,
    blur: 4,
  }}
  transitionProps={{
    duration: 300,
    timingFunction: "ease",
  }}
>
  <Stack spacing="md">
    <TextInput
      label="Nombre"
      value={name}
      onChange={(e) => setName(e.target.value)}
      styles={{
        input: {
          backgroundColor: "#1a1a1a",
          color: "#fff",
          borderColor: "#FFD60A",
        },
        label: { color: "#FFD60A" },
      }}
    />

    <TextInput
      label="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      styles={{
        input: {
          backgroundColor: "#1a1a1a",
          color: "#fff",
          borderColor: "#FFD60A",
        },
        label: { color: "#FFD60A" },
      }}
    />

    {successMessage && (
      <Notification color="yellow" title="Éxito">
        {successMessage}
      </Notification>
    )}

    {errorMessage && (
      <Notification color="red" title="Error">
        {errorMessage}
      </Notification>
    )}

    <Group position="center" mt="md">
      <Button color="yellow" radius="md" onClick={handleSave}>
        Guardar Cambios
      </Button>
    </Group>
  </Stack>
</Modal>


      <Footer />

      {/* ANIMACIONES CSS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes pulseGlow {
            0% { text-shadow: 0 0 4px #FFD60A; }
            50% { text-shadow: 0 0 12px #FFD60A; }
            100% { text-shadow: 0 0 4px #FFD60A; }
          }
        `}
      </style>
    </>
  );
};








