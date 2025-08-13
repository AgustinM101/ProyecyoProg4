import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@mantine/core/styles.css';
import { Button, Drawer, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


function App() {
  const [count, setCount] = useState(0)
  const [opened, { open, close }] = useDisclosure(false);


  return (
    <MantineProvider>
      
      <Drawer opened={opened} onClose={close} title="Authentication">
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </MantineProvider>
  )
}

export default App
