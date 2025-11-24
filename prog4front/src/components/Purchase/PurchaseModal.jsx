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
import { plansUserService } from "../../services/plansUserService";
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
        const data = await paymentService.createPaymentPreference({
          title: plan.name,
          amount: plan.price,
          id_user: userId,
          id_plan: plan.id,
        });

        if (data?.url?.init_point) {
          window.location.href = data.url.init_point;
          return;
        } else {
          alert("Error al generar pago con Mercado Pago.");
          return;
        }
      }

      await plansUserService.createPlan({
        id_user: userId,
        id_plan: plan.id,
        status: "paymentRequest",
      });

      alert(
        paymentMethod === "transferencia"
          ? "Tu solicitud de pago por transferencia fue registrada."
          : "Tu solicitud de pago en efectivo fue registrada."
      );

      onClose();
      setTimeout(() => navigate("/plansForms"), 1000);

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
      radius="lg"

      // 🔥 FONDO OSCURO
      overlayProps={{
        color: "#000",
        opacity: 0.75,
        blur: 2,
      }}

      styles={{
        content: {
          backgroundColor: "#111", // 🔥 FONDO OSCURO
          border: "2px solid #f5c400", // 🔥 BORDE DORADO
          borderRadius: "20px",
          padding: 0,
        }
      }}
    >
      <Card
        radius="lg"
        p="xl"
        style={{
          backgroundColor: "#111",  // 🔥 OSCURO
          border: "2px solid #f5c400", // 🔥 DORADO
          color: "#fff", // 🔥 LETRAS BLANCAS
          borderRadius: "20px",
        }}
      >
        <Stack align="center" spacing="xs" mb="lg">
          <Title
            order={2}
            style={{
              color: "#f5c400", // 🔥 TÍTULO DORADO
              fontWeight: 900,
              textAlign: "center"
            }}
          >
            {plan?.name || "Comprar plan"}
          </Title>

          {plan?.price && (
            <Text size="xl" fw={800} style={{ color: "#fff" }}>
              ${plan.price}
            </Text>
          )}
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
              styles={{
                input: {
                  borderRadius: "10px",
                  border: "1px solid #f5c400", // 🔥 DORADO
                  background: "#222",          // 🔥 OSCURO
                  color: "#fff",
                },
                label: { color: "#fff" }
              }}
            />

            {paymentMethod && (
              <Box
                mt="sm"
                p="md"
                style={{
                  backgroundColor: "#222",
                  borderRadius: 10,
                  border: "1px solid #f5c400", // 🔥 DORADO
                  color: "#fff",
                }}
              >
                {paymentMethod === "transferencia" && (
                  <Group>
                    <ThemeIcon size={38} radius="xl" style={{ background: "#f5c400" }}>
                      <IconCash size={22} color="#000" />
                    </ThemeIcon>
                    <div>
                      <Text fw={600}>Datos bancarios</Text>
                      <Text size="sm">Alias: <b>infinit.sports</b></Text>
                      <Text size="sm">CBU: <b>123-4567890-1234567890123</b></Text>
                    </div>
                  </Group>
                )}

                {paymentMethod === "mercadopago" && (
                  <Group>
                    <ThemeIcon size={38} radius="xl" style={{ background: "#f5c400" }}>
                      <IconCreditCard size={22} color="#000" />
                    </ThemeIcon>
                    <Text size="sm">Serás redirigido para completar el pago.</Text>
                  </Group>
                )}

                {paymentMethod === "efectivo" && (
                  <Group>
                    <ThemeIcon size={38} radius="xl" style={{ background: "#f5c400" }}>
                      <IconWallet size={22} color="#000" />
                    </ThemeIcon>
                    <Text size="sm">Pagás al asistir al gimnasio.</Text>
                  </Group>
                )}
              </Box>
            )}

            <Divider color="#444" />

            <Button
              type="submit"
              loading={loading}
              size="md"
              radius="lg"
              fullWidth
              style={{
                backgroundColor: "#f5c400",
                color: "#000",
                fontWeight: 700,
                borderRadius: "12px",
              }}
            >
              Confirmar compra
            </Button>
          </Stack>
        </form>
      </Card>
    </Modal>
  );
}
