import { useState } from "react";
import { Menu, Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconLogout, IconUser } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./HeaderMenu.module.css";
import { Link, useNavigate } from "react-router-dom";

export function UserMenu({ user }) {
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <Menu
      width={200}
      position="bottom-end"
      onOpen={() => setMenuOpened(true)}
      onClose={() => setMenuOpened(false)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: menuOpened })}
        >
          <Group gap={7}>
            {user ? (
              <>
                <Avatar src={user.image} alt={user.name} radius="xl" size={24} />
                <Text fw={500} size="sm">
                  {user.name}
                </Text>
              </>
            ) : (
              <>
                <Avatar color="gray" radius="xl" size={24}>
                  <IconUser size={16} />
                </Avatar>
                <Text fw={500} size="sm">
                  Invitado
                </Text>
              </>
            )}
            <IconChevronDown size={14} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {user ? (
          <>
            <Link to={`/profile`} className={classes.menuLink}>
              <Menu.Item leftSection={<IconUser size={16} />}>
                Mi perfil
              </Menu.Item>
            </Link>
            <Menu.Item
              leftSection={<IconLogout size={16} />}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Cerrar sesión
            </Menu.Item>
          </>
        ) : (
          <Menu.Item
            leftSection={<IconUser size={16} />}
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
