1. 🔑 **Autenticación y autorización:** Implementa un sistema de autenticación y autorización que permita a los usuarios registrarse, iniciar sesión y obtener un token de acceso. Utiliza JWT (JSON Web Tokens) para la autenticación.
2. 👥 **Gestión de usuarios:** Implementa los endpoints necesarios para el registro (sign-up) y login de usuarios. Al registrar un nuevo usuario, asegúrate de almacenar su información en una base de datos y de aplicar las validaciones necesarias.
3. 🤺 **Manejo de roles:** Define dos roles de usuario: "Usuario Regular" y "Administrador". Los usuarios registrados por defecto serán "Usuarios Regulares". Solo los usuarios con el rol de "Administrador" deben tener acceso a las operaciones de creación, actualización y eliminación de películas.
4. 🤖 **Endpoints de la API:**
    - Endpoint para registro de nuevos usuarios. ✅
    - Endpoint para login de usuarios y obtención de token de acceso.✅
    - Endpoint para obtener la lista de películas. ✅
    - Endpoint para obtener los detalles de una película específica. Solo los "Usuarios Regulares" deberían tener acceso a este endpoint.✅
    - Endpoint para crear una nueva película. Solo los "Administradores" deberían tener acceso a este endpoint.
    - Endpoint para actualizar la información de una película existente. Solo los "Administradores" deberían tener acceso a este endpoint.✅
    - Endpoint para eliminar una película. Solo los "Administradores" deberían tener acceso a este endpoint.✅
5. 💡**Pruebas unitarias:** Escribe pruebas unitarias para verificar el correcto funcionamiento de los endpoints, la lógica de negocio de la aplicación y la restricción de acceso basada en roles.


Auth reference: https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
