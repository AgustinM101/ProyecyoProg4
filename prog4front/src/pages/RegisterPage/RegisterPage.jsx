import "./RegisterPage.css";
import { Link, useNavigate } from "react-router";
import { Button, Container, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react";

const UserSchema = z.object({
    name: z.string("Ingresa un nombre válido")
        .min(4, "Debe tener mínimo 4 caracteres")
        .max(32, "Debe tener máximo 32 caracteres"),
    email: z.email("El correo electrónico no es válido"),
    password: z.string("La contraseña no es válida")
        .min(4, "Debe tener mínimo 4 caracteres")
        .max(32, "Debe tener máximo 32 caracteres"),
});

export function RegisterPage() {
    const form = useForm({
        resolver: zodResolver(UserSchema),
    })

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/home")
    }, []);

    async function onSubmit(formData) {
        const formDataJson = JSON.stringify(formData)
        const response = await fetch("http://localhost:9091/users", { method: "POST", body: formDataJson })
        if (response.ok) navigate("/login");
    }

    return <main className="registerPage">
        <Container className="container">
            <header>
                <Title>Bienvenido!</Title>
                <Text>¿Ya tienes una cuenta? <Link to="/login">Ingresar</Link></Text>
            </header>

            <form>
                <TextInput placeholder="Nombre" error={form.formState.errors.name?.message}  {...form.register("name")} />
                <TextInput placeholder="Correo electrónico" error={form.formState.errors.email?.message} {...form.register("email")} />
                <PasswordInput placeholder="Contraseña" error={form.formState.errors.password?.message} {...form.register("password")} />

                <Button variant="filled" onClick={form.handleSubmit(onSubmit)}>Registrarme</Button>
            </form>
        </Container>
    </main>
}