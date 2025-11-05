import { Modal, Stack, TextInput, NumberInput, Textarea, Button } from "@mantine/core";
import { useState, useEffect } from "react";
export function PlanGenericoModal({ opened, onClose, plan, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [saving, setSaving] = useState(false); // <-- loader

  useEffect(() => {
    if (plan) setFormData(plan);
    else setFormData({ name: "", description: "", price: 0 });
  }, [plan]);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await onSave(formData); // llama a la función del padre
      onClose();
    } catch (error) {
      console.error("Error al guardar plan:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={plan ? "Editar Plan" : "Nuevo Plan"}
      centered
      overlayBlur={4}
      overlayColor="#000"
      radius="md"
      shadow="xl"
      padding="lg"
      styles={{
        modal: { border: "2px solid #080808ff" },
        header: { borderBottom: "2px solid #FF6600" },
      }}
    >
      <Stack spacing="md">
        <TextInput
          label="Nombre del plan"
          placeholder="Ingrese el nombre del plan"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
          required
          radius="md"
          styles={{ input: { border: "1.5px solid #FF6600" } }}
        />
        <Textarea
          label="Descripción"
          placeholder="Describa los detalles del plan"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.currentTarget.value })}
          required
          radius="md"
          styles={{ input: { border: "1.5px solid #FF6600" } }}
        />
        <NumberInput
          label="Precio ($)"
          placeholder="Ingrese el precio en pesos"
          value={formData.price}
          onChange={(val) => setFormData({ ...formData, price: val })}
          min={0}
          precision={2}
          required
          radius="md"
          styles={{ input: { border: "1.5px solid #FF6600" } }}
        />

        <Button
          color="orange"
          fullWidth
          size="md"
          radius="md"
          style={{ border: "2px solid #FF6600" }}
          onClick={handleSubmit}
          loading={saving} // <-- loader aquí
          disabled={saving}
        >
          {plan ? "Guardar Cambios" : "Crear Plan"}
        </Button>
      </Stack>
    </Modal>
  );
}
