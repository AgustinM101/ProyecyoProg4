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
import { plansUserService } from "../../services/plansUserService";

export function UserPlansAccordion({ action, plansUserId, onFinish, onActivate }) {
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

            // Si se creó al menos un plan, actualizar el estado del plans_user a "active"
            if (action === "create" && (alimentos.length > 0 || ejercicios.length > 0)) {
                promises.push(
                    plansUserService.updatePlan(plansUserId, {
                        status: "active",
                    })
                );
            }

            await Promise.all(promises);

            // Notificar al componente padre que este plansUser quedó activo
            // onActivate se espera que reciba el id (como en UserTable -> UserRowPendiente)
            try {
                onActivate?.(plansUserId);
            } catch (e) {
                console.warn("onActivate callback falló:", e);
            }

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
        <div
            style={{
                overflowX: "auto",
                marginTop: "10px",
                border: "2px solid #eeff05",
                borderRadius: "10px",
                background: "#000",
                padding: "10px",
            }}
        >
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    tableLayout: "fixed", // ← cuadradas
                    color: "white",
                    fontSize: "14px",
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "#111" }}>
                        <th
                            style={{
                                border: "1px solid #eeff05",
                                padding: "12px",
                                textAlign: "center",
                                width: "130px",
                                fontWeight: "bold",
                            }}
                        >
                            Tipo
                        </th>

                        {dias.map((dia) => (
                            <th
                                key={dia}
                                style={{
                                    border: "1px solid #eeff05",
                                    padding: "12px",
                                    width: "130px",
                                    textAlign: "center",
                                }}
                            >
                                {dia}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {tipos.map((tipo) => (
                        <tr key={tipo} style={{ backgroundColor: "#1a1a1a" }}>
                            <td
                                style={{
                                    border: "1px solid #eeff05",
                                    padding: "10px",
                                    fontWeight: "bold",
                                    backgroundColor: "#121212",
                                }}
                            >
                                {tipo}
                            </td>

                            {dias.map((dia) => (
                                <td
                                    key={dia}
                                    style={{
                                        border: "1px solid #eeff05",
                                        padding: "0",
                                        height: "90px", // ← CUADRADA Y GRANDE
                                        backgroundColor: "#000",
                                    }}
                                >
                                    <textarea
                                        value={plan[dia]?.[tipo] || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                setter,
                                                plan,
                                                dia,
                                                tipo,
                                                e.target.value
                                            )
                                        }
                                        readOnly={
                                            action !== "create" &&
                                            action !== "update"
                                        }
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            background: "transparent",
                                            color: "white",
                                            border: "none",
                                            resize: "none", // estilo Excel
                                            padding: "10px",
                                            boxSizing: "border-box",
                                            outline: "none",
                                            overflow: "hidden",
                                            fontSize: "14px",
                                        }}
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height =
                                                e.target.scrollHeight + "px";
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
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