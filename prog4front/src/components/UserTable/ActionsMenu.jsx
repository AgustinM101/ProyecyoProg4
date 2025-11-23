import React from "react";
import { Menu, Button, Group, Text } from "@mantine/core";
import { IconDots, IconTrash, IconPencil, IconCheck, IconEye } from "@tabler/icons-react";

export function ActionsMenu({ items = [], label = "Acciones" }) {
  return (
    <Menu withinPortal>
      <Menu.Target>
        <Button variant="subtle" compact>
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
            onClick={it.onClick}
            disabled={it.disabled}
          >
            {it.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}