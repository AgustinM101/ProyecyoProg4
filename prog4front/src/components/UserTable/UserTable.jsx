import React from "react";
import { Table } from "@mantine/core";
import { UserRowPendiente } from "./UserRowPendiente";
import { UserRowActivo } from "./UserRowActivo";
import { UserRowConfirmarPago } from "./UserRowConfirmarPago";
import { UserRowFinalizado } from "./UserRowFinalizado";
import { plansUserService } from "../../services/plansUserService";
import "./UserTable.css";

export function UserTable({
  users,
  onEdit,
  onDelete,
  onAddPlan,
  onUpdatePlan,
  onView,
  fetchPlansUsers, // función para recargar toda la tabla
}) {
  const handleConfirmPayment = async (pu, newStatus) => {
    if (!pu) return;

    try {
      await plansUserService.updatePlan(pu.id, {
        status: newStatus,
        expiration_date: pu.expiration_date, // mantenemos la fecha existente
      });

      // refresh tabla
      fetchPlansUsers?.();
    } catch (error) {
      console.error("Error al actualizar status:", error);
      alert("❌ Error al actualizar el estado del usuario");
    }
  };

  return (
    <Table highlightOnHover className="user-table admin-page">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Plan</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Expira</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((pu) => {
          switch (pu.status) {
            case "chargePending":
              return (
                <UserRowPendiente
                  key={pu.id}
                  pu={pu}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onView={onView}
                  onActivate={async (id) => {
                    await plansUserService.updatePlan(id, {
                      status: "active",
                      expiration_date: pu.expiration_date
                    });
                    fetchPlansUsers?.();
                  }}
                />
              );


            case "active":
              return (
                <UserRowActivo
                  key={pu.id}
                  pu={pu}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onUpdatePlan={onUpdatePlan}
                  onView={onView}
                />
              );

            case "expired":
              return (
                <UserRowConfirmarPago
                  key={pu.id}
                  pu={pu}
                  onDelete={onDelete}
                  onConfirm={() => handleConfirmPayment(pu, "active")}
                  onReject={() => handleConfirmPayment(pu, "finished")}
                  onView={onView}
                />
              );

            case "finished":
              return (
                <UserRowFinalizado
                  key={pu.id}
                  pu={pu}
                  onDelete={onDelete}
                  onView={onView}
                />
              );

            default:
              return (
                <UserRowPendiente
                  key={pu.id}
                  pu={pu}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onView={onView}
                  onActivate={async (id) => {
                    await plansUserService.updatePlan(id, {
                      status: "active",
                      expiration_date: pu.expiration_date
                    });
                    fetchPlansUsers?.();
                  }}
                />
              );
          }
        })}
      </tbody>
    </Table>
  );
}

