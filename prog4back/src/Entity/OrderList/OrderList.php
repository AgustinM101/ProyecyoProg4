<?php 

namespace Src\Entity\OrderList;

final class OrderList {
    public function __construct(
        private readonly ?int $id,
        private int $id_user,
        private date $date,
        private int $total,
        private string $status
        

    ) {
    }
    public static function create(int $id_user, date $date,int $total,string $status ): self
    {
        return new self(null,$id_user,$date,$total,$status);
    }
    public function modify( int $id_user,$date,$total,$status): void {
        $this->id_user = $id_user;
        $this->date = $date;
        $this->total = $total;
        $this->status = $status;
    }


    public function id(): ?int
    {
        return $this->id;
    }
    public function id_user(): int
    {
        return $this->id_user;
    }
    public function date(): date
    {
        return $this->date;
    }
    public function total(): int
    {
        return $this->total;
    }
    public function status(): string
    {
        return $this->status;
    }
}