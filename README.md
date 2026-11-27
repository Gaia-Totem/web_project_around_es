# Tripleten web_project_around_es

SPRINT 9
El proyecto "Around The U.S." es una página web interactiva que permite visualizar, explorar y compartir lugares de diferentes lugares, mediante tarjetas con fotografías, nombres y descripciones.
El proyecto permite a los usuarios personalizar su perfil, agregar nuevos lugares, interactuar con las publicaciones de otros usuarios y visualizar imágenes en una ventana emergente.
Esta versión del proyecto fue desarrollada utilizando TypeScript y programación orientada a objetos, con el objetivo de crear un código más organizado, reutilizable y fácil de mantener.
Las clases se exportan desde sus respectivos archivos mediante `export` y se importan en `index.ts` mediante `import`, lo que permite separar las responsabilidades y facilitar el mantenimiento del código.

_Funcionalidades_
-Edición de perfil: permite modificar el nombre y la descripción del usuario.
-Actualización de avatar: permite cambiar la fotografía de perfil.
-Agregar tarjetas: permite publicar nuevos lugares mediante un formulario.
-Eliminar tarjetas: permite eliminar tarjetas propias mediante una ventana de confirmación.
-Sistema de likes: permite dar y quitar likes a las tarjetas.
-Visualización de imágenes: permite ampliar las fotografías en ventanas emergentes (popups).
-Validación de formularios: comprueba que los campos cumplan con los requisitos establecidos antes de enviar la información.
-Estado de carga (Loading State): muestra mensajes temporales mientras se procesan las solicitudes a la API.

_Tecnologías y técnicas utilizadas en este sprint 9_

- HTML5: estructura y contenido de la página.
- CSS: diseño, estilos y adaptación a diferentes tamaños de pantalla.
- TypeScript: desarrollo de la lógica que mejora la organización y seguridad del código con tipado estático.
- JavaScript: conceptos de programación y manipulación del DOM mediante TypeScript.
- Programación orientada a objetos (POO): organización del código mediante clases, encapsulamiento, métodos, propiedades y reutilización de código.
- Módulos de TypeScript: separación del código en archivos independientes mediante `export` e `import`.
- Validación de formularios: comprobación de los datos introducidos por el usuario.
- Manipulación del DOM: creación, actualización y eliminación de elementos de la página.
- Eventos: interacción con botones, formularios e imágenes.
  -API REST: comunicación con el servidor para obtener y actualizar información del usuario y las tarjetas.
  -Git y GitHub: control de versiones y almacenamiento del código.

_Estructura del proyecto_
Las clases se organizan en carpetas y archivos TypeScript independientes para mantener el código modular, reutilizable y fácil de mantener.

- `Api.ts`: Gestiona las solicitudes HTTP a la API REST mediante el método fetch. Se encarga de obtener y actualizar la información del usuario, gestionar el avatar, agregar y eliminar tarjetas, y dar o quitar likes. También centraliza el manejo de respuestas y errores del servidor.
- `Card.ts`: Define la interfaz y la clase encargadas de crear y gestionar las tarjetas del proyecto. Se encarga de mostrar la información de cada lugar, configurar los eventos de las imágenes, gestionar los likes y permitir la eliminación de tarjetas. También controla la interacción con la API mediante funciones recibidas como parámetros.
- `FormValidator.ts`: Gestiona la validación de los formularios, verifica que los campos cumplan con los requisitos establecidos, muestra mensajes de error y habilita o deshabilita el botón de envío dependiendo de la validez de los datos. También permite restablecer los mensajes y estilos de validación.
- `Popup.ts`: Contiene la funcionalidad base para gestionar las ventanas emergentes (popups) del proyecto. Se encarga de abrirlas, cerrarlas y configurar los eventos de cierre, como presionar la tecla Escape, hacer clic en el botón de cerrar o hacer clic fuera de la ventana. Sirve como clase padre para las demás clases Popup mediante herencia.
- `PopupWithConfirmation.ts`: Gestiona ventanas emergentes de confirmación antes de ejecutar acciones, como eliminar tarjetas. Hereda las funcionalidades de apertura y cierre de la clase Popup y permite ejecutar acciones de forma asíncrona mediante promesas.
- `PopupWithForm.ts`: administra las ventanas emergentes que contienen formularios.
- `PopupWithImage.ts`: muestra imágenes ampliadas en una ventana emergente.
- `Section.ts`: organiza y renderiza elementos dentro de una sección de la página.
- `UserInfo.ts`: Gestiona la información del perfil del usuario. Se encarga de obtener y mostrar los datos del usuario, como su nombre, descripción y avatar, así como actualizar esta información dinámicamente en el DOM.
- `index.ts`: importa las clases, crea sus instancias, inicializa y conecta todos los componentes y clases del proyecto. Gestiona la interacción entre el usuario, los formularios, las ventanas emergentes y la API. También configura los eventos, la validación de formularios, la carga inicial de datos y las acciones para editar el perfil, actualizar el avatar y administrar las tarjetas.

_Aprendizajes_
-Uso de TypeScript para definir tipos e interfaces.
-Manejo de eventos y formularios.
-Consumo de API REST mediante solicitudes HTTP.
-Manejo de respuestas asíncronas y estados de carga.
-Try...catch: Detecta y maneja errores evitando que la aplicación se detenga inesperadamente.
°try: Contiene el código que se intenta ejecutar y que podría generar un error.
°catch: Captura el error si ocurre dentro del bloque try, permitiendo gestionarlo sin interrumpir inesperadamente la aplicación.
-throw new Error() Lanzar un error manualmente cuando se detecta una situación inesperada o una condición que impide continuar con la ejecución normal del código. Valida condiciones y comunicar errores específicos.
°throw: Lanza una excepción.
°new Error(): Crea un objeto de error con un mensaje descriptivo.
-finally: Ejecutar código al finalizar, haya error o no. Se utiliza para ejecutar tareas de limpieza o acciones que deben realizarse al terminar un proceso, como ocultar un indicador de carga.
-Promise: Representa el resultado de una operación asíncrona que puede completarse correctamente o fallar en el futuro. Puede encontrarse en tres estados...
°Pending: La operación todavía está en proceso.
°Fulfilled: La operación se completó correctamente.
°Rejected: La operación terminó con un error.
-async/await: Palabras clave que permiten trabajar con promesas de forma más legible. Facilitan el manejo de operaciones asíncronas, como las solicitudes a una API.
°async: Se utiliza para declarar una función asíncrona, que siempre devuelve una promesa.
°await: Pausa la ejecución de la función asíncrona hasta que una promesa se resuelve o se rechaza.
-Promise.all() : Es un método que recibe un conjunto de promesas y permite ejecutarlas en paralelo, esperando a que todas se resuelvan para devolver sus resultados en un solo arreglo.

_Desarrollado como parte del programa de Desarrollo Web de TripleTen._
2026, Norma Giselle. Alias: Gaia Tótem.
