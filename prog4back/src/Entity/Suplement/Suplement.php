<?php 

namespace Src\Entity\Suplement;

final class Suplement {
    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $description,
        private float $price,
        private int $stock,
        private string $category,
        private string $image_Url
        

    ) {
    }
    public static function create(string $name, string $description,float $price,int $stock, string $category,string $image_Url ): self
    {
        return new self(null,$name, $description,$price,$stock,$category,$image_Url);
    }
    public function modify( string $name, string $description,$stock,$price,$category,$image_Url): void {
        $this->name = $name;
        $this->description = $description;
        $this->stock = $stock;
        $this->price = $price;
        $this->category = $category;
        $this->image_Url = $image_Url;
    }


    public function id(): ?int
    {
        return $this->id;
    }
    public function name(): string
    {
        return $this->name;
    }

    public function description(): string
    {
        return $this->description;
    }
    public function stock(): int
    {
        return $this->stock;
    }
    public function price(): float
    {
        return $this->price;
    }
    public function category(): string
    {
        return $this->category;
    }
    public function image_Url(): string
    {
        return $this->image_Url;
    }

}