import { useEffect, useState } from "react";
import {
    Accordion,
    Table,
    TextInput,
    Button,
    Group,
    Loader,
} from "@mantine/core";
import { planAlimentosService } from "../../services/planAlimentosService";
import { planEjerciciosService } from "../../services/planEjerciciosService";

export function UserPlansAccordion({ action, plansUserId, onFinish }) {
    const [loading, setLoading] = useState(false);
    const [planAlimento, setPlanAlimento] = useState({});
    const [planEjercicio, setPlanEjercicio] = useState({});

    const dias = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];
    const tiposAlimento = ["Desayuno", "Almuerzo", "Cena", "Snack"];
    const tiposEjercicio = ["Cardio", "Fuerza", "Flexibilidad", "Movilidad"];

    // ✅ Manejo de cambios inline
    const handleChange = (setter, plan, dia, tipo, value) => {
        setter({
            ...plan,
            [dia]: {
                ...plan[dia],
                [tipo]: value,
            },
        });
    };

    // ✅ Generar payload para POST
    const buildPayload = (plan) => {
        const items = [];

        dias.forEach((diaNombre, index) => {
            const contenidoDia = plan[diaNombre] || {};
            Object.entries(contenidoDia).forEach(([tipo, descripcion]) => {
                if (!descripcion || descripcion.trim() === "") return;
                items.push({
                    tipo,
                    descripcion,
                    dia: (index + 1).toString(),
                });
            });
        });

        return items;
    };

    const [saving, setSaving] = useState(false);
    const handleGuardar = async () => {
        setSaving(true);
        try {
            const alimentos = buildPayload(planAlimento);
            const ejercicios = buildPayload(planEjercicio);

            const promises = [];

            if (action === "create" && alimentos.length > 0) {
                promises.push(
                    planAlimentosService.createPlan({
                        id_plans_user: plansUserId,
                        items: alimentos,
                    })
                );
            } else if (action === "update") {
                promises.push(
                    planAlimentosService.updatePlan({
                        id_plans_user: plansUserId,
                        items: alimentos,
                    })
                );
            }

            if (action === "create" && ejercicios.length > 0) {
                promises.push(
                    planEjerciciosService.createPlan({
                        id_plans_user: plansUserId,
                        items: ejercicios,
                    })
                );
            } else if (action === "update") {
                promises.push(
                    planEjerciciosService.updatePlan({
                        id_plans_user: plansUserId,
                        items: ejercicios,
                    })
                );
            }

            // Ejecutar ambos al mismo tiempo
            await Promise.all(promises);

            alert("✅ Plan actualizado correctamente");
            onFinish?.();
        } catch (e) {
            console.error(e);
            alert("❌ Error al actualizar el plan");
        } finally {
            setSaving(false);
        }
    };

    // ✅ Render table editable
    const renderTable = (plan, setter, tipos) => {
        return (
            <Table striped withBorder>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        {dias.map((dia) => (
                            <th key={dia}>{dia}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tipos.map((tipo) => (
                        <tr key={tipo}>
                            <td style={{ fontWeight: "bold" }}>{tipo}</td>
                            {dias.map((dia) => (
                                <td key={dia}>
                                    <TextInput
                                        size="xs"
                                        placeholder={`${tipo} - ${dia}`}
                                        value={plan[dia]?.[tipo] || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                setter,
                                                plan,
                                                dia,
                                                tipo,
                                                e.currentTarget.value
                                            )
                                        }
                                        readOnly={
                                            action !== "create" &&
                                            action !== "update"
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    };

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setLoading(true);
                const [resA, resE] = await Promise.all([
                    planAlimentosService.getPlanAlimentosByUser(plansUserId),
                    planEjerciciosService.getPlanEjerciciosByUser(plansUserId),
                ]);

                const capitalize = (str) =>
                    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

                const transform = (items) => {
                    const estructura = {};
                    dias.forEach((d) => (estructura[d] = {}));

                    (items || []).forEach((item) => {
                        const diaIndex = Number(item.dias) - 1;
                        const diaNombre = dias[diaIndex];
                        if (!diaNombre) return;

                        const tipoKey = capitalize(item.tipo.trim());
                        estructura[diaNombre][tipoKey] = item.description;
                    });

                    return estructura;
                };

                setPlanAlimento(transform(resA?.data || []));
                setPlanEjercicio(transform(resE?.data || []));
            } catch (error) {
                console.error("Error al traer planes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plansUserId]);

    if (loading) return <Loader color="orange" />;

    return (
        <Accordion variant="contained" multiple>
            <Accordion.Item value="alimentos">
                <Accordion.Control>🍗 Plan de Alimentación</Accordion.Control>
                <Accordion.Panel>
                    {renderTable(planAlimento, setPlanAlimento, tiposAlimento)}
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="ejercicios">
                <Accordion.Control>🏋️ Plan de Ejercicios</Accordion.Control>
                <Accordion.Panel>
                    {renderTable(
                        planEjercicio,
                        setPlanEjercicio,
                        tiposEjercicio
                    )}
                </Accordion.Panel>
            </Accordion.Item>

            {action === "create" || action === "update" ? (
                <Group mt="md" grow>
                    <Button
                        color="green"
                        onClick={handleGuardar}
                        loading={saving}
                    >
                        ✔ {action === "create" ? "Crear" : "Guardar"} plan
                    </Button>
                </Group>
            ) : null}
        </Accordion>
    );
}
