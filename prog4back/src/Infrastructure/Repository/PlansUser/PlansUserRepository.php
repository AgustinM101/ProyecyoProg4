<?php

class UsersPlanRepository {
    public function getPlansByUserId($userId) {
        $sql = "SELECT p.* 
                FROM users_plan up
                JOIN plans p ON up.id_plan = p.id
                WHERE up.id_user = ?";
        // ejecutar consulta y devolver resultado
    }

    public function assignPlanToUser($userId, $planId) {
        $sql = "INSERT INTO users_plan (id_user, id_plan) VALUES (?, ?)";
        // ejecutar query
    }

    public function removePlanFromUser($userId, $planId) {
        $sql = "DELETE FROM users_plan WHERE id_user = ? AND id_plan = ?";
        // ejecutar query
    }
}
