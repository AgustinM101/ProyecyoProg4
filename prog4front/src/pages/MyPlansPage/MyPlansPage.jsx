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
                    {/* Plan Alimentario */}
                    <Card p="md" radius="md" style={{ backgroundColor: "#000000ff" }}>
                      <Title order={5}>Plan Alimentario</Title>
                      {planAlimento.length > 0 ? (
                        planAlimento.map((pa) => (
                          <Card
                            key={pa.id}
                            mt="xs"
                            p="sm"
                            radius="md"
                            style={{ backgroundColor: "#3A3B3E" }}
                          >
                            <Stack spacing={2}>
                              <Text size="sm">
                                <strong>description:</strong> {pa.description}
                              </Text>
                              <Text size="sm">
                                <strong>tipo:</strong> {pa.tipo}
                              </Text>
                              <Text size="sm">
                                <strong>Dias:</strong> {pa.dias}
                              </Text>
                            </Stack>
                          </Card>
                        ))
                      ) : (
                        <Text size="sm" c="dimmed">
                          Aún no hay plan alimentario asignado.
                        </Text>
                      )}
                    </Card>

                    {/* Plan de Ejercicio */}
                    <Card p="md" radius="md" style={{ backgroundColor: "#000000ff" }}>
                      <Title order={5}>Plan de Ejercicio</Title>
                      {planEjercicio.length > 0 ? (
                        planEjercicio.map((pe) => (
                          <Card
                            key={pe.id}
                            mt="xs"
                            p="sm"
                            radius="md"
                            style={{ backgroundColor: "#090909ff" }}
                          >
                            <Stack spacing={2}>
                              <Text size="sm">
                                <strong>tipo:</strong> {pe.tipo}
                              </Text>
                              <Text size="sm">
                                <strong>Dias:</strong> {pe.dias}
                              </Text>
                              <Text size="sm">
                                <strong>Descripcion:</strong> {pe.descripcion}
                              </Text>
                    
                            </Stack>
                          </Card>
                        ))
                      ) : (
                        <Text size="sm" c="dimmed">
                          Aún no hay plan de ejercicios asignado.
                        </Text>
                      )}
                    </Card>
                  </Stack>
                )}
              </Card>
            ))}
          </Stack>
        )}
      </Container>
      <Footer />
    </>
  );

}
