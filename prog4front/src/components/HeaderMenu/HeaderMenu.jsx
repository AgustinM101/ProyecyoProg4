import { IconChevronDown } from '@tabler/icons-react';
import { Button, Center, Container, Group, Menu } from '@mantine/core';
import { Link } from 'react-router-dom';

import { UserMenu } from './UserMenu';
import classes from './HeaderMenu.module.css';
import { menuConfig } from '../../services/menuConfig';
import { useEffect, useState } from 'react';
import { userService } from '../../services/userService';

export function HeaderMenu() {
  const isLoggedIn = localStorage.getItem ("token") != undefined;
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const user = await userService.getCurrentUser();
      setUser({
        ...user.data,
        image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
      });
    } catch (error) {
      console.error("Error al traer usuario:", error);
    }
  }

  useEffect(() => {
    if (isLoggedIn) fetchUser();
  }, [isLoggedIn]);

  const items = menuConfig.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>
        <Link to={item.link} className={classes.link}>
          {item.label}
        </Link>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <div className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </div>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="max-width">
        <div className={classes.inner}>
          <Link to="/">
            <img
              className={classes.logoInfinitsports}
              src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757462534/logo_nuevo_infinit_sports_nsmg9n.png"
              alt="logo infinit sports"
            />
          </Link>
          <div className={classes.linksGroup}>
            <Group gap={5} visibleFrom="sm">
              {items}
            </Group>
          </div>
          <div className={classes.userGroup}>
            {isLoggedIn ? <UserMenu user={user} /> : <Button>Iniciar sesión</Button>}
          </div>
        </div>
      </Container>
    </header>
  );
}
