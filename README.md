# Tripleten web_project_around_es

En este proyecto se implementó la validación de los formularios «Editar perfil» y «Nuevo lugar», utilizando los mensajes de error predeterminados del navegador.
Validación de formularios

En el formulario «Editar perfil»:

El campo «Nombre» es obligatorio y debe tener entre 2 y 40 caracteres.
El campo «Acerca de» es obligatorio y debe tener entre 2 y 200 caracteres.
El botón «Guardar» permanece desactivado mientras exista algún campo inválido.

En el formulario «Nuevo lugar»:

El campo «Título» es obligatorio y debe tener entre 2 y 30 caracteres.
El campo «URL de la imagen» es obligatorio y debe contener una URL válida.
El botón «Guardar» se activa únicamente cuando todos los campos son válidos.

Los errores de validación se muestran debajo de los campos correspondientes.

Comportamiento de las ventanas emergentes

Se implementó el cierre de las ventanas emergentes mediante:

Clic en la superposición, fuera de los límites del popup.
Presionar la tecla Esc.
Organización del código

La lógica de validación se separó en el archivo validate.js y se conectó mediante JavaScript modular. Se creó la función setEventListeners() para organizar los eventos de los formularios.

Se procuró que cada función tuviera una única responsabilidad, manteniendo el código organizado y fácil de mantener.
