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
import { IconMail } from "@tabler/icons-react";

export function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    userService
      .getCurrentUser()
      .then((res) => {
        setUser(res.data);
        setName(res.data.name || "");
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
      if (profileImage) formData.append("profile_image", profileImage);

      const res = await userService.updateProfile(formData);

      // Conservar datos existentes para evitar que desaparezcan
      setUser((prevUser) => ({
        ...prevUser,
        name: res.data.name || prevUser.name,
        profileImage: res.data.profileImage || prevUser.profileImage,
        email: prevUser.email,
        admin: prevUser.admin,
      }));

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
        <Container size="md" className="profile-container">
          <Card shadow="xl" radius="lg" padding="xl" className="profile-card">
            {/* Foto de perfil */}
            <div className="avatar-container">
              {user.profileImage ? (
                <img
                  src={`http://localhost:9091${user.profileImage}`}
                  alt="Foto de perfil"
                  className="profile-avatar"
                />
              ) : (
                <div className="profile-avatar placeholder">👤</div>
              )}
            </div>

            {/* Botones */}
            <div className="profile-buttons">
              <Link to="/myplans">
                <Button variant="filled" color="#FFD60A" radius="md">
                  Mis planes
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
            </div>

            {/* Info */}
            <Title order={2} className="profile-name">
              {user.name}
            </Title>
            <Text className="profile-description">
              ¡Bienvenido a tu espacio personal! Aquí podés ver y editar tu
              información, acceder a tus formularios y mantener tu perfil
              actualizado.
            </Text>

            <div className="profile-info-box">
              <Group spacing="xs">
                <IconMail size={18} />
                <Text size="sm">{user.email}</Text>
              </Group>
            </div>
          </Card>
        </Container>
      </div>

      {/* Modal edición */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Editar perfil"
        centered
      >
        <Stack>
          <TextInput
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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


