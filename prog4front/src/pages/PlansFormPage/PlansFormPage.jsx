import { useState } from "react";
import {
  Container,
  Card,
  TextInput,
  Title,
  Button,
  Select,
  Textarea,
  Group,
  Center,
  Loader,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { Footer } from "../../components/Footer/Footer";
import "./PlansFormPage.css";
import { plansFormService } from "../../services/plansFormService";

export function PlansFormPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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

      const response = await plansFormService.createPlanForms(data);

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

        setTimeout(() => {
          navigate("/profile");
        }, 1000);
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

            {/* ⚠️ AVISO DE CONFIDENCIALIDAD */}
            <div
              style={{
                backgroundColor: "#111",
                border: "1px solid #f5c400",
                padding: "15px",
                borderRadius: "10px",
                marginTop: "15px",
                marginBottom: "25px",
              }}
            >
              <p
                style={{
                  color: "white",
                  margin: 0,
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                ⚠️ <strong>Aviso de Confidencialidad:</strong>  
                La información proporcionada en esta ficha clínica es estrictamente confidencial.
                Será utilizada únicamente para evaluación nutricional y seguimiento profesional,
                sin ser compartida con terceros bajo ninguna circunstancia.
              </p>
            </div>

            {success && (
              <div style={{ color: "green", marginBottom: 20 }}>
                Formulario enviado correctamente ✅
              </div>
            )}

            <form onSubmit={handleSubmit} className="premium-form">
              {/* === SECCIÓN 1: DATOS PERSONALES === */}
              <h3 className="section-title">Datos Personales</h3>
              <div className="section-divider"></div>

              <div className="two-columns">
                <div className="field-row">
                  <label>Nombre completo</label>
                  <TextInput
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-row">
                  <label>Edad</label>
                  <TextInput
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-row">
                  <label>Sexo</label>
                  <Select
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
                </div>

                <div className="field-row">
                  <label>Altura (m)</label>
                  <TextInput
                    name="altura"
                    value={formData.altura}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-row">
                  <label>Peso actual (kg)</label>
                  <TextInput
                    name="peso_actual"
                    value={formData.peso_actual}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-row">
                  <label>Peso deseado (kg)</label>
                  <TextInput
                    name="peso_deseado"
                    value={formData.peso_deseado}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* === SECCIÓN 2: HISTORIAL CLÍNICO === */}
              <h3 className="section-title">Historial Clínico</h3>
              <div className="section-divider"></div>

              <div className="two-columns">
                <div className="field-row">
                  <label>Antecedentes médicos</label>
                  <Textarea
                    name="antecedentes_medicos"
                    value={formData.antecedentes_medicos}
                    onChange={handleChange}
                    autosize
                    minRows={3}
                  />
                </div>

                <div className="field-row">
                  <label>Alergias</label>
                  <Textarea
                    name="alergias"
                    value={formData.alergias}
                    onChange={handleChange}
                    autosize
                    minRows={3}
                  />
                </div>

                <div className="field-row">
                  <label>Medicamentos</label>
                  <Textarea
                    name="medicamentos"
                    value={formData.medicamentos}
                    onChange={handleChange}
                    autosize
                    minRows={3}
                  />
                </div>

                <div className="field-row">
                  <label>Problemas digestivos</label>
                  <Textarea
                    name="problemas_digestivos"
                    value={formData.problemas_digestivos}
                    onChange={handleChange}
                    autosize
                    minRows={3}
                  />
                </div>
              </div>

              {/* === SECCIÓN 3: HÁBITOS === */}
              <h3 className="section-title">Hábitos y Rutinas</h3>
              <div className="section-divider"></div>

              <div className="two-columns">
                <div className="field-row">
                  <label>Actividad física</label>
                  <Textarea
                    name="actividad_fisica"
                    value={formData.actividad_fisica}
                    onChange={handleChange}
                    autosize
                    minRows={3}
                  />
                </div>

                <div className="field-row">
                  <label>Comidas diarias</label>
                  <Textarea
                    name="comidas_diarias"
                    value={formData.comidas_diarias}
                    onChange={handleChange}
                    autosize
                    minRows={3}
                  />
                </div>

                <div className="field-row">
                  <label>Alimentos a evitar</label>
                  <Textarea
                    name="alimentos_evitar"
                    value={formData.alimentos_evitar}
                    onChange={handleChange}
                    autosize
                    minRows={3}
                  />
                </div>

                <div className="field-row">
                  <label>Horarios de comidas</label>
                  <Textarea
                    name="horarios_comidas"
                    value={formData.horarios_comidas}
                    onChange={handleChange}
                    autosize
                    minRows={3}
                  />
                </div>

                <div className="field-row">
                  <label>Consumo de agua (litros/día)</label>
                  <TextInput
                    name="consumo_agua"
                    value={formData.consumo_agua}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-row">
                  <label>Consumo de alcohol (veces/semana)</label>
                  <TextInput
                    name="consumo_alcohol"
                    value={formData.consumo_alcohol}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Group position="center" mt="lg">
                <Button type="submit" size="lg" radius="md" className="premium-btn">
                  Guardar ficha clínica
                </Button>
              </Group>
            </form>
          </Card>
        </Container>
      </div>

      <Footer />
    </>
  );
}
