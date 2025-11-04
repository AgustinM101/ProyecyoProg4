import { useEffect, useState } from "react";
import {
    Container,
    Stack,
    Card,
    Text,
    Title,
    Badge,
    Group,
    Center,
    Loader,
} from "@mantine/core";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import { plansFormService } from "../../services/plansFormService";
import { userService } from "../../services/userService";
import { UserPlansAccordion } from "../../components/UserTable/UserPlansAccordion";

export function MyPlansPage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            setLoading(true);

            const response = await userService.getCurrentUser();
            const data = response?.data;
            if (data) setUser(data);
        } catch (error) {
            console.error("Error al cargar el usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Center h="100vh">
                <Loader size="lg" />
            </Center>
        );
    }

    return (
        <>
            <HeaderMenu />
            <Container size="md" py="xl">
                <Title order={1} ta="center" mb="xl">
                    Mis Planes
                </Title>

                {user.planUser ? (
                    <PlanCard userPlan={user.planUser} />
                ) : (
                    <Text ta="center">
                        No tenés planes activos actualmente.
                    </Text>
                )}
            </Container>
            <Footer />
        </>
    );
}

function PlanCard({ userPlan }) {
    return (
        <Card
            shadow="md"
            p="lg"
            radius="md"
            withBorder
            style={{
                backgroundColor: "#141413ff",
                color: "white",
                border: "1px solid #eeff05ff",
            }}
        >
            <Group justify="space-between">
                <div>
                    <Title order={4}>{userPlan.plan.name}</Title>
                    <Text size="sm" c="dimmed">
                        Expira:{" "}
                        {userPlan.expiration_date
                            ? new Date(
                                  userPlan.expiration_date
                              ).toLocaleDateString()
                            : "Sin fecha"}
                    </Text>
                </div>
                <Badge
                    color={
                        userPlan.status === "active"
                            ? "green"
                            : userPlan.status === "chargePending"
                            ? "yellow"
                            : "red"
                    }
                    variant="filled"
                >
                    {userPlan.status}
                </Badge>
            </Group>

            <Stack mt="md" spacing="md">
                <FormCard />
                <UserPlansAccordion action="read" plansUserId={userPlan.id} />
            </Stack>
        </Card>
    );
}

function FormCard() {
    const [loading, setFormLoading] = useState(false);
    const [formData, setFormData] = useState(null);

    const fetchForm = async () => {
        try {
            setFormLoading(true);
            const formResp = await plansFormService.getPlansFormsByUser();
            setFormData(formResp.data?.[0] || null);
        } catch (error) {
            console.error("Error al ver detalles del plan:", error);
        } finally {
            setFormLoading(false);
        }
    };

    useEffect(() => {
        fetchForm();
    }, []);

    if (loading) return <Loader color="orange" />;

    return (
        <Card
            p="md"
            radius="md"
            style={{
                backgroundColor: "#000000ff",
            }}
        >
            <Title order={5}>FORMULARIO</Title>
            {formData ? (
                <Stack mt="xs" spacing={4}>
                    <Text size="sm">
                        <strong>Nombre:</strong> {formData.nombre || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Edad:</strong> {formData.edad || "-"}
                    </Text>

                    <Text size="sm">
                        <strong>Sexo:</strong> {formData.sexo || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Altura:</strong> {formData.altura || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Peso actual:</strong>{" "}
                        {formData.peso_actual || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Peso deseado:</strong>{" "}
                        {formData.peso_deseado || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Actividad física:</strong>{" "}
                        {formData.actividad_fisica || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Antecedentes médicos:</strong>{" "}
                        {formData.antecedentes_medicos || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Alergias:</strong> {formData.alergias || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Medicamentos:</strong>{" "}
                        {formData.medicamentos || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Problemas digestivos:</strong>{" "}
                        {formData.problemas_digestivos || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Comidas diarias:</strong>{" "}
                        {formData.comidas_diarias || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Alimentos evitar:</strong>{" "}
                        {formData.alimentos_evitar || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Horarios de comida:</strong>{" "}
                        {formData.horarios_comida || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Consumo agua:</strong>{" "}
                        {formData.consumo_agua || "-"}
                    </Text>
                    <Text size="sm">
                        <strong>Consumo alcohol:</strong>{" "}
                        {formData.consumo_alcohol || "-"}
                    </Text>
                </Stack>
            ) : (
                <Text size="sm" c="dimmed">
                    No hay información del formulario.
                </Text>
            )}
        </Card>
    );
}
