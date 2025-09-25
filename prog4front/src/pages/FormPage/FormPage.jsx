import { useState } from "react";
import { Container, Card, TextInput, Title, Button, Stack, Select, Group, Text, Alert } from "@mantine/core";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./FormPage.css";
import { IconAdjustmentsCheck } from "@tabler/icons-react";

export function FormPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [success, setSuccess] = useState(false); // 👈 estado para controlar el Alert
	const [error, setError] = useState(undefined); 

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

    // Mostrar alert de éxito
    setSuccess(true);

    // Redirigir después de 2 segundos
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  return (
    <>
      <HeaderMenu />
      

      <div className="form-wrapper">
        {/* Alert de éxito */}
            {success && (
              <Alert
                icon={<IconAdjustmentsCheck size="1.2rem" />}
                title="Compra exitosa"
                color="green"
                radius="md"
                mt="md"
                withCloseButton
                onClose={() => setSuccess(false)}
                delay={7000}
                variant="filled"
                
              >
                Tu compra se realizó con éxito. Serás redirigido a tu perfil en unos segundos.
              </Alert>
            )}
        <Container size="sm">
          <Card className="form-card" shadow="lg" padding="xl" radius="lg">
            <Title order={2} className="form-title">
              Formulario de Compra
            </Title>

            

            <form onSubmit={handleSubmit}>
              <Stack className="form-stack">
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
                    { value: "tarjeta", label: "Tarjeta de crédito/débito" },
                    { value: "mercadopago", label: "Mercado Pago" },
                    { value: "efectivo", label: "Efectivo / Transferencia" },
                  ]}
                  required
                />

                {paymentMethod === "tarjeta" && (
                  <>
                    <Text className="card-info-text">Ingrese los datos de su tarjeta (simulación)</Text>
                    <TextInput
                      label="Número de tarjeta"
                      placeholder="1234 1234 1234 1234"
                      name="tarjetaNumero"
                      value={formData.tarjetaNumero}
                      onChange={handleChange}
                      required
                    />
                    <TextInput
                      label="Expiración"
                      placeholder="MM/AA"
                      name="tarjetaExp"
                      value={formData.tarjetaExp}
                      onChange={handleChange}
                      required
                    />
                    <TextInput
                      label="CVV"
                      placeholder="123"
                      name="tarjetaCVV"
                      value={formData.tarjetaCVV}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}

                <Group position="center" mt="md">
                  <Button type="submit" size="lg" radius="md" className="form-btn">
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
