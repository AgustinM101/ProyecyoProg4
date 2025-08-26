<?php 

namespace Src\Entity\File;

final readonly class File {

    public function __construct(
        private string $fileName,
        private string $filePath,
        private string $type,
        private string $tmpPath,
        private int $size,
        private ?string $uploadUrl
    ) {
    }

    public static function create(
        string $fileName, 
        string $filePath,
        string $type,
        string $tmpPath,
        int $size,        
    ): self
    {
        return new self(basename($fileName), $filePath, $type, $tmpPath, $size, null);
    }

    public static function fromFile(File $file, string $uploadUrl): self
    {
        return new self(
            $file->fileName(),
            $file->filePath(),
            $file->type(),
            $file->tmpPath(),
            $file->size(),
            str_replace("host.docker.internal", "localhost", $uploadUrl)
        );
    }

    public function fileName(): string
    {
        $fileName = pathinfo($this->fileName, PATHINFO_FILENAME);
        $extension = pathinfo($this->fileName, PATHINFO_EXTENSION);
        return $fileName . "-" . date("Ymd-His") . "." . $extension;
    }

    public function filePath(): string
    {
        return $this->filePath;
    }

    public function type(): string
    {
        return $this->type;
    }

    public function tmpPath(): string
    {
        return $this->tmpPath;
    }

    public function size(): int
    {
        return $this->size;
    }

    public function uploadUrl(): ?string
    {
        return $this->uploadUrl;
    }
}