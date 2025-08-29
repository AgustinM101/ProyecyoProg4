import "./LoginPage.css";
import { Link, useNavigate } from "react-router";
import {
	Button,
	Container,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/authService";
import { useState } from "react";

const UserSchema = z.object({
	email: z
		.email("El correo electrónico no es válido")
		.max(48, "Debe tener máximo 48 caracteres"),
	password: z
		.string("La contraseña no es válida")
		.min(4, "Debe tener mínimo 4 caracteres")
		.max(32, "Debe tener máximo 32 caracteres"),
});

export function LoginPage() {
	const form = useForm({
		resolver: zodResolver(UserSchema),
	});

	const navigate = useNavigate();
	const [error, setError] = useState(undefined);

	async function onSubmit(formData) {
		try {
			setError(undefined); // Eliminar cualquier error previo

			const formDataJson = JSON.stringify(formData);
			const response = await authService.login(formDataJson);

			const token = response.data.token;
			if (token) {
				localStorage.setItem("token", token);
				navigate("/home");
			} else {
				throw new Error("Ocurrió un error inesperado");
			}
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<main className="loginPage">
			<Container className="container">
				<header>
					<Title>Bienvenido!</Title>
					<Text>
						¿Aún no tienes una cuenta? <Link to="/register">Registrarse</Link>
					</Text>
				</header>

				<form>
					<TextInput
						placeholder="Correo electrónico"
						error={form.formState.errors.email?.message}
						{...form.register("email")}
					/>

					<PasswordInput
						placeholder="Contraseña"
						error={form.formState.errors.password?.message}
						{...form.register("password")}
					/>

					{error ? <p className="errorMessage">{error}</p> : null}

					<Button
						variant="filled"
						onClick={form.handleSubmit(onSubmit)}
						loading={form.formState.isSubmitting}
					>
						Iniciar sesión
					</Button>
				</form>
			</Container>
		</main>
	);
}
