<?php 

final readonly class Autoloader
{
    public static function register(string $class, array $dirs) : void {
        $className = explode("\\", $class);
        self::loadDirectories(end($className), $dirs);
    }

    private static function loadDirectories(string $class, array $directories): void 
    {
        foreach ($directories as $dir) {
            if (str_contains($dir,".php") && str_contains($dir, $class)) {
                require_once $dir;
            }

            $files = glob($dir . "/*");
            
            foreach ($files as $file) {
                if (str_contains($file,".php") && str_contains($file, $class)) {
                    require_once $file;
                }

                self::loadDirectories(
                    $class, glob($file . "/*")
                );
            }
        }
    }
}