# Pokémon App

Esta es una aplicación web que permite explorar pokemones, agregar a favoritos y gestionar la información de la API. La aplicación está diseñada como una Progressive Web App (PWA).

## Funcionalidades

- **Favoritos:** Permite agregar y eliminar pokemones a favoritos. Se guardan en `localStorage` y se comunican a través de un servicio Observable.
- **PWA:** La aplicación está configurada como una Progressive Web App para ofrecer una experiencia de usuario fluida incluso en dispositivos móviles.
- **Paginación:** La paginación funciona correctamente para navegar entre páginas de datos de pokemones.
- **Gestión de errores:** La aplicación maneja errores de la API y muestra un `toastr` cuando hay un error. Además, si la respuesta es 404, redirige automáticamente a la página `/404`.
- **Loader:** Implementé un loader que se activa mientras se hace una solicitud a la API. Este se ha comentado en el código debido a que las respuestas de la API son rápidas, pero la implementación está ahí en caso de que sea necesario.

## Requisitos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- **Node.js** (https://nodejs.org)
- **Angular CLI** (https://angular.io/cli)
- **NPM** (administrador de paquetes de Node.js)

## Clonar el repositorio

1. Abre una terminal y navega hasta la carpeta donde quieras clonar el repositorio.
2. Ejecuta el siguiente comando para clonar el repositorio:

   ```bash
   git clone https://github.com/Davidvision9/pokeAPI-PWA.git

cd <nombre_del_repositorio>

npm install

## Este comando iniciará el servidor y abrira la aplicación en tu navegador en http://localhost:4200 de forma automatica
ng s -o 

## Este comando iniciará el servidor y podrás acceder a la aplicación en tu navegador en http://localhost:4200.
ng serve

Funciones clave de la aplicación
1. Favoritos
Los pokemones pueden ser agregados o eliminados de la lista de favoritos.
Cuando se agrega o elimina un pokemon, se muestra un toastr con el mensaje correspondiente.
Los favoritos se almacenan en localStorage y se gestionan a través de un servicio que utiliza un Observable para compartir los cambios con otros componentes.
2. Gestión de errores
La aplicación maneja errores de la API. Si se recibe un error, se muestra un toastr notificando el error.
En caso de error 404, el usuario es redirigido automáticamente a la página /404.
3. Paginación
La paginación funciona para navegar entre páginas de pokemones, permitiendo cargar una lista más amplia o solo la información de un pokemon según sea necesario.
4. Loader
Se implementó un loader que aparece mientras se hace una solicitud HTTP. Este loader está comentado en el código debido a que la API responde rápidamente, pero la implementación está lista para activarse en el futuro si es necesario.
5. Tooltip en Favoritos
Los elementos de la barra de navegación con los favoritos tienen un tooltip que se muestra cuando se pasa el mouse sobre ellos. Sin embargo, en Google Chrome, este tooltip no es visible debido a una limitación de la versión actual del navegador.

