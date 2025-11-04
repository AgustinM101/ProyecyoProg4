import { useState, useEffect } from "react";
import {
  Container,
  Card,
  TextInput,
  Title,
  Button,
  Stack,
  Select,
  Group,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";

import { paymentService } from "../../services/paymentService";
import { plansUserService } from "../../services/plansUserService";

import "./PurchasePage.css";



export function PurchasePage() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  // 🔹 Maneja el regreso desde Mercado Pago y redirige según el estado
  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("status");
    if (!status) return;

    if (status === "success" || status === "approved") navigate("/plansForms");
    else if (status === "pending") navigate("/plansForms");
    else if (status === "failure") navigate("/purchase");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      ...formData,
      plan: "Plan PHAV",
      paymentMethod,
      fechaCompra: new Date().toLocaleDateString(),
    };

    const planStatus = paymentMethod === "mercadopago" ? "Pendiente" : "Payment Request";

    try {
      // 1️⃣ Crear plan en tu sistema
      const planResponse = await plansUserService.createUserPlan({
        id_user: 11,
        id_plan: 1,
        status: planStatus,
        amount: 19000,
      });

      const plansUserId =
        planResponse?.data?.id ||
        planResponse?.data?.data?.id ||
        planResponse?.data?.plans_user_id;

      if (!plansUserId) throw new Error("No se recibió el ID del plan asignado");

      // 2️⃣ Si el usuario elige Mercado Pago
      if (paymentMethod === "mercadopago") {
        const paymentData = await paymentService.createPaymentPreference({
          plans_user_id: plansUserId,
          id_user: 11,
          id_plan: 1,
          title: "Plan PHAV",
          amount: 19000,
        });

        // ✅ Extraemos la URL correcta
        const paymentUrl =
          paymentData?.preference?.data?.preference?.sandbox_init_point ||
          paymentData?.preference?.data?.preference?.init_point ||
          null;

        if (paymentUrl) {
          // 🔹 Redirigimos en la misma pestaña
          window.location.href = paymentUrl;
          return;
        } else {
          console.log("Respuesta completa de MP:", paymentData);
          alert("No se obtuvo la URL de pago. Revisá la consola (F12).");
          return;
        }
      }

      // 3️⃣ Para transferencia o efectivo
      localStorage.setItem("userProfile", JSON.stringify(userData));
      alert("Compra registrada correctamente. Redirigiendo al formulario...");
      navigate("/plansForms");
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Hubo un error al registrar tu compra. Revisá la consola (F12).");
    }
  };

  return (
    <>
      <HeaderMenu />
      <div className="purch-wrapper">
        <Container size="sm">
          <Card className="purch-card" shadow="lg" padding="xl" radius="lg">
            <Title order={2} className="purch-title">
              Formulario de Compra
            </Title>
            <form onSubmit={handleSubmit}>
              <Stack className="purch-stack">
                <TextInput
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  label="Teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
                <Select
                  label="Forma de pago"
                  placeholder="Selecciona una opción"
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  data={[
                    { value: "transferencia", label: "Transferencia" },
                    { value: "mercadopago", label: "Mercado Pago" },
                    { value: "efectivo", label: "Efectivo" },
                  ]}
                  required
                />
                {paymentMethod === "transferencia" && (
                  <>
                    <Text>Alias: InfinitSport12</Text>
                    <Text>CBU: 123-4567890123456789012-3</Text>
                  </>
                )}
                {paymentMethod === "mercadopago" && (
                  <Text>Será redirigido a Mercado Pago</Text>
                )}
                {paymentMethod === "efectivo" && (
                  <Text>Pague en efectivo en nuestras instalaciones</Text>
                )}
                <Group position="center" mt="md">
                  <Button type="submit" size="lg" radius="md">
                    Finalizar compra
                  </Button>
                </Group>
              </Stack>
            </form>
          </Card>
        </Container>
      </div>
      <Footer />
    </>
  );
}






