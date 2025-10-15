import { Modal, Stack, TextInput, NumberInput, Textarea, Button } from "@mantine/core";
import { useState, useEffect } from "react";

export function PlanGenericoModal({ opened, onClose, plan, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    if (plan) setFormData(plan);
    else setFormData({ name: "", description: "", price: 0 });
  }, [plan]);

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={plan ? "✏️ Editar Plan" : "➕ Nuevo Plan"}
      centered
    >
      <Stack>
        <TextInput
          label="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
          required
        />
        <Textarea
          label="Descripción"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.currentTarget.value })}
          required
        />
        <NumberInput
          label="Precio"
          value={formData.price}
          onChange={(val) => setFormData({ ...formData, price: val })}
          min={0}
          required
        />
        <Button color="#FF6600" onClick={handleSubmit}>
          {plan ? "Guardar Cambios" : "Crear Plan"}
        </Button>
      </Stack>
    </Modal>
  );
}
