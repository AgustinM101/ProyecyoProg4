import { IconChevronDown } from "@tabler/icons-react";
import {
  Button,
  Center,
  Container,
  Group,
  Menu,
  Skeleton,
  Drawer,
  Burger,
  ScrollArea,
} from "@mantine/core";
import { UserMenu } from "./UserMenu";
import classes from "./HeaderMenu.module.css";
import { menuConfig } from "../../services/menuConfig";
import { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

export function HeaderMenu() {
  const token = localStorage.getItem("token");
  const isLoggedIn = token != undefined && token != null && token != "";
  const [user, setUser] = useState(null);
  const [drawerOpened, setDrawerOpened] = useState(false);

  async function fetchUser() {
    try {
      const user = await userService.getCurrentUser();
      setUser({
        ...user.data,
        image:
          "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
      });
    } catch (error) {
      console.error("Error al traer usuario:", error);
    }
  }

  useEffect(() => {
    if (isLoggedIn) fetchUser();
  }, [isLoggedIn]);

  const renderLink = (link, label) => {
    if (!link) {
      return (
        <span className={classes.link} style={{ cursor: "default" }}>
          {label}
        </span>
      );
    }
    if (link.startsWith("#")) {
      return (
        <HashLink smooth to={link} className={classes.link}>
          {label}
        </HashLink>
      );
    }
    return (
      <Link to={link} className={classes.link}>
        {label}
      </Link>
    );
  };

  const items = menuConfig.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{renderLink(item.link, item.label)}</Menu.Item>
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
            {renderLink(
              link.link,
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            )}
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <div key={link.label}>
        {renderLink(link.link, link.label)}
      </div>
    );
  });

  // Drawer items: simple vertical nav for mobile
  const drawerItems = menuConfig.map((m) => (
    <div key={m.label} className={classes.drawerSection}>
      <div className={classes.drawerMain}>{renderLink(m.link, m.label)}</div>
      {m.links?.map((sub) => (
        <div key={sub.link} className={classes.drawerSub}>
          {renderLink(sub.link, sub.label)}
        </div>
      ))}
    </div>
  ));

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

          <div className={classes.linksGroup}>{items}</div>

          <div className={classes.userGroup}>
            <Burger
              opened={drawerOpened}
              onClick={() => setDrawerOpened((o) => !o)}
              className={classes.burger}
              size="sm"
            />
            {token && !user ? (
              <Skeleton top={15} height={30} width={30} circle mb="xl" />
            ) : (
              <UserMenu user={user} />
            )}
          </div>
        </div>
      </Container>

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        padding="md"
        size="80%"
        position="right"
        withCloseButton={true}
      >
        <ScrollArea style={{ height: "100%" }} type="always">
          <div className={classes.drawerContent}>{drawerItems}</div>
        </ScrollArea>
      </Drawer>
    </header>
  );
}
