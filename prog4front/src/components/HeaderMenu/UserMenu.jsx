import { useState } from "react";
import { Menu, Avatar, Group, Text, UnstyledButton, Skeleton } from "@mantine/core";
import { IconChevronDown, IconLogout, IconUser } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./HeaderMenu.module.css";
import { Link, useNavigate } from "react-router";

export function UserMenu({user}) {
  const navigate = useNavigate()
  const [menuOpened, setMenuOpened] = useState(false);

  if (!user){
    return <Skeleton height={30} width={100} radius="xl" />;
  }

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
        
        <Link to={`/user/${user.id}`} className={classes.menuLink}>
          <Menu.Item leftSection={<IconUser size={16} />} >Mi perfil</Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconLogout size={16} />} onClick={() => {
          localStorage.removeItem("token");
          // llamaar a la api /logout para invalidar el token en el backend
          navigate("/login")
        }} >Cerrar sesión</Menu.Item>
      </Menu.Dropdown>
      </Menu>
  );

}