# Tripleten web_project_around_es

SPRINT 8
El proyecto "Around The U.S." es una página web interactiva que permite visualizar tarjetas con fotografías y descripciones de diferentes lugares.

El proyecto "Around The U.S." aplica el principio de **encapsulamiento** de la programación orientada a objetos (POO) con TypeScript para organizar el código en clases independientes y reutilizables.. Cada clase tiene una responsabilidad específica y administra los datos y comportamientos que le corresponden.

Las clases se exportan desde sus respectivos archivos mediante `export` y se importan en `index.ts` mediante `import`, lo que permite separar las responsabilidades y facilitar el mantenimiento del código.

El archivo `index.ts` se mantiene como punto de entrada de la aplicación y contiene únicamente la inicialización de las clases y la configuración de los detectores de eventos específicos.

Funcionalidades

- Visualización de tarjetas con imágenes y nombres de lugares.
- Apertura de imágenes en ventanas emergentes (popups).
- Formularios para editar la información del usuario y agregar tarjetas.
- Validación de formularios para comprobar que los datos introducidos sean correctos.
- Organización y renderizado dinámico de elementos en la página.
- Gestión de la información del perfil del usuario.

Tecnologías y técnicas utilizadas en este sprint 8

- HTML5: estructura y contenido de la página.
- CSS:diseño, estilos y adaptación a diferentes tamaños de pantalla.
- TypeScript: desarrollo de la lógica de la aplicación con tipado estático.
- JavaScript: conceptos de programación y manipulación del DOM mediante TypeScript.
- **Programación orientada a objetos (POO):** organización del código mediante clases, encapsulamiento, métodos y propiedades.
- Módulos de TypeScript: separación del código en archivos independientes mediante `export` e `import`.
- Validación de formularios: comprobación de los datos introducidos por el usuario.
- Manipulación del DOM: creación, actualización y eliminación de elementos de la página.
- Eventos: interacción con botones, formularios e imágenes.

Estructura del proyecto:
Las clases se organizan en archivos TypeScript independientes para mantener el código modular, reutilizable y fácil de mantener.

- `FormValidator.ts`: valida los campos de los formularios y gestiona sus mensajes de error.
- `Card.ts`: crea y administra las tarjetas de lugares.
- `Section.ts`: organiza y renderiza elementos dentro de una sección de la página.
- `Popup.ts`: administra la apertura y el cierre de ventanas emergentes.
- `PopupWithImage.ts`: muestra imágenes ampliadas en una ventana emergente.
- `PopupWithForm.ts`: administra las ventanas emergentes que contienen formularios.
- `UserInfo.ts`: obtiene y actualiza la información del perfil del usuario.
- `index.ts`: importa las clases, crea sus instancias y configura los detectores de eventos necesarios.

2026, Gaia-Totem
