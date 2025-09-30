import { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      ...formData,         
      plan: "Plan PHAV",   
      paymentMethod,       
      fechaCompra: new Date().toLocaleDateString(), 
    };

    // Guardar en localStorage
    localStorage.setItem("userProfile", JSON.stringify(userData));

    // Simulación de redirección
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

                {/* Si elige tarjeta, mostramos inputs simulados */}
                {paymentMethod === "transferencia" && (
                  <>
                    <Text className="card-info-text">Transfiera a este Alias:InfinitSport12(simulación)</Text>
                    <Text className="card-info-text">O a este CBU: 123-4567890123456789012-3(simulación)</Text>
                  </>
                )}
                    
                {paymentMethod === "mercadopago" && (
                  <>
                    <Text className="card-info-text">Será redirigido a Mercado Pago (simulación)</Text>
                  </>
                )}
                {paymentMethod === "efectivo" && (
                  <>
                    <Text className="card-info-text">Pague en efectivo en nuestras instalaciones (simulación)</Text>
                  </>
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
