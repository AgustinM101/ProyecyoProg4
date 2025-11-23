import React, { useState } from "react";
import { Menu, Button, Group, Text } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

export function ActionsMenu({ items = [], label = "Opciones" }) {
  const [opened, setOpened] = useState(false);

  return (
    <Menu withinPortal opened={opened} onOpen={() => setOpened(true)} onClose={() => setOpened(false)}>
      <Menu.Target>
        <Button variant="subtle" compact onClick={() => setOpened((o) => !o)}>
          <Group spacing={6}>
            <Text>{label}</Text>
            <IconDots size={14} />
          </Group>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {items.map((it, i) => (
          <Menu.Item
            key={i}
            icon={it.icon}
            color={it.color}
            disabled={it.disabled}
            onClick={async (e) => {
              try {
                const result = it.onClick?.(e);
                // si el item marca que NO debe cerrar al hacer click, esperamos (si es promesa) y no cerramos
                if (it.closeOnClick === false) {
                  if (result && typeof result.then === "function") {
                    await result;
                  }
                  return;
                }
                // comportamiento por defecto: esperar la promesa (si la hay) y luego cerrar
                if (result && typeof result.then === "function") {
                  await result;
                }
              } finally {
                setOpened(false);
              }
            }}
          >
            {it.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}