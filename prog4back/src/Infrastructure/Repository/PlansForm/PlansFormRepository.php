<?php

namespace Src\Infrastructure\Repository\PlansForm;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\PlansForm\PlansForm;

final readonly class PlansFormRepository extends PDOManager implements PlansFormRepositoryInterface
{
    public function findByPlansUser(int $id): ?PlansForm {
    $query = <<<SQL
        SELECT * FROM plans_forms
        WHERE id_plans_user = :id AND deleted = 0
        LIMIT 1
    SQL;

    $results = $this->execute($query, ["id" => $id]);

    if (empty($results)) return null;

    return $this->toPlansForm($results[0]);
}

    public function find(int $id): ?PlansForm {
        $query = <<<HEREDOC
            SELECT id, nombre, edad, sexo, altura, peso_actual, peso_deseado,
                actividad_fisica, antecedentes_medicos, alergias, medicamentos,
                problemas_digestivos, comidas_diarias, alimentos_evitar, horarios_comidas,
                consumo_agua, consumo_alcohol, fecha_registro, id_plans_user
            FROM plans_forms
            WHERE id = :id AND deleted = 0
            LIMIT 1
        HEREDOC;

        $parameters = [ "id" => $id ];
        $results = $this->execute($query, $parameters);

        return isset($results[0]) ? $this->toPlansForm($results[0]) : null;
    }

    // NO ME DEVUELVE ESTOS DATOS, tengo que hacer que al menos un registro en plans_forms con un id_plans_user sea válido
   public function findByUserId(int $id_user): array {
    $query = <<<SQL
        SELECT 
            pf.id,
             pf.nombre, 
            pf.edad, 
            pf.sexo, 
            pf.altura, 
            pf.peso_actual, 
            pf.peso_deseado,
            pf.actividad_fisica, 
            pf.antecedentes_medicos, 
            pf.alergias, 
            pf.medicamentos,
            pf.problemas_digestivos, 
            pf.comidas_diarias, 
            pf.alimentos_evitar, 
            pf.horarios_comidas,
            pf.consumo_agua, 
            pf.consumo_alcohol, 
            pf.fecha_registro, 
            pf.id_plans_user
        FROM plans_forms pf
        INNER JOIN plans_user pu 
            ON pf.id_plans_user = pu.id
        WHERE pu.id_user = :id_user
          AND pf.deleted = 0
    SQL;

    $parameters = [ 
        "id_user" => $id_user 
    ];

    $results = $this->execute($query, $parameters);

 
    $plansForms = [];
    foreach ($results as $result) {
        $plansForms[] = $this->toPlansForm($result);
    }

    return $plansForms;
}
    public function search(): array {
        $query = <<<HEREDOC
            SELECT id, nombre, edad, sexo, altura, peso_actual, peso_deseado,
                actividad_fisica, antecedentes_medicos, alergias, medicamentos,
                problemas_digestivos, comidas_diarias, alimentos_evitar, horarios_comidas,
                consumo_agua, consumo_alcohol, fecha_registro, id_plans_user
            FROM plans_forms
            WHERE deleted = 0
        HEREDOC;

        $results = $this->execute($query);

        $plansForms = [];
        foreach ($results as $result) {
            $plansForms[] = $this->toPlansForm($result);
        }

        return $plansForms;
    }

    public function create(PlansForm $plansForm): PlansForm {
        $query = <<<INSERT_QUERY
            INSERT INTO plans_forms (nombre, edad, sexo, altura, peso_actual, peso_deseado,
                actividad_fisica, antecedentes_medicos, alergias, medicamentos,
                problemas_digestivos, comidas_diarias, alimentos_evitar, horarios_comidas,
                consumo_agua, consumo_alcohol, fecha_registro, id_plans_user, deleted)
            VALUES (:nombre, :edad, :sexo, :altura, :peso_actual, :peso_deseado,
                :actividad_fisica, :antecedentes_medicos, :alergias, :medicamentos,
                :problemas_digestivos, :comidas_diarias, :alimentos_evitar, :horarios_comidas,
                :consumo_agua, :consumo_alcohol, :fecha_registro, :id_plans_user, 0)
        INSERT_QUERY;

        $parameters = [
            "nombre" => $plansForm->nombre(),
            "edad" => $plansForm->edad(),
            "sexo" => $plansForm->sexo(),
            "altura" => $plansForm->altura(),
            "peso_actual" => $plansForm->pesoActual(),
            "peso_deseado" => $plansForm->pesoDeseado(),
            "actividad_fisica" => $plansForm->actividadFisica(),
            "antecedentes_medicos" => $plansForm->antecedentesMedicos(),
            "alergias" => $plansForm->alergias(),
            "medicamentos" => $plansForm->medicamentos(),
            "problemas_digestivos" => $plansForm->problemasDigestivos(),
            "comidas_diarias" => $plansForm->comidasDiarias(),
            "alimentos_evitar" => $plansForm->alimentosEvitar(),
            "horarios_comidas" => $plansForm->horariosComidas(),
            "consumo_agua" => $plansForm->consumoAgua(),
            "consumo_alcohol" => $plansForm->consumoAlcohol(),
            "fecha_registro" => $plansForm->fechaRegistro(),
            
            "id_plans_user" => $plansForm->idPlansUser(),
        ];

        $this->execute($query, $parameters);
        $id = $this->lastInsertId();

        return new PlansForm(
            $id,
            $plansForm->nombre(),
            $plansForm->edad(),
            $plansForm->sexo(),
            $plansForm->altura(),
            $plansForm->pesoActual(),
            $plansForm->pesoDeseado(),
            $plansForm->actividadFisica(),
            $plansForm->antecedentesMedicos(),
            $plansForm->alergias(),
            $plansForm->medicamentos(),
            $plansForm->problemasDigestivos(),
            $plansForm->comidasDiarias(),
            $plansForm->alimentosEvitar(),
            $plansForm->horariosComidas(),
            $plansForm->consumoAgua(),
            $plansForm->consumoAlcohol(),
            $plansForm->fechaRegistro(),
            $plansForm->idPlansUser()
        );
    }

    public function update(PlansForm $plansForm): void {
        $query = <<<UPDATE_QUERY
            UPDATE plans_forms
            SET nombre = :nombre, edad = :edad, sexo = :sexo, altura = :altura, peso_actual = :peso_actual, peso_deseado = :peso_deseado,
                actividad_fisica = :actividad_fisica, antecedentes_medicos = :antecedentes_medicos, alergias = :alergias,
                medicamentos = :medicamentos, problemas_digestivos = :problemas_digestivos, comidas_diarias = :comidas_diarias,
                alimentos_evitar = :alimentos_evitar, horarios_comidas = :horarios_comidas,
                consumo_agua = :consumo_agua, consumo_alcohol = :consumo_alcohol, fecha_registro = :fecha_registro, id_plans_user = :id_plans_user
            WHERE id = :id AND deleted = 0
        UPDATE_QUERY;

        $parameters = [
            "id" => $plansForm->id(),
            "nombre" => $plansForm->nombre(),
            "edad" => $plansForm->edad(),
            "sexo" => $plansForm->sexo(),
            "altura" => $plansForm->altura(),
            "peso_actual" => $plansForm->pesoActual(),
            "peso_deseado" => $plansForm->pesoDeseado(),
            "actividad_fisica" => $plansForm->actividadFisica(),
            "antecedentes_medicos" => $plansForm->antecedentesMedicos(),
            "alergias" => $plansForm->alergias(),
            "medicamentos" => $plansForm->medicamentos(),
            "problemas_digestivos" => $plansForm->problemasDigestivos(),
            "comidas_diarias" => $plansForm->comidasDiarias(),
            "alimentos_evitar" => $plansForm->alimentosEvitar(),
            "horarios_comidas" => $plansForm->horariosComidas(),
            "consumo_agua" => $plansForm->consumoAgua(),
            "consumo_alcohol" => $plansForm->consumoAlcohol(),
            "fecha_registro" => $plansForm->fechaRegistro(),
            "id_plans_user" => $plansForm->idPlansUser()
        ];

        $this->execute($query, $parameters);
    }

    public function delete(int $id): void {
        $query = "UPDATE plans_forms SET deleted = 1 WHERE id = :id";
        $parameters = [ "id" => $id ];
        $this->execute($query, $parameters);
    }

   private function toPlansForm(array $row): PlansForm {
    return new PlansForm(
        (int) $row['id'],
        (string) $row['nombre'],
        (int) $row['edad'],
        (string) $row['sexo'],
        (float) $row['altura'],
        (float) $row['peso_actual'],
        (float) $row['peso_deseado'],
        (string) $row['actividad_fisica'],
        $row['antecedentes_medicos'] ?? null,
        $row['alergias'] ?? null,
        $row['medicamentos'] ?? null,
        $row['problemas_digestivos'] ?? null,
        (int) $row['comidas_diarias'],
        $row['alimentos_evitar'] ?? null,
        $row['horarios_comidas'] ?? null,
        (float) $row['consumo_agua'],
        (string) $row['consumo_alcohol'],
        $row['fecha_registro'] ?? null, 
        isset($row['id_plans_user']) ? (int)$row['id_plans_user'] : null
    );
}

}
