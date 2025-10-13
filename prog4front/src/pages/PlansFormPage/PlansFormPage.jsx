import { useState } from "react";
import { Container, Card, TextInput, Title, Button, Stack, Select, Textarea, Group, Center, Loader } from "@mantine/core";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import "./PlansFormPage.css";
import { plansFormService } from "../../services/plansFormService";

export function PlansFormPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    sexo: "",
    altura: "",
    peso_actual: "",
    peso_deseado: "",
    actividad_fisica: "",
    antecedentes_medicos: "",
    alergias: "",
    medicamentos: "",
    problemas_digestivos: "",
    comidas_diarias: "",
    alimentos_evitar: "",
    horarios_comidas: "",
    consumo_agua: "",
    consumo_alcohol: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelect = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      data.append("fecha_registro", new Date().toISOString().split("T")[0]);
      data.append("id_plans_user", 1); // ⚡ Cambiar según el usuario logueado

      const response = await plansFormService.create(data);

      if (response?.success || response?.status === 200) {
        setSuccess(true);
        setFormData({
          nombre: "",
          edad: "",
          sexo: "",
          altura: "",
          peso_actual: "",
          peso_deseado: "",
          actividad_fisica: "",
          antecedentes_medicos: "",
          alergias: "",
          medicamentos: "",
          problemas_digestivos: "",
          comidas_diarias: "",
          alimentos_evitar: "",
          horarios_comidas: "",
          consumo_agua: "",
          consumo_alcohol: "",
        });
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("❌ Error al enviar formulario:", error);
      alert("Ocurrió un error al enviar el formulario ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <HeaderMenu />

      <div className="plansform-wrapper">
        <Container size="sm">
          <Card shadow="xl" padding="xl" radius="lg" className="plansform-card">
            <Title order={2} className="plansform-title">
              Formulario de Información Nutricional
            </Title>

            {success && (
              <div style={{ color: "green", marginBottom: 20 }}>
                Formulario enviado correctamente ✅
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <Stack gap="sm">
                <TextInput label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                <TextInput label="Edad" name="edad" value={formData.edad} onChange={handleChange} required />
                <Select
                  label="Sexo"
                  name="sexo"
                  value={formData.sexo}
                  onChange={(value) => handleSelect("sexo", value)}
                  data={[
                    { value: "F", label: "Femenino" },
                    { value: "M", label: "Masculino" },
                    { value: "O", label: "Otro" },
                  ]}
                  required
                />
                <TextInput label="Altura (m)" name="altura" value={formData.altura} onChange={handleChange} />
                <TextInput label="Peso actual (kg)" name="peso_actual" value={formData.peso_actual} onChange={handleChange} />
                <TextInput label="Peso deseado (kg)" name="peso_deseado" value={formData.peso_deseado} onChange={handleChange} />
                <Textarea label="Actividad física" name="actividad_fisica" value={formData.actividad_fisica} onChange={handleChange} autosize minRows={2} />
                <Textarea label="Antecedentes médicos" name="antecedentes_medicos" value={formData.antecedentes_medicos} onChange={handleChange} autosize minRows={2} />
                <Textarea label="Alergias" name="alergias" value={formData.alergias} onChange={handleChange} autosize minRows={2} />
                <Textarea label="Medicamentos" name="medicamentos" value={formData.medicamentos} onChange={handleChange} autosize minRows={2} />
                <Textarea label="Problemas digestivos" name="problemas_digestivos" value={formData.problemas_digestivos} onChange={handleChange} autosize minRows={2} />
                <Textarea label="Comidas diarias" name="comidas_diarias" value={formData.comidas_diarias} onChange={handleChange} autosize minRows={2} />
                <Textarea label="Alimentos a evitar" name="alimentos_evitar" value={formData.alimentos_evitar} onChange={handleChange} autosize minRows={2} />
                <Textarea label="Horarios de comidas" name="horarios_comidas" value={formData.horarios_comidas} onChange={handleChange} autosize minRows={2} />
                <TextInput label="Consumo de agua (litros diarios)" name="consumo_agua" value={formData.consumo_agua} onChange={handleChange} />
                <TextInput label="Consumo de alcohol (veces por semana)" name="consumo_alcohol" value={formData.consumo_alcohol} onChange={handleChange} />

                <Group position="center" mt="md">
                  <Button type="submit" size="lg" radius="md" className="plansform-btn">
                    Enviar formulario
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
