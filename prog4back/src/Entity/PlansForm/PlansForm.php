<?php

namespace Src\Entity\PlansForm;

final class PlansForm {
    public function __construct(
        private readonly ?int $id,
        private string $nombre,
        private int $edad,
        private string $sexo,
        private float $altura,
        private float $peso_actual,
        private float $peso_deseado,
        private string $actividad_fisica,
        private ?string $antecedentes_medicos,
        private ?string $alergias,
        private ?string $medicamentos,
        private ?string $problemas_digestivos,
        private int $comidas_diarias,
        private ?string $alimentos_evitar,
        private string $horarios_comidas,
        private float $consumo_agua,
        private string $consumo_alcohol,
        private string $fecha_registro,
        private ?int $id_plans_user
        
    ) {}

    public function id(): ?int {
        return $this->id;
    }
    public function nombre(): string {       
        return $this->nombre;
    }

    public function edad(): int {
        return $this->edad;
    }
    public function sexo(): string {
        return $this->sexo;
    }
    public function altura(): float {
        return $this->altura;
    }
    public function pesoActual(): float {
        return $this->peso_actual;
    }
    public function pesoDeseado(): float {
        return $this->peso_deseado;
    }
    public function actividadFisica(): string {
        return $this->actividad_fisica;
    }
    public function antecedentesMedicos(): ?string {
        return $this->antecedentes_medicos;
    }
    public function alergias(): ?string {
        return $this->alergias;
    }
    public function medicamentos(): ?string {
        return $this->medicamentos;
    }
    public function problemasDigestivos(): ?string {
        return $this->problemas_digestivos;
    }
    public function comidasDiarias(): int {
        return $this->comidas_diarias;
    }
    public function alimentosEvitar(): ?string {
        return $this->alimentos_evitar;
    }
    public function horariosComidas(): ?string {
        return $this->horarios_comidas;
    }
    public function consumoAgua(): float {
        return $this->consumo_agua;
    }
    public function consumoAlcohol(): string {
        return $this->consumo_alcohol;
    }
    public function fechaRegistro(): string {
        return $this->fecha_registro;
    }
    public function idPlansUser(): ?int {
        return $this->id_plans_user;
    }


}
