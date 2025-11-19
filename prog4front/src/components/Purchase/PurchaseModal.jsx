import { 
  Modal,
  Card,
  Title,
  Button,
  Stack,
  Text,
  Select,
  Group,
  ThemeIcon,
  Divider,
  Box,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconCreditCard, IconCash, IconWallet } from "@tabler/icons-react";
import { paymentService } from "../../services/paymentService";
import { userService } from "../../services/userService";

export function PurchaseModal({ opened, onClose, plan }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await userService.getCurrentUser();
      if (!user?.data) {
        navigate("/login");
        return;
      }

      const userId = user.data.id;

      if (paymentMethod === "mercadopago") {
        // 👉 Crear preferencia en el backend
        console.log("Creando preferencia de pago en Mercado Pago...");
        const data = await paymentService.createPaymentPreference({
          title: plan.name,
          amount: plan.price,
          id_user: userId,
          id_plan: plan.id,
        });

        // 👉 Redirigir al usuario al checkout de Mercado Pago
        if (data?.url?.init_point) {
          window.location.href = data.url.init_point;

       
        } else {
          alert("No se obtuvo la URL de Mercado Pago.");
        }
      } else {
        // 👉 Otros métodos (transferencia o efectivo)
        alert(
          paymentMethod === "transferencia"
            ? "Tu solicitud de pago por transferencia fue registrada."
            : "Tu solicitud de pago en efectivo fue registrada."
        );

        onClose();
        setTimeout(() => {
          navigate("/plansForms");
        }, 1000);
      }
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Hubo un error al procesar la compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      radius="xl"
      overlayProps={{ blur: 6, opacity: 0.55 }}
      transitionProps={{ transition: "pop", duration: 300 }}
      styles={{ content: { borderRadius: "20px", backgroundColor: "#f9fafc" } }}
    >
      <Card shadow="xl" radius="xl" p="xl" withBorder>
        <Stack align="center" spacing="xs" mb="lg">
          <Title order={2} color="blue" style={{ fontWeight: 700 }}>
            {plan?.name || "Compra del plan"}
          </Title>

          {plan?.price && (
            <Text size="xl" fw={700} color="teal">
              ${plan.price}
            </Text>
          )}

          <Text color="dimmed" size="sm">
            Elegí tu método de pago preferido
          </Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <Select
              label="Método de pago"
              placeholder="Seleccioná una opción"
              value={paymentMethod}
              onChange={setPaymentMethod}
              data={[
                { value: "transferencia", label: "🏦 Transferencia bancaria" },
                { value: "mercadopago", label: "💳 Mercado Pago" },
                { value: "efectivo", label: "💵 Efectivo en gimnasio" },
              ]}
              radius="md"
              required
            />

            {paymentMethod && (
              <Box
                mt="sm"
                p="md"
                style={{
                  backgroundColor: "#eef6ff",
                  borderRadius: 12,
                  border: "1px solid #d0e4ff",
                }}
              >
                {paymentMethod === "transferencia" && (
                  <Group>
                    <ThemeIcon color="teal" size={38} radius="xl" variant="light">
                      <IconCash size={22} />
                    </ThemeIcon>
                    <div>
                      <Text fw={600}>Datos para transferencia</Text>
                      <Text size="sm">
                        Alias: <b>infinit.sports</b>
                      </Text>
                      <Text size="sm">
                        CBU: <b>123-4567890-1234567890123</b>
                      </Text>
                    </div>
                  </Group>
                )}

                {paymentMethod === "mercadopago" && (
                  <Group>
                    <ThemeIcon color="blue" size={38} radius="xl" variant="light">
                      <IconCreditCard size={22} />
                    </ThemeIcon>
                    <Text size="sm">
                      Serás redirigido a Mercado Pago para completar la compra.
                    </Text>
                  </Group>
                )}

                {paymentMethod === "efectivo" && (
                  <Group>
                    <ThemeIcon color="orange" size={38} radius="xl" variant="light">
                      <IconWallet size={22} />
                    </ThemeIcon>
                    <Text size="sm">
                      Pagá directamente en el gimnasio cuando asistas.
                    </Text>
                  </Group>
                )}
              </Box>
            )}

            <Divider my="sm" />

            <Group position="center" mt="md">
              <Button type="submit" loading={loading} size="md" radius="md" color="blue" fullWidth>
                Confirmar compra
              </Button>
            </Group>
          </Stack>
        </form>
      </Card>
    </Modal>
  );
}
