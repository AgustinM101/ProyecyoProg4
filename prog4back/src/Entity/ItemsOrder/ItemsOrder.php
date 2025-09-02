<?php 

namespace Src\Entity\ItemsOrder;

final class ItemsOrder {
    public function __construct(
        private readonly ?int $id_detalle,
        private int $id_order,
        private int $id_plan,
        private int $quantity,
        private string $unit_price
        

    ) {
    }
    public static function create(int $id_order, int $id_plan,int $quantity,string $unit_price ): self
    {
        return new self(null,$id_order,$id_plan,$quantity,$unit_price);
    }
    public function modify( int $id_order,$id_plan,$quantity,$unit_price): void {
        $this->id_order = $id_order;
        $this->id_plan = $id_plan;
        $this->quantity = $quantity;
        $this->unit_price = $unit_price;
    }


    public function id(): ?int
    {
        return $this->id;
    }
   
    public function id_order(): int
    {
        return $this->id_order;
    }
    public function id_plan(): int
    {
        return $this->id_plan;
    }
    public function quantity(): int
    {
        return $this->quantity;
    }
    public function unit_price(): string
    {
        return $this->unit_price;
    }
}