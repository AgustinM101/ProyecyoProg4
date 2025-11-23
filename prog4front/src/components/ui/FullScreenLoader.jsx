import React from "react";
import { Center, Paper, Loader, Stack, Text } from "@mantine/core";

export function FullScreenLoader({
    title = "Cargando",
    message = "Validando permisos...",
    }) {
    return (
        <Center style={{ minHeight: "60vh", padding: 20 }}>
        <Paper radius="md" p="lg" withBorder style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Loader size="xl" variant="dots" />
            <Stack spacing={2}>
            <Text weight={700}>{title}</Text>
            <Text size="sm" color="dimmed">
                {message}
            </Text>
            </Stack>
        </Paper>
        </Center>
    );
    }