import { useState } from "react";
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
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

import { paymentService } from "../../services/paymentService"; // ✅ Servicio de pagos
import "./PurchasePage.css";



export function PurchasePage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

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

  if (paymentMethod === "mercadopago") {
  // 🔹 Abrimos la ventana ANTES del await
  const mpWindow = window.open("", "_blank");

  try {
    const data = await paymentService.createPaymentPreference({
      nombre: formData.nombre,
      email: formData.email,
      plan: "Plan PHAV",
      title: "Plan PHAV",
      amount: 1000,
      plans_user_id: 1,
    });

    console.log("Respuesta backend:", data);

    const paymentUrl = data?.url?.init_point || null;

    if (paymentUrl && mpWindow) {
      mpWindow.location.href = paymentUrl; // redirigimos la ventana abierta
      mpWindow.focus();
      alert("Se abrió Mercado Pago en una nueva pestaña. Completá el pago allí.");
    } else {
      if (mpWindow) mpWindow.close();
      alert("No se obtuvo la URL de pago. Mirá la consola (F12) para más detalles.");
      console.log("Respuesta inesperada del backend:", data);
    }
  } catch (error) {
    if (mpWindow) mpWindow.close();
    console.error("Axios error object:", error);
    alert("Error al conectar con Mercado Pago. Verificá la ruta o el Access Token.");
  }

  return;
}


  // 🔹 Otros métodos (simulación)
  localStorage.setItem("userProfile", JSON.stringify(userData));
  alert("Compra simulada. Redirigiendo a tu perfil...");
  navigate("/profile");
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



