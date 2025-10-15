import { useState, useEffect } from "react";
import { Container, Card, TextInput, Title, Button, Stack, Select, Group, Text } from "@mantine/core";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./PurchasePage.css";

export function PurchasePage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tarjetaNumero: "",
    tarjetaExp: "",
    tarjetaCVV: "",
  });

  // ✅ Validar si el usuario está logueado
  /*useEffect(() => {
    const user = localStorage.getItem("user"); // acá deberías tener guardado el user o token al loguear
    if (!user) {
      alert("Debes iniciar sesión o registrarte para comprar un plan.");
      navigate("/login");
    }
  }, [navigate]);
*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Actualizado: integración con Mercado Pago
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      ...formData,
      plan: "Plan PHAV",
      paymentMethod,
      fechaCompra: new Date().toLocaleDateString(),
    };

    // 🔹 Si el método de pago es Mercado Pago
    if (paymentMethod === "mercadopago") {
      try {
        const response = await fetch("http://localhost:9091/payment", { // ✅ URL correcta con tu puerto
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: formData.nombre,
            email: formData.email,
            plan: "Plan PHAV",
            amount: 1000, // Reemplazá con el precio real del plan
          }),
        });

        if (!response.ok) {
          throw new Error("Error al generar la preferencia en Mercado Pago");
        }

        const data = await response.json();

        if (data.url) {
          // 🔹 Abrir checkout de Mercado Pago en nueva pestaña
          const mpWindow = window.open(data.url, "_blank");
          if (mpWindow) {
            mpWindow.focus();
            alert("Se abrió Mercado Pago en una nueva pestaña. Completá el pago allí.");
          } else {
            alert("No se pudo abrir la ventana de Mercado Pago. Verificá que no esté bloqueada por el navegador.");
          }
        } else {
          alert("No se pudo obtener la URL de pago.");
        }
      } catch (error) {
        console.error(error);
        alert("Hubo un problema al conectar con Mercado Pago. Revisá tu Access Token y la URL del backend.");
      }
      return; // 🚫 No continúa con la simulación local
    }

    // 🔹 Simulación para otros métodos
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
                  placeholder="Tu nombre completo"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />

                <TextInput
                  label="Email"
                  placeholder="Tu correo electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <TextInput
                  label="Teléfono"
                  placeholder="Tu número de teléfono"
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
                    { value: "transferencia", label: "Transferencia con alias" },
                    { value: "mercadopago", label: "Mercado Pago" },
                    { value: "efectivo", label: "Efectivo " },
                  ]}
                  required
                />

                {/* Simulaciones según el método */}
                {paymentMethod === "transferencia" && (
                  <>
                    <Text className="card-info-text">Alias: InfinitSport12 (simulación)</Text>
                    <Text className="card-info-text">CBU: 123-4567890123456789012-3 (simulación)</Text>
                  </>
                )}

                {paymentMethod === "mercadopago" && (
                  <Text className="card-info-text">Será redirigido a Mercado Pago</Text>
                )}

                {paymentMethod === "efectivo" && (
                  <Text className="card-info-text">Pague en efectivo en nuestras instalaciones (simulación)</Text>
                )}

                <Group position="center" mt="md">
                  <Button type="submit" size="lg" radius="md" className="purch-btn">
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

