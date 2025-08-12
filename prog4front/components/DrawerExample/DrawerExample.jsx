import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

export function DrawerExample() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Authentication">
        <h1> Drawer ejemplo</h1>
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}