import { IconChevronDown } from '@tabler/icons-react';
import { Center, Container, Group, Menu } from '@mantine/core';

import { UserMenu } from './UserMenu';
import classes from './HeaderMenu.module.css';
import { menuConfig } from '../../services/menuConfig';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/userService';


export function HeaderMenu() {
  const [nombre, setNombre] = useState(undefined);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        setNombre(user.nombre); 
      } catch (error) {
        console.error("Error al traer usuario:", error);
      }
    }
    fetchUser();
  }, []);


  const items = menuConfig.map((link) => {
  const menuItems = link.links?.map((item) => (
    <Menu.Item key={item.link}>{item.label}</Menu.Item>
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
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="max-width">
        <div className={classes.inner}>
          <a href="/">
            <img
              className={classes.logoInfinitsports}
              src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757462534/logo_nuevo_infinit_sports_nsmg9n.png"
              alt="logo infinit sports"
            />
          </a>
          <div className={classes.linksGroup}>
            <Group gap={5} visibleFrom="sm">
              {items}
            </Group>
          </div>
          <div className={classes.userGroup}>
            <UserMenu nombre={nombre}/>
          </div>
        </div>
      </Container>
    </header>
  );
}