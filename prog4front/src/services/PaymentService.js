export async function createPaymentPreference(data) {
  const response = await fetch("http://localhost/backend/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear la preferencia de pago");
  }

  return response.json();
}
