import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import 'dayjs/locale/es';

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
import { PurchasePage } from "./pages/PurchasePage/PurchasePage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";

import MyPlansPage from "./pages/MyPlansPage/MyPlansPage";

import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { DatesProvider } from "@mantine/dates";
import { FormPage } from "./pages/FormPage/FormPage";
import { PlanesClientesPage } from "./pages/AdminPage/PlanesClientesPage";
import { PlanesGenericosPage } from "./pages/AdminPage/PlanesGenericosPage";
import { FormulariosPage } from "./pages/AdminPage/FormulariosPage";
import { ClientesPage } from "./pages/AdminPage/ClientesPage";

function App() {

    return (
        <MantineProvider defaultColorScheme="dark">
            <DatesProvider settings={{locale: "es"}} >
                <BrowserRouter>
                    <Routes>
                        {/* Rutas generales */}
                        <Route path="/" element={<HomePage />} />

                        <Route path="/plans" element={<PlansPage />} />
                        <Route path="/plans/phav" element={<PlanPhavPage />} />
                        <Route
                            path="/plans/competition"
                            element={<PlanCompeticionPage />}
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/nosotros" element={<Nosotros />} />

                        <Route path="/profile" element={<ProfilePage />} />


                             <Route path="/admin" element={<AdminPage />} />
                            <Route path="/myplans" element={<MyPlansPage />} />
                            <Route path="/form" element={<FormPage />} />
                            <Route path="/purchase" element={<PurchasePage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/formularios" element={<FormulariosPage />} />
                            <Route path="/clientes" element={<ClientesPage />} />
                            <Route path="/userplanes" element={<PlanesClientesPage />} />
                            <Route path="/genericplanes" element={<PlanesGenericosPage />} />






                        {/* Rutas públicas */}
                        <Route element={<PublicRoute />}>
                            {/* 👇 agregadas aquí */}
                        </Route>

                        {/* Rutas privadas */}
                        <Route element={<PrivateRoute />}>
                            {/* acá van las rutas que requieran login */}

                        </Route>

                        {/* Ruta fallback */}
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </DatesProvider>
        </MantineProvider>
    );

}

export default App;
