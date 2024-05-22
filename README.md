
# Challenge Backend Conexa

Backend que obtiene informacion la API pública de Star Wars y es utilizada en pos de crear una nueva aplicación de gestión de películas.

## Autenticación y autorización

El backend, cuenta con un sistema de roles y permisos, el cual se encarga de verificar si el usuario tiene los permisos necesarios para realizar una acción.

Todos los usuarios registrados mediante el endpoint de `POST /auth/login` van a contar con el rol de `user`
El rol `user` permite:

- Iniciar sesión mediante el endpoint de `POST /auth/login`
- Obtener el listado de todas las peliculas mediante el endpoint de `GET /movies`
- Ver su perfil mediante el endpoint de `GET /auth/profile`
- Refrescar su token de autenticación mediante el endpoint de `GET /auth/refresh-token`
- Ver el detalle de una pelicula mediante el endpoint de `GET /movies/:id`

Tambien vamos a tener unos usuarios con el rol de `admin`, los cuales ya van a estar precargados en la base de datos.
El rol `admin` permite:

- Iniciar sesión mediante el endpoint de `POST /auth/login`
- Obtener el listado de todas las peliculas mediante el endpoint de `GET /movies`
- Ver su perfil mediante el endpoint de `GET /auth/profile`
- Refrescar su token de autenticación mediante el endpoint de `GET /auth/refresh-token`
- Crear una pelicula mediante el endpoint de `POST /movies`
- Editar una pelicula mediante el endpoint de `PATCH /movies/:id`
- Eliminar una pelicula mediante el endpoint de `DELETE /movies/:id`

Para poder realizar las acciones de `admin` es necesario que el usuario tenga un token de autenticación con el rol de `admin` en el header `Authorization` de la petición.

## Funcionamiento de la aplicación

La aplicación cuenta con un sistema de autenticación y autorización, el cual se encarga de verificar si el usuario tiene los permisos necesarios para realizar una acción.
Se pueden crear, actualizar, eliminar y listar peliculas, siempre y cuando el usuario tenga el rol de `admin`.
Trabajamos con una DB PostgreSQL, la cual se configura en el archivo `.env` y se encuentra en un contenedor de Docker.
Periodicamente, mediante un cronjob, el sistema se encarga de eliminar las peliculas que fueron obtenidas de la API externa.
Las peliculas que se obtienen de la API externa, no se pueden modificar ni eliminar, solo se pueden listar.

## Documentación de la API

Para poder visualizar los endpoints de la aplicación, se puede acceder a la documentación de la API mediante el endpoint de `GET /docs`

## Instalación

### Docker way

Para poder instalar la aplicación, es necesario tener instalado Docker y Docker Compose.
Una vez que se tengan instalados, se debe ejecutar el siguiente comando:

```bash
docker compose up -d # Para levantar la aplicación en modo demonio/segundo plano
```

O si se quiere levantar la aplicación en modo interactivo, se puede ejecutar el siguiente comando:

```bash
docker compose up
```

### Manual (sin Docker)

Requerimientos:

- Node.js 20.x
- PostgreSQL 16.x
- npm 8.x
Para poder instalar la aplicación, es necesario tener instalado Node.js y PostgreSQL.
Una vez que se tengan instalados, se debe ejecutar los siguientes comandos:

```bash
npm install # Para instalar las dependencias
npm run start # Para levantar la aplicación
```

## Variables de entorno

Para poder configurar la aplicación, es necesario crear un archivo `.env` en la raíz del proyecto.
Para poder ver un ejemplo de las variables de entorno, se puede ver el archivo `.env.example`
Podemos ejecutar el siguiente comando para copiar el archivo `.env.example` a `.env`

```bash
cp .env.example .env
```

Todas las variables de entorno son obligatorias, si alguna no se encuentra configurada, la aplicación no va a funcionar correctamente.

### Detalles de las variables de entorno

- `DB_HOST`: Host de la base de datos
- `DB_PORT`: Puerto de la base de datos
- `DB_USERNAME`: Usuario de la base de datos
- `DB_PASSWORD`: Contraseña de la base de datos
- `DB_DATABASE`: Nombre de la base de datos
- `SWAPI_URL`: URL de la API externa
- `JWT_SECRET`: Secret para firmar los tokens de autenticación y autorización
