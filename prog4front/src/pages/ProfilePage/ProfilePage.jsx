import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Title,
  Text,
  Stack,
  Button,
  Group,
  Modal,
  TextInput,
  FileInput,
} from "@mantine/core";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import "./ProfilePage.css";

export function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  // Estados del formulario de edición
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    userService.getCurrentUser()
      .then((res) => {
        setUser(res.data);
        setName(res.data.name || "");
        setPhone(res.data.phone || "");
      })
      .catch((err) => {
        if (err.message.includes("401")) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      if (profileImage) formData.append("profileImage", profileImage);

      const res = await userService.updateProfile(formData);
      setUser(res.data);
      setModalOpened(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <HeaderMenu />

      <div className="profile-wrapper">
        <Container size="sm">
          <Card className="profile-card" shadow="lg" padding="xl" radius="lg">
            <Title order={2} className="profile-title">
              Perfil de Usuario
            </Title>

            <Stack spacing="md" mt="lg">
              {user.profileImage && (
                <img
                  src={user.profileImage}
                  alt="Foto de perfil"
                  style={{ width: 120, height: 120, borderRadius: "50%" }}
                />
              )}
              <Text><strong>Nombre:</strong> {user.name}</Text>
              <Text><strong>Email:</strong> {user.email}</Text>
              <Text><strong>Teléfono:</strong> {user.phone || "-"}</Text>
              <Text><strong>Plan contratado:</strong> {user.plan?.name || "-"}</Text>
              <Text>{user.plan?.description}</Text>
              <Text>{user.plan?.price ? `$${user.plan.price}` : ""}</Text>

              <Group position="center" mt="xl">
                <Link to="/myplans">
                  <Button variant="outline" radius="md">
                    Ver mis planes
                  </Button>
                </Link>
                <Button
                  variant="filled"
                  radius="md"
                  color="#FFD60A"
                  onClick={() => setModalOpened(true)}
                >
                  Editar perfil
                </Button>
              </Group>
            </Stack>
          </Card>
        </Container>
      </div>

      {/* Modal de edición */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Editar perfil"
        centered
      >
        <Stack>
          <TextInput label="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
          <TextInput label="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <FileInput
            label="Foto de perfil"
            accept="image/*"
            onChange={setProfileImage}
          />
          <Button onClick={handleUpdateProfile}>Guardar cambios</Button>
        </Stack>
      </Modal>

      <Footer />
    </>
  );
}
