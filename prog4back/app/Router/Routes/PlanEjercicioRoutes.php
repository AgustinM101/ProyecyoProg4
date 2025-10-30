<?php 

final readonly class PlanEjercicioRoutes {
    public static function getRoutes(): array {
        return [

            // ✅ GET masivo por id_plans_user (usuario ve todo su plan)
            [
                "name" => "planEjercicios_getByUserPlanId",
                "url" => "/userPlanEjercicios",
                "controller" => "PlanEjercicio/PlanEjerciciosGetByUserPlanIdController.php",
                "method" => "GET",
                "parameters" => [
                    [
                        "name" => "id",
                        "type" => "int"
                    ]
                ]
            ],

            // ✅ POST masivo (crear todo el plan de un usuario)
            [
                "name" => "userPlanEjercicio_massive_create",
                "url" => "/userPlanEjercicios",
                "controller" => "PlanEjercicio/PlanEjercicioMassivePostController.php",
                "method" => "POST",
                "parameters" => [
                    [
                        "name" => "id",  // id_plans_user
                        "type" => "int"
                    ]
                ]
            ],

            // ✅ PUT masivo (actualizar todo el plan de un usuario)
            [
                "name" => "userPlanEjercicio_massive_update",
                "url" => "/userPlanEjercicios",
                "controller" => "PlanEjercicio/PlanEjercicioMassivePutController.php",
                "method" => "PUT",
                "parameters" => [
                    [
                        "name" => "id",  // id_plans_user
                        "type" => "int"
                    ]
                ]
            ],

        ];
    }
}
