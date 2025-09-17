import "./App.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { PrivateRoute, PublicRoute } from "./Routes";



import { AdminPage } from "./pages/AdminPage/AdminPage";
import { PlansPage } from "./pages/PlansPage/PlansPage";


function App() {
	return (
		<MantineProvider defaultColorScheme="dark">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/admin" element={<AdminPage/>} />
					<Route path="/plans" element={<PlansPage />} />	
					
					{/*Rutas públicas*/}
					<Route element={<PublicRoute />}>
						
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						


					</Route>

					{/*Rutas privadas */}
					<Route element={<PrivateRoute />}>

						
						
					</Route>
					<Route path="*" element={<h1>Ruta no encontrada</h1>} />
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	);
}

export default App;
