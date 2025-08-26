import "./LoginPage.css";
import { Link, useNavigate } from "react-router";
import { Button, Container, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react";

const UserSchema = z.object({
    email: z.email("El correo electrónico no es válido"),
    password: z.string("La contraseña no es válida")
        .min(4, "Debe tener mínimo 4 caracteres")
        .max(32, "Debe tener máximo 32 caracteres"),
});

export function LoginPage() {
    const form = useForm({
        resolver: zodResolver(UserSchema),
    })

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/home")
    }, []);

    async function onSubmit(formData) {
        const formDataJson = JSON.stringify(formData)
        const response = await fetch("http://localhost:9091/users/login", { method: "POST", body: formDataJson })
        if (response.ok) {
            const responseData = await response.json();
            localStorage.setItem("token", responseData.token);
            navigate("/home")
        }
    }

    return <main className="loginPage">
        <Container className="container">
            <header>
                <Title>Bienvenido!</Title>
                <Text>¿Aún no tienes una cuenta? <Link to="/register">Registrarse</Link></Text>
            </header>

            <form>
                <TextInput placeholder="Correo electrónico" error={form.formState.errors.email?.message} {...form.register("email")} />
                <PasswordInput placeholder="Contraseña" error={form.formState.errors.password?.message} {...form.register("password")} />

                <Button variant="filled" onClick={form.handleSubmit(onSubmit)}>Iniciar sesión</Button>
            </form>
        </Container>
    </main>
}