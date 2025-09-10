import { useState, useEffect } from "react";
import { Menu, Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./HeaderMenu.module.css";
import { getCurrentUser } from "../../services/userService"; 

export function UserMenu() {
  const [user, setUser] = useState(null);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getCurrentUser(); 
        setUser({
          name: data.nombre, 
          image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png", 
        });
      } catch (error) {
        console.error("Error al traer usuario:", error);
      }
    }

    fetchUser();
  }, []);

  if (!user) return null; 

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
            <Avatar src={user.image} alt={user.name} radius="xl" size={24} />
            <Text fw={500} size="sm">
              {user.name}
            </Text>
            <IconChevronDown size={14} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconLogout size={16} />}>Cerrar sesión</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}