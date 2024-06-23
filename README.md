# AppDepartment - (TT)

Una aplicación de departamentos que asocia subdepartamentos, empleados y niveles, utilizando tecnologias como:

- Laravel 11.
- React JS.
- Inertia JS.

### Para la ejecución de la App

Para ejecutar la App necesitará lo siguiente.

Requisitos:

- PHP 8.2.0
- Composer.
- Laragon.
- Node JS 20.

Luego de realizar la instalación de las herramientas requeridas ejecutar lo siguiente.

***Recuerda:*** hacer un fork o clon de este repositorio.

```
git clone https://github.com/Juan1307/App-Department.git departments
```

Ejecutar los siguiente comandos de laravel para el proyecto:

1. Ejecutar: ```composer install``` // para las dependecias de Laravel.
2. Ejecutar: ```npm install``` // para las dependencias de Inertia, ReactJS y VITE.
3. Ejecutar: ```npm run dev``` // Para servir ReactJS.
4. Ejecutar: ```php artisan migrate``` // Para la base de datos ***mysql***.
5. Ejecutar: ```php artisan db:seed``` // Para ejecutar las ***factories***.
6. Ejecutar: ```php artisan serve``` // para servir LARAVEL.

Abrir una pestaña en el puerto de ***Laravel*** para visualizar la App.

### Notas

- En caso no se pueda ejecutar las migraciones importar la base de datos en su gestor de base de datos(PhpMyAdmin o HeidiSQL), que se encuentra en la carpeta ```db/department.sql```.

- Generalmente es mala practica dejar el archivo ```.env``` disponible, dado que contiene información sensible, en este caso se ha hecho una excepción para poder integrar de forma rápida la ejecución de la App, despues de importar la base de datos en su gestor de MySql.
