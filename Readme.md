
 ### Dudas al whatsapp +573158680076.
# PRACTICA INTREGRADORA... CLASE 24
###  SERVIDOR DE PRODUCTOS Y CARRITOS CON EXPRESS, VISTAS CON EXPRESS-HANDLEBARS, BASE DE DATOS MANEJADA CON MONGOOSE HACIA MONGO ATLAS (PRONTO TENDRÁ WEBSOCKET PARA CHAT CON SOCKETS.IO). 
### ADEMÁS TIENE: MANEJO DE VARIABLES DE ENTORNO CON dotenv CAMBIO DE VARIABLES DE ENTORNO DURANTE EJECUCIÓN CON cross-env, SE MUESTRAN RUTAS EN TABLA EN CONSOLA LADO BACKEND CON express-routemap, (PRONTO TENDRÁ MANEJO DE ARCHIVOS CON MULTER).
### CORRESPODE A ENTREGABLE 6 CLASE 19 IMPLEMENTACION DE LOGIN.
...
### Como usar la app:
<h2> Ruta de inicio, de entrada a la api:  http://localhost:8000/api/v1/  la cual redirige al login </h2>

 <h2>Ejemplos de rutas:</h2>
        Ruta de inicio, de entrada a la api: 
        http://localhost:8000/api/v1/

        Para obtener todos los productos detalladamemnte en formato JSON (método GET)::
        http://localhost:8000/api/v1/products/

        Para ver resumen de todos los carritos (método GET):
        http://localhost:8000/api/v1/views/carts/

        Para la paginación desde mongo atlas con limit, sort y query (método GET):
        http://localhost:8000/api/v1/views/products?page=1&limit=3&sort={"code":1}&query={"description": "Desde fromulario con socket"}
## Consigna. Se está requiriendo lo siguiente:
- Deberá contar con todas las vistas realizadas en el hands on lab, así también como las rutas de router para procesar el registro y el login. ((Hecho)).

- Una vez completado el login, realizar la redirección directamente a la vista de productos.((Hecho)).

- Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario.((Hecho)).

- Agregar un sistema de roles, de manera que si colocamos en el login como correo adminCoder@coder.com, y la contraseña adminCod3r123, el usuario de la sesión además tenga un campo.((Hecho)).

- Todos los usuarios que no sean admin deberán contar con un rol “usuario”. ((Hecho)).

- Implementar botón de “logout” para destruir la sesión y redirigir a la vista de login.((Hecho)).
### TESTEO:
- Al cargar el proyecto, éste deberá comenzar en la pantalla de login.((Hecho)).

- Al no tener un usuario, primero se creará un usuario, para esto, la pantalla de login deberá tener un link de redirección “Regístrate” .((Hecho)).

- El proceso de registro deberá guardar en la base de datos al usuario.((Hecho)).

- Se regresará al proceso de login y se colocarán las credenciales de manera incorrecta, esto para probar que no se pueda avanzar a la siguiente pantalla.((Hecho)).

- Posteriormente, se colocarán las credenciales de manera correcta, esto para corroborar que se cree una sesión correctamente y que se haga una redirección a la vista de productos.((Hecho)).

- La vista de productos tendrá en una parte de arriba de la página el mensaje “Bienvenido” seguido de los datos del usuario que se haya logueado (NO mostrar password). ((Hecho)).

- Es importante que se visualice el “rol” para ver que aparezca “usuario” o “user”.((Hecho)).

- Se presionará el botón de logout y se destruirá la sesión, notando cómo nos redirige a login.((Hecho)).

- Se ingresarán las credenciales específicas de admin indicadas en las diapositivas, el login debe redirigir correctamente y mostrar en los datos del rol: “admin” haciendo referencia a la correcta gestión de roles.((Hecho)). 

- Se revisará que el admin NO viva en base de datos, sino que sea una validación que se haga de manera interna en el código. ((Hecho)).


### Formato

- Link al repositorio de Github con el proyecto completo, sin la carpeta de node_modules. ((Hecho)).

### Sugerencias
- Recuerda que las vistas son importantes, más no el diseño, concéntrate en la funcionalidad de las sesiones antes que en la presentación.

- Cuida las redirecciones a las múltiples vistas.


# **Checklist  ENTREGA ANTERIOR Segunda Pre-entrega del proyecto final**		
     
|Aspectos a evaluar|	Descripción	|
| ------ | ------ |
|Consigna|	Profesionalizar las consultas actuales de nuestro servidor express, ajustando la forma de solicitar los productos y agregando nuevos endpoints a los carritos. ((Hecho)).|	
|Productos|	Los productos se visualizan correctamente en la vista de productos ((Hecho)), y la misma cuenta con una paginación funcional ((Hecho)). Además, pueden filtrarse por categoría o por disponibilidad ((Hecho)), y ordenarse por precio de manera ascendente o descendente ((Hecho)). |
|Carrito|   Los métodos DELETE eliminan correctamente los productos del carrito((Hecho)). Los métodos PUT actualizan correctamente los elementos del carrito ((Hecho)). Se realiza correctamente un populate al momento de obtener un carrito. ((Hecho)). |
|Seguridad| La vista de productos muestra un mensaje de error si se pretende agregar una page inexistente? (p. ej. page=20003033 o page= -12323 o page = ASDASDASD).Los endpoints de carrito devuelven error si se desea colocar un :cid o un :pid inexistente. |
|Operación y formato|	El formato de productos y carrito es en inglés ((Hecho)). El proyecto corre con npm start ((Hecho)).	|


## Rutas para servidor con file-system en puerto 8081 (se deshabilito, se comentó en el código):

- Carritos: (se deshabilito, se comentó en el código):
    - /api/carts/:cid   GET_BY_CID  trae carrito cid en formato JSON.
    - /api/carts/   POST crea un carrito nuevo vacío.
    - /api/carts/:cid/product/:pid  POST agregar producto pid a carrito cid.
    - En api/carts/  No hay PUT ni DELETE.

- Productos:(se deshabilito, se comentó en el código):
    - /api/products/:pid GET_BY_PID muestra carrito pid en formato JSON, PUT con postman body y params, DELETE con postman y params.
    - /api/products/ GET de todos los productos en formato JSON y no hay formulario, POST con postman y body.
    - /api/products?limit=NUM GET muestra los primeros NUM productos en formato JSON. Utiliza req.query.

    - Adicionalmente, en localhost:8081/index2.html se tiene un formulario html para hacer POST de product.

- Socket IO:(se deshabilito, se comentó en el código):
    - /    GET    Tiene socket. Utiliza vista "home.handlebars" y muestra lista de todos los productos en html. No tiene formulario.
    - /realtimeproducts  GET   Tiene socket. Utiliza vista "realTimeProducts.handlebars" y Tiene formulario para hacer post de product, muestra Lista de productos, al crear un producto nuevo lo muestra resaltado en una tabla y agrega al final de la lista mostrada el nuevo producto en html.

## Rutas para servidor con Mongo-Atlas en puerto 8000:

# Rutas carritos con Mongo:

- Ver la imagen en archivo raíz.

# Rutas productos con Mongo:

-  Ver la imagen en archivo raíz.

# Rutas de  views (carritos y productos) con Mongo: 

- Ver la iamgen en carpeta raíz.
