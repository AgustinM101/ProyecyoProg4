import "./App.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";

import { Nosotros } from "./pages/Nosotros/Nosotros";
import { PrivateRoute, PublicRoute } from "./Routes";

import { AdminPage } from "./pages/AdminPage/AdminPage";
import { PlansPage } from "./pages/PlansPage/PlansPage";
import { PlanPhavPage } from "./pages/PlanPhav/PlanPhavPage";
import { PlanCompeticionPage } from "./pages/PlanCompeticion/PlanCompeticionPage";
import { FormPage } from "./pages/FormPage/FormPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import MyPlansPage from "./pages/MyPlansPage/MyPlansPage";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <Routes>
          {/* Rutas generales */}
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/plans/phav" element={<PlanPhavPage />} />
          <Route path="/plans/competition" element={<PlanCompeticionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/form" element={<FormPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          <Route path="/myplans" element={<MyPlansPage />} />
            
          {/* Rutas públicas */}
          <Route element={<PublicRoute />}>
            

            {/* 👇 agregadas aquí */}
            
          </Route>

          {/* Rutas privadas */}
          <Route element={<PrivateRoute />}>
            {/* acá van las rutas que requieran login */}
          </Route>

          {/* Ruta fallback */}
          <Route path="*" element={<h1>Ruta no encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;

