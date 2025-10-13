import { Group, Button, Text, Container } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import { IconHome, IconUsers, IconClipboardList, IconActivity, IconLogout } from "@tabler/icons-react";


export function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Inicio", icon: <IconHome size={18} />, path: "/admin" },
    { label: "Formularios", icon: <IconClipboardList size={18} />, path: "/formularios" },
    { label: "Clientes", icon: <IconUsers size={18} />, path: "/clientes" },
    { label: "Planes", icon: <IconActivity size={18} />, path: "/userplanes" },
    { label: "PlanesGenericos", icon: <IconActivity size={18} />, path: "/genericplanes" }
  ];

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#0D0D0D",
        borderBottom: "2px solid #FF6600",
        padding: "10px 30px",
      }}
    >
      <Group justify="space-between" align="center">
        {/* LOGO / TITULO */}
        <Text
          size="xl"
          fw={700}
          c="#FF6600"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin")}
        >
          🏋️ Admin Dashboard
        </Text>

        {/* NAV LINKS */}
        <Group>
          {links.map((link) => (
            <Button
              key={link.path}
              leftSection={link.icon}
              variant={location.pathname === link.path ? "filled" : "subtle"}
              color="#FF6600"
              c="white"
              onClick={() => navigate(link.path)}
              style={{
                backgroundColor:
                  location.pathname === link.path ? "#FF6600" : "transparent",
                color: location.pathname === link.path ? "#fff" : "#FF6600",
              }}
            >
              {link.label}
            </Button>
          ))}
        </Group>

        {/* LOGOUT */}
        <Button
          leftSection={<IconLogout size={18} />}
          variant="outline"
          color="#FF6600"
          c="white"
          onClick={() => navigate("/login")}
          style={{
            borderColor: "#FF6600",
            color: "#FF6600",
          }}
        >
          Salir
        </Button>
      </Group>
    </Container>
  );
}
