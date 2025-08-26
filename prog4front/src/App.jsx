import './App.css';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from './pages/HomePage/HomePage';

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
