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

import { userService } from "../../services/userService";
import "./PurchasePage.css";



export function PurchasePage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("status");
    if (!status) return;
    if (status === "success" || status === "approved" || status === "pending")
      navigate("/plansForms");
    else if (status === "failure") navigate("/purchase");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userResponse = await userService.getCurrentUser();
      const user = userResponse.data;

      if (!user?.id) {
        alert("No se pudo obtener el usuario logueado.");
        return;
      }

      const idPlan = 1; // ajustar si hay varios planes
      const planStatus =
        paymentMethod === "mercadopago" ? "Pendiente" : "Payment Request";

      // calcular expiration_date solo para transferencia/efectivo
      let expirationDate = null;
      if (paymentMethod === "efectivo" || paymentMethod === "transferencia") {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        expirationDate = date.toISOString().slice(0, 19).replace("T", " ");
      }

      // Debug - ver exactamente qué enviamos
      console.log("Payload createUserPlan:", {
        id_user: user.id,
        id_plan: idPlan,
        paymentMethod,
        status: planStatus,
        expiration_date: expirationDate,
        amount: 19000,
      });

      // Usamos createUserPlan (no tocamos createPlan)
      const response = await plansUserService.createUserPlan({
        id_user: user.id,
        id_plan: idPlan,
        paymentMethod,
        status: planStatus,
        expiration_date: expirationDate,
        amount: 19000,
      });

      // axios puede devolver el objeto en response.data; adaptamos casos comunes
      const payload = response?.data || response;
      console.log("Respuesta createUserPlan:", payload);

      // Extraemos ID de varias posibles formas
      const plansUserId =
        payload?.data?.id ||
        payload?.id ||
        payload?.data?.plans_user_id ||
        payload?.plans_user_id ||
        null;

      if (!plansUserId) {
        console.error("No se recibió ID del plan asignado. Respuesta completa:", payload);
        throw new Error("No se recibió el ID del plan asignado.");
      }

      // Si es MercadoPago: crear preferencia y redirigir
      if (paymentMethod === "mercadopago") {
        const paymentData = await paymentService.createPaymentPreference({
          plans_user_id: plansUserId,
          id_user: user.id,
          id_plan: idPlan,
          title: "Plan PHAV",
          amount: 19000,
        });

        const paymentUrl =
          paymentData?.preference?.data?.preference?.sandbox_init_point ||
          paymentData?.preference?.data?.preference?.init_point ||
          null;

        if (paymentUrl) {
          window.location.href = paymentUrl;
          return;
        } else {
          console.log("Respuesta completa de MP:", paymentData);
          alert("No se obtuvo la URL de pago. Revisá la consola (F12).");
          return;
        }
      }

      // Efectivo / transferencia: éxito y redirección
      alert("Compra registrada correctamente. Redirigiendo al formulario...");
      navigate("/plansForms");
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      // si axios, mostrar error.response.data para debugging
      if (error?.response) console.error("Axios response:", error.response);
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
