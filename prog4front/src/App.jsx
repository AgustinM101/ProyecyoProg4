import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import {  LoginRegister } from './components/LoginRegisterForms/LoginRegister';


function App() {
 


  return (
    <MantineProvider>
        

        <LoginRegister/>
       

    </MantineProvider>
  )
}

export default App
