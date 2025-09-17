import "./App.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { PrivateRoute, PublicRoute } from "./Routes";
import { PlansPage } from './pages/PlanPage/PlansPage';


function App() {
	return (
		<MantineProvider defaultColorScheme="dark">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					
					
					{/*Rutas públicas*/}
					<Route element={<PublicRoute />}>
						
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/planes" element={<PlansPage />} />
					</Route>

					{/*Rutas privadas */}
					<Route element={<PrivateRoute />}>
						
						
					</Route>
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	);
}

export default App;
