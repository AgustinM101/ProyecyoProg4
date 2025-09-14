import { IconBrandFacebook, IconBrandGmail, IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons-react';
import { ActionIcon, Group } from '@mantine/core';
import classes from './Footer.module.css';



export function Footer() {

  return (
    <div className={classes.footer}>
        <div className={classes.inner}>
            <a href="/">
                <img
                    className={classes.logoInfinitsports}
                    src="https://res.cloudinary.com/dkv58dvqy/image/upload/v1757462534/logo_nuevo_infinit_sports_nsmg9n.png"
                    alt="logo infinit sports"
                />
            </a>
            <Group className={classes.links}>
                <p className={classes.titleAnton}>COPYRIGHT © 2024 INFINIT SPORTS ALL RIGHTS RESERVED.</p>
            </Group>

            <Group gap="xs" justify="flex-end" wrap="nowrap">
                <a
                    href="teaminfinit2020@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ActionIcon
                        className={classes.socialIcon}
                        size="lg"
                        variant="default"
                        color="rgba(0,0,0,1)"
                    >
                        <IconBrandGmail size={30} stroke={1.5} />
                    </ActionIcon>
                </a>

                <a
                    href="https://www.facebook.com/profile.php?id=100063633664111"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ActionIcon
                        className={classes.socialIcon}
                        size="lg"
                        variant="default"
                        color="rgba(0,0,0,1)"
                    >
                        <IconBrandFacebook size={30} stroke={1.5} />
                    </ActionIcon>
                </a>

                    <a
                        href="https://www.instagram.com/infinit_sport_/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ActionIcon
                            className={classes.socialIcon}
                            size="lg"
                            variant="default"
                            color="rgba(0,0,0,1)"
                        >
                            <IconBrandInstagram size={30} stroke={1.5} />
                        </ActionIcon>
                    </a>
                </Group>

        </div>
    </div>
  );
}