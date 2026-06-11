El siguiente Contenido son las conclusiones funcionales extraídas de un vídeo grabado por Andrea Lara y procesado por Gemini 3.5 Flash.

A continuación, se presenta el documento unificado con la descripción completa de la funcionalidad de **Paco App**, incorporando todas las observaciones detalladas del sistema, seguido de la transcripción textual y completa del audio del video.

---

# SECCIÓN 1: GUÍA FUNCIONAL UNIFICADA DE PACO APP

**Paco App** es una plataforma digital de beneficios y salud financiera para colaboradores que opera en sincronía directa con un panel de administración web (back-office). A través de este panel, el departamento de Recursos Humanos de cada empresa gestiona usuarios, contenidos, encuestas, comunicados y parámetros financieros de forma personalizada.

---

## 1. ACCESO Y CONFIGURACIÓN INICIAL (ONBOARDING)

### 1.1. Permisos del Dispositivo
Al iniciar la aplicación por primera vez, el sistema solicita dos permisos obligatorios para su correcto funcionamiento:
*   **Ubicación (Precisa o Aproximada):** Requerida por el sistema para habilitar la geolocalización de ofertas físicas y promociones comerciales ("Ofertas PIN") basadas en la posición del colaborador.
*   **Notificaciones:** Necesaria para el envío de alertas push sobre encuestas pendientes, cursos asignados, mensajes de comunicación interna, recordatorios y felicitaciones.

### 1.2. Autenticación de Usuarios (Log In)
El acceso a la aplicación está limitado a colaboradores previamente registrados por la empresa en el panel administrativo.
*   **Activación de cuenta:** Los usuarios nuevos deben introducir su número celular para validar su identidad y recibir la solicitud de activación.
*   **Inicio de Sesión:** Los usuarios con cuentas ya activas acceden mediante la pantalla "Ya tengo cuenta", ingresando su correo electrónico o teléfono y su contraseña.
*   **Elementos de la Interfaz de Log In:**
    *   *Visualización de Contraseña:* El campo "Confirmar contraseña" cuenta con un icono de un ojo tachado para alternar la visibilidad de los caracteres.
    *   *Enlaces de soporte:* Incluye el enlace **"Olvidé mi contraseña"** y el botón **"No tengo cuenta"** para flujos alternativos.
    *   *Control de Errores:* Si se introducen credenciales incorrectas, una barra roja de alerta en la parte superior advierte del error para que el usuario vuelva a intentarlo.
*   **Widget de Menú Flotante (Icono de 4 círculos):** Presente en la esquina de la pantalla. Al pulsarlo, abre una opción de redirección al sitio web externo de soporte técnico de Paco App. Esta página web contiene la guía de uso de la app móvil, preguntas frecuentes organizadas por temas (adelanto de nómina, recargas, pago de servicios, descuentos, asistencias y seguros) y un formulario para enviar tickets de soporte directamente al área técnica.

---

## 2. PANTALLA PRINCIPAL (DASHBOARD)

Al ingresar con credenciales válidas, se despliega la pantalla de inicio adaptada al perfil del colaborador (ej. "Bienvenido/a, Ricardo"). 
*   **Carrusel de Banners:** Ubicado en la parte superior, muestra avisos importantes o logos de convenios (ej. "De Toño", "Happy Hug Day") configurados desde el back-office.
*   **Acceso a Módulos:** Botones en cuadrícula para navegar hacia las distintas herramientas de la aplicación.

---

## 3. DETALLE DE MÓDULOS FUNCIONALES

### Módulo A: Registro de Estado de Ánimo (Daily Mood Tracker)
Monitorea el clima organizacional recopilando el bienestar diario del colaborador.
1.  **Evaluación:** El colaborador utiliza una barra de deslizamiento que varía desde "Muy mal" hasta "Muy bien", vinculada a un avatar expresivo que cambia de color y gesto según la posición del control.
2.  **Cualificación:** El usuario puede seleccionar una o varias etiquetas que describen su estado (ej. *Alivio, Confianza, Diversión, Esperanza, Gratitud, Satisfacción*). Cuenta con el botón **"Mostrar más"** para desplegar una lista expandida de emociones.
3.  **Factores de Influencia:** El colaborador indica qué factores están afectando su estado de ánimo, seleccionando de una lista que incluye: *Salud, Condición física, Cuidado personal, Pasatiempos, Identidad, Espiritualidad, Frustración, Molestia, Celos, Culpa, Estrés, Sorpresa, Desesperanza, Irritabilidad, Soledad, Desaliento, Decepción, Comunidad, Familia, Amistades, Pareja, Vida sentimental, Quehaceres, Trabajo, Educación, Viajes, Clima, Sucesos actuales y Dinero*.
4.  **Gráficos Históricos:** Al presionar "Mostrar gráficas", el colaborador accede al histórico de sus registros emocionales organizados por Semana (S), Mes (M), Año (A) o un bloque de 6 Meses (6M). Esta sección se divide en:
    *   *Estados:* Tendencia general de humor en el tiempo.
    *   *Sentimientos:* Conteo exacto y numérico de las veces que se ha seleccionado cada etiqueta (ej. *Frustración: 2, Trabajo: 2, Estrés: 1*).

### Módulo B: Cumpleaños y Aniversarios
Fomenta la convivencia interna listando las fechas especiales de los compañeros de trabajo.
*   Se organiza en tres pestañas: **Todos**, **Cumpleaños** y **Aniversarios**.
*   Permite filtrar cronológicamente por día actual y los días posteriores de la semana.
*   **Indicador de Antigüedad:** En aniversarios, muestra una medalla con el número de años cumplidos por el colaborador en la organización (ej. "5", "4", "3", "2" años).

### Módulo C: Bandeja de Notificaciones (Icono de Campana)
Centraliza las novedades asignadas al usuario.
*   Muestra alertas de nuevas encuestas obligatorias, recordatorios de vencimiento de las mismas, avisos de cursos asignados (ej. "Tienes un nuevo curso asignado!"), felicitaciones y reconocimientos de equipo.
*   Incluye un botón inferior para "Borrar todas las notificaciones".

### Módulo D: Adelanto de Nómina
Servicio financiero core de Paco App que permite solicitar anticipos de sueldo devengado de manera inmediata.
1.  **Validación de Antigüedad:** El sistema comprueba que el colaborador cumpla con el mínimo de permanencia configurado por la empresa (por ejemplo, 3 meses de contratación).
2.  **Cuenta de Depósito:** Muestra el nombre del titular y la CLABE o cuenta bancaria registrada para la dispersión y posterior cobro del adelanto.
3.  **Monto:** Se define mediante una barra de deslizamiento que va desde un mínimo de $200 hasta el máximo calculado en el panel administrativo según el salario del trabajador (ej. $2,500).
4.  **Desglose:** Detalla la comisión por servicio establecida por convenio, el neto a recibir, la fecha de solicitud y la fecha de cobro de la nómina.
5.  **Aceptación Legal:** Requiere marcar obligatoriamente la casilla de aceptación de términos y condiciones, mandato de cobro, domiciliación e información crediticia antes de habilitar el botón "Confirmar".
6.  **Sincronización:** Una vez procesada, la solicitud se refleja en el submenú de **"Reporte de Gastos"**, dividida en:
    *   *Adeudos:* Saldo total que será retenido en la siguiente nómina.
    *   *Mis Gastos:* Historial detallado con filtros por fecha, periodo de nómina y tipo de gasto.

### Módulo E: Recargas Telefónicas
Permite adquirir tiempo aire o paquetes de datos móviles con cargo al saldo de adelanto de nómina.
1.  **Operadores Habilitados:** *AT&T, Weex, Movistar, Bait, Telcel, Virgin Mobile, Mi Recarga, Unefon, Flash Mobile, PilloFon, FreedomPop, Oui móvil y Diri*.
2.  **Tipo de Recarga:** Selección entre "Tiempo aire" o "Datos".
3.  **Montos Predefinidos (Ej. Telcel):** Botones con valores de *$500, $300, $200, $150, $100, $50, $30, $20 y $10*.
4.  **Confirmación:** El usuario digita y confirma el número celular de destino y procede a la pasarela de pagos integrada para ingresar un código de validación de seguridad.

### Módulo F: Pago de Servicios
Facilita el pago de recibos domésticos y gubernamentales debitando el costo de la nómina o mediante una tarjeta bancaria.
1.  **Categorías:** *Televisión, telefonía e internet; Agua, luz y gas; Telepeaje; Entretenimiento; Pagos de gobierno; Ventas por catálogo*. También incluye logos de marcas frecuentes (ej. *CFE, Telmex, Sky, Dish*) en la cabecera.
2.  **Formulario:** Permite ingresar el monto exacto del recibo y la referencia numérica. Incluye un botón de cámara para escanear el código de barras directamente del recibo físico.
3.  **Método de Selección:** Se define el pago mediante "Adelanto de Nómina" o "Pago con Tarjeta".
4.  **Desglose financiero:** Muestra el cobro del servicio, la comisión configurada por el panel administrativo y el saldo final disponible del usuario.
5.  **Validación de Identidad (KYC - Know Your Customer):** Como medida de seguridad en la pasarela de pagos, el sistema solicita:
    *   Captura fotográfica de la identificación oficial (INE) por el frente y reverso.
    *   Toma de fotografía facial (selfie) del usuario.
    *   Código de validación final.

### Módulo G: Comunicación Interna
Canal para la distribución de circulares, políticas y manuales de la empresa.
*   Muestra el listado de comunicados enviados por Recursos Humanos.
*   Permite descargar y abrir documentos adjuntos directamente en el dispositivo móvil en formatos como Excel (`.xlsx`), Word (`.docx`), presentaciones (`.pptx`) o imágenes (`.png`/`.jpg`), utilizando las aplicaciones del sistema del colaborador.

### Módulo H: Encuestas
Sección destinada a la aplicación de cuestionarios internos o normativos (ej. NOM-035).
*   **Restricción Funcional de Bloqueo:** Si el administrador emite una encuesta catalogada como obligatoria, el aplicativo bloquea la navegación general. El colaborador no podrá acceder al menú principal ni utilizar ningún otro servicio de la aplicación hasta que responda la encuesta en su totalidad.

### Módulo I: Voz del Colaborador (Feedback y Denuncias)
Canal seguro para la comunicación directa y reporte de incidencias hacia el panel de administración.
1.  **Categorías de Reporte:** *Abuso de autoridad, Acoso laboral, Acoso sexual, Agradecimiento, Clima laboral, Conflicto de interés, Discriminación, Higiene y seguridad, Innovación*.
2.  **Descripción Informativa:** Al seleccionar un tema, la aplicación despliega un texto explicativo para confirmar si el caso corresponde a esa categoría.
3.  **Redacción y Evidencias:** El colaborador redacta el comentario y tiene la opción de adjuntar una fotografía de soporte.
4.  **Anónimos:** Cuenta con un interruptor para enviar el mensaje de manera completamente anónima.
5.  **Estatus y Seguimiento:** A través de la sección "Estatus de voz del colaborador" en el menú lateral, se puede verificar la evolución del caso mediante un código de colores:
    *   *Punto Amarillo:* Pendiente.
    *   *Punto Naranja:* En proceso.
    *   *Punto Turquesa/Verde:* Atendido.
6.  **Interfaz de Conversación:** Al abrir un reporte, se inicia un chat bidireccional con Recursos Humanos estructurado en formato de mensajería (tipo WhatsApp). Permite enviar mensajes de texto y tomar fotografías como respuestas adicionales.

---

# SECCIÓN 2: TRANSCRIPCIÓN COMPLETA DEL VIDEO

A continuación se presenta la transcripción fiel y completa de la narración del video, manteniendo las pausas, aclaraciones y expresiones de la ponente durante la explicación de la demo:

**[00:00]** 
> "...aplicación es mandarte una notificación de activar notificaciones. Ya le das en que sí, permitir. Luego te sale esta de la ubi... de, perdón, de la ubicación para saber si, aquí está ¿no? de las notificaciones y de la ubicación. Para las ofertas PIN. Entonces a partir de aquí, eh, el usuario que se registró previamente en el panel, eh, se va a poner aquí en 'Ya tengo cuenta' y va a este... a entrar por primera vez en su cuenta o de las veces que sea necesaria. Si todavía no la activa, bueno pues tiene que poner el teléfono y ya ¿no? que se manda ahí la solicitud."

**[00:43]** 
> "Tienen esta liga de ayuda a la página de Paco donde vienen todas las preguntas frecuentes. Es importante mantener esta redirección. Entonces bueno, entras aquí con la cuenta, ya se coloca ahí la contraseña, inicia sesión. ¡Ay! ¿Por qué? Déjame ver la contraseña... Ok, déjame volver a intentar."

**[01:08]** 
> "Va, entonces ya entras. Y en la aplicación, eh, te vienen unos, una serie de banners. Estos vienen desde el panel. Esta es una de sandbox, que ya está viejita la versión, por eso es que tiene algunos errores, pero es solamente como referencia para que te vayas guiando en los módulos. Tienes la parte de cumpleaños en donde vienen todos, cumpleaños y aniversarios separados en tabs y viene pues obviamente por día para que vayan viendo este, como de: '¡Ay! Voy a felicitar a mi compa Amaury, el cin... el 5 de febrero, por ejemplo', ¿no? Y así se van este... van llegando notificaciones push, pero al mismo tiempo pues tú puedes entrar a consultar este apartado."

**[01:54]** 
> "Este está ligado en el panel con la sección de cumpleaños y aniversarios, y en la parte del administrador de mensajes personalizados, ¿okay? Entonces está interrelacionado así. Se cierra para abajo. ¡Ay! Y, eh, aquí en notificaciones igual pues te van llegando las encuestas que tienes que hacer, los recordatorios, eh, no sé, algún cumpleaños, algún reconocimiento que te hicieron, si ya te atendieron tu voz del colaborador, entonces tienes diferentes tipos de notificaciones. Y ya, ahí las puedes marcar todas como leídas o cada una irla viendo."

**[02:40]** 
> "Diario tienen que registrar los colaboradores, eh, su estado de ánimo. Entonces le das aquí en 'Empezar ahora' y, eh, te permite registrar tu estado de ánimo. Entonces le das en registrar y te va cambiando con un, eh, con la barrita esta de de desplazamiento a cómo te vas sintiendo. Entonces, por ejemplo, aquí le das, eh, si... siguiente. ¿Qué describen lo que sientes? Entonces este, no sé, le das aquí. ¿Qué te está afectando más? Eh, no sé, salud, pasatiempos, estrés, este, no sé, el trabajo, sucesos actuales. Entonces tú puedes seleccionar tantos como tú quieras como nada más uno. Entonces ya le das en siguiente y se registra."

**[03:31]** 
> "Y eso va directamente al panel y registra la base de estado de ánimo. Y entonces tú aquí puedes ver en las gráficas lo que vas registrando a lo largo del mes, de la semana, del año, a lo largo de 6 meses, cómo te has sentido, cómo ha habido los movimientos, qué sentimientos has tenido, o sea, todo el registro. Luego, eh, ya no te sale. De ahí te vas a adelanto de nómina."

**[04:01]** 
> "Adelanto de nómina sí es algo que tienen todas las aplicaciones de Paco habilitada porque pues es como el principal negocio de Paco, este, poder hacer adelantos de nómina. Entonces, los usuarios tienen que tener tres meses de antigüedad mínimo para que puedan, ¿cómo se llama?, solicitar un adelanto de nómina. O sea, tres meses de ya de estar contratados. Entonces, eh, en sus cuentas dan de alta la cuenta a la que se le va a depositar y obviamente también de la que se les va a retirar, y, este, dependiendo el salario, eh, en el panel se coloca el monto máximo a prestar."

**[04:50]** 
> "Entonces, el mínimo son 200, el máximo en este caso de este usuario son 2500, por lo que está registrado que gana en quincenalmente. Entonces ya dices: 'Bueno, yo quiero solicitar 300 pesos'. Le doy en continuar. Igual es con barra de desplazamiento. Te viene las comisiones. Cada empresa tiene diferentes tipos de comisiones. Entonces igual ahí se so... se coloca en el usuario en su configuración qué co... qué porcentaje de comisión o qué comisión le aplicaría. Entonces te viene el desglose del cálculo, cuándo lo pide, cuándo se va a cobrar y todo ¿no? Este, le das que has leído y aceptas los términos de condiciones. Le das en confirmar y pues ya se manda la solicitud. No lo voy a hacer en este caso porque no está conectada, entonces va a fallar, este, porque te digo que es una aplicación de sandbox. Pero una vez que se procesa, tú lo ves en el reporte de gastos y entonces te sale en el adeudo ese adeudo, te sale ese gasto, te sale en la fecha y te sale que fue un adelanto de nómina."

**[05:58]** 
> "Entonces bueno, eh, lo mismo pasa en recargas y en pago de servicios. En recargas tienen, eh, no es como afiliados, pero tienen de pro... de proveedores o tienen acuerdos con estas empresas, con AT&T, weex, bait, Telcel, este, Unefon, etcétera, ¿no? Entonces, eh, seleccionan como que la que van a hacer la recarga y tienen dos tipos de recargas, la de tiempo aire y la de datos. Entonces en tiempo aire pues ya tú seleccionas lo que vas a necesitar. Perdóname el hipo. *risas* Le das en continuar, colocas el número de celular, lo confirmas, le das en continuar y te manda a la parte de pasarela de de pagos en donde ya en esa pantalla pues tú vas a pagar, este, le das que sí, te llega un código de confirmación, lo confirmas, y ya se hace se procede la recarga que está firmando el usuario."

**[06:55]** 
> "También, eh, en el caso de pagos de servicios, por ejemplo, pues cuando vas a pagar algún servicio te colocas aquí a la referencia, le vas a tomar foto al al recibo por ejemplo, y, este, ahí por ejemplo te habilita la cámara, ¿no? Que, ay perdón, que en este caso ya la tengo tapada, por eso se veía así. *risas* Este... ya le pones que lo vas a pagar con adelanto de nómina o lo vas a pagar con la tarjeta y ya, este, no sé, coloca aquí los numeritos de la referencia. Y ya está habilitado con el total. Entonces te viene tu desglose, cuánto vas a pagar, aquí le pones tú cuánto vas a pagar e igual te viene el porcentaje de comisión que pues está configurado desde panel."

**[07:49]** 
> "Este, entonces ya ahí te sale lo que estás marcando que vas a pagar y cuánto te queda de saldo, he leído términos y condiciones y ya le das en continuar. Y lo mismo, te hace el proceso de la pasarela de pagos en donde te van a pedir tu INE del reverso, del frente, tu cara. Se hace la validación y ya te dicen 'Sí, es exitosa la validación', código, pum pum, y ya lo terminas de pagar."

**[08:18]** 
> "El módulo de comunicación no lo tienen todas las empresas, pero pues sí van a seleccionar como la la que lo tengan, ¿no? O sea, todos los módulos son opcionales excepto el de adelanto de nómina, que ese sí todas la tienen. En comunicación son mensajes que mandan las empresas desde el panel en el el módulo de mensajes. Entonces ya aquí entras y ya ves tu mensajito, ves todo lo que te ponen de material y pues pueden ser imágenes, pueden ser Excels, pueden ser Words, pueden ser incluso este presentaciones de PowerPoint. Entonces ya ahí te abre y te abre todo el archivo, ¿vale? Este... eso es en comunicación."

**[09:07]** 
> "En encuestas, este, te tienen que mandar desde el panel una encuesta, puede ser programada o puede ser de las que se mandan inmediatas como la de la NOM-035. Entonces la empresa la dispara y te llega a ti en tu aplicativo y ya tienes que contestar una encuesta. Ahora, esta parte de encuestas es importante: puedes entrar desde aquí o te va a pasar, porque tenemos ese tipo de bloqueo, que si disparamos una encuesta, al entrar tú a la aplicación no te deja ver este este inicio o este dashboard o como le quieras llamar, hasta que termines la encuesta. Entonces tienes que contestar la encuesta y todo y ya de ahí ya no te da como la lata y ya puedes utilizar o navegar en tu aplicación."

**[09:51]** 
> "En voz del colaborador, este, aquí es en donde te decía yo que seleccionabas el tema y dices: 'Ah bueno, clima laboral'. Y ya te viene toda la descripción para que tú sepas si realmente estás eligiendo bien el tema. El comentario, entonces ya le pones ahí como que todo lo que quieres este que se cheque, puedes adjuntar una imagen, este, ahí por ejemplo, o puedes quitarla. Y también puedes seleccionar si tu comentario quieres que sea anónimo o no. Ya se manda."

**[10:25]** 
> "Al momento de mandarse, se ve en el panel en el apartado de voz del colaborador, pero tú mientras, aquí en estatus de voz del colaborador, vas a ver los que tienes en proceso, los que están en pendiente y cuáles han sido atendidos, cuáles te piden que se continúe la conversación y te sale en este formato de WhatsApp. Entonces ya, este, te ponen ahí como el comentario, desde el panel te contestan y te sale así. Entonces tú contestas acá, lo mandas y se sigue viendo todo como si fuera una conversación de WhatsApp. Y está en proceso porque está esperando respuesta por parte del panel. Entonces ya, este, tú le puedes dar en tachecito o te sales desde acá. Eh... déjame grabo otro video porque si no va a pesar mucho y no se manda por WhatsApp."


A continuación, se presenta la continuación de la documentación funcional detallada de **Paco App**, abarcando las herramientas y módulos demostrados en esta segunda parte del video con el mismo nivel de detalle técnico y de usabilidad.

---

# SECCIÓN 1: CONTINUACIÓN DE LA GUÍA FUNCIONAL DE PACO APP

---

## 4. DETALLE DE NUEVOS MÓDULOS FUNCIONALES

### Módulo K: Reconoce a tu Equipo (Reconocimientos)
Fomenta la motivación y el reconocimiento entre colaboradores a través de la entrega de insignias o medallas digitales.
1.  **Selección de Medalla:** El usuario visualiza un carrusel horizontal con insignias cargadas directamente desde el panel de administración. Cada insignia cuenta con su descripción de valor:
    *   *Actitud de servicio:* "Contar con la disposición permanente de apoyar al cliente interno y/o externo...".
    *   *Adaptación al cambio:* "Capacidad de adaptación a los cambios organizacionales...".
    *   *Compromiso:* "Identificarse con las metas de la empresa, hacerlas propias...".
    *   *Confianza:* "Asegurar la confiabilidad del servicio, fortalecer la relación...".
    *   *Excelencia:* "Esfuerzo continuo en cumplir con las especificaciones...".
    *   *Integridad:* "Rectitud, coherencia con los valores propios de la empresa...".
    *   *Iniciativa:* "Buscar soluciones, el punto de partida para encontrar el 'cómo sí'...".
2.  **Destinatario:** El usuario presiona el campo "¿A quién le envías este reconocimiento?", abriendo un buscador interno del directorio ("Selecciona a las personas que deseas reconocer") para elegir al compañero (ej. "Orlando Luna").
3.  **Motivo:** En el campo de texto "¿Por qué das este reconocimiento?", se redacta la justificación del envío (ej. "porque siempre busca resolver").
4.  **Confirmación y Envío:** Al pulsar "Continuar", la medalla es enviada.
5.  **Consulta de Historial:** A través de la opción **"Mis reconocimientos"** en el menú lateral, se despliegan dos pestañas:
    *   *Recibidos:* Medallas otorgadas al colaborador por sus compañeros o por el sistema (ej. medalla de "Excelencia" por completar un curso).
    *   *Enviados:* Registro detallado de los reconocimientos emitidos por el colaborador, incluyendo fecha y hora (ej. "Iniciativa" enviado a Orlando Luna hoy a la 1:32 PM).

### Módulo L: Solicitudes (Vacaciones, Permisos e Incidencias)
Canal autogestionable para solicitar licencias, ausencias o vacaciones, integrado directamente con el módulo de aprobación del panel de administración.
*   Al ingresar, se presentan dos pestañas: **Nueva solicitud** y **Mis solicitudes**.

#### L.1. Crear Nueva Solicitud
Se seleccionan tarjetas parametrizadas por la empresa, organizadas por categorías:
*   *Permiso con goce de sueldo*
*   *Permisos (ej. Salir Temprano)*
*   *Vacaciones (ej. Días Personales, Vacuna Covid)*

**Flujo de ejemplo ("Vacuna Covid"):**
1.  **Inicio:** Al seleccionar la tarjeta, se despliega la pantalla informativa y se pulsa "Comenzar".
2.  **Selección de Fechas:** Se definen los campos "Fecha inicial" y "Fecha de finalización" mediante un calendario flotante (ej. 4 de febrero de 2026).
3.  **Cuestionario Dinámico:** Un asistente de progreso guía al colaborador a través de preguntas específicas:
    *   *Pregunta 1 de 3 (Abierta):* "¿Cuál vacuna te van a poner?" (ej. "sarampión").
    *   *Pregunta 2 de 3 (Opción múltiple):* "Al día de hoy ¿Ya has recibido alguna dosis de la vacuna contra el COVID-19?" (Sí / No).
    *   *Pregunta 3 de 3 (Selección de botones de opción):* "Qué vacuna te gustaría recibir?" (*Moderna, Pfizer, Astra Zeneca, Sputnik*).
4.  **Comentarios Adicionales:** Cuadro de texto opcional para agregar aclaraciones (ej. "revisión y pruebas").
5.  **Finalización:** Se confirma la creación. El sistema notifica al colaborador que podrá modificar las respuestas en la sección de "Solicitudes Pendientes" hasta que se inicie el proceso de evaluación de Recursos Humanos.

#### L.2. Historial de "Mis solicitudes"
Clasifica las gestiones del usuario en:
*   **Pendientes:** Solicitudes en espera de revisión (ej. "Vacuna Covid" con estatus "No iniciada").
    *   *Flujo de Aprobación:* Al presionar la solicitud, se despliega una línea de tiempo con las etapas de autorización configuradas en la empresa (*Etapa 1, Etapa 2, Etapa 3*).
    *   *Edición y Eliminación:* Permite modificar los datos del formulario ("Editar") o dar de baja el trámite mediante una confirmación de seguridad ("Eliminar").
*   **Finalizadas:** Muestra el histórico de solicitudes autorizadas o denegadas por la empresa con la etiqueta correspondiente (ej. "Rechazada" o "Aprobada").

### Módulo M: Bienestar en Línea
Repositorio de contenidos educativos y de salud para el colaborador.
*   Muestra cuatro categorías de consulta: **Bienestar Mental**, **Bienestar Físico**, **Bienestar Financiero** y **Bienestar Emocional**.
*   Al ingresar a una categoría (ej. *Bienestar Mental*), se listan recursos interactivos multimedia cargados desde el panel como: videos explicativos, presentaciones de PowerPoint, documentos PDF institucionales (ej. "Documentacion para la Api de Paco V 1.2") o archivos de Word.
*   Si una carpeta no contiene material, el sistema muestra el mensaje de control "Por el momento no hay ningún documento disponible".

### Módulo N: Solicitud de Documentos
Permite al colaborador generar y descargar constancias o formatos oficiales parametrizados en el panel de administración corporativo.
1.  **Categorías de Documentos:** Estructurado en carpetas (ej. *Prueba GIM, Prueba La cra, Solicitudes*).
2.  **Selección de Formato:** Dentro de la carpeta se listan los documentos disponibles (ej. *Alta IMSS patronal, Certificado*).
3.  **Generación de Archivo:** Al pulsar un documento, el sistema muestra la ventana de confirmación "¿Estás seguro que deseas generar el documento?".
4.  **Lector de PDF y Firma:** Se despliega el documento oficial autocompletado en formato PDF (ej. "Carátula de Operación - Instituto Mexicano del Seguro Social" para el colaborador Ricardo Jafif). El colaborador puede visualizar el documento y usar la herramienta **"Añadir a nota"** para estampar su firma digital sobre el archivo.
5.  **Carga Automatizada:** Al guardar el documento firmado, la aplicación lo sube de forma automática al panel de la empresa.

### Módulo O: Capacitaciones (E-Learning)
Plataforma de adiestramiento y formación profesional interna con soporte de avance offline.
*   **Pestañas de Estado:** **Pendientes** (cursos asignados por iniciar), **En Curso** (capacitaciones con avance parcial) y **Finalizados** (historial completado al 100%, ej. "Curso test dc3").

#### O.1. Modalidades de Capacitación
*   **Capacitación Online:** Requiere conexión a internet activa para consumir el contenido.
*   **Capacitación Offline (Descarga de Cursos):** Pensada para colaboradores con acceso limitado a internet. Al presionar "Descargar" en la tarjeta del curso, se despliega una ventana informativa que advierte que el progreso se guardará de forma local en el dispositivo y se sincronizará automáticamente con el panel de la empresa al recuperar la conexión. Se despliega una barra de progreso que detalla las fases de la descarga (*Descargando portada 1/6, Descargando media 2/6, etc.*) hasta mostrar un indicador de descarga completada (icono de verificación verde).

#### O.2. Estructura y Visualización del Curso
Al ingresar al curso (ej. "Test 3"), se observa:
*   Título, barra de progreso personal (0% a 100%) e indicador de obligatoriedad (etiqueta naranja "Obligatorio").
*   **Temario:** Lista de lecciones organizadas en orden consecutivo (ej. *1. mosd, leec1, fdas*). El contenido posterior permanece bloqueado con un candado hasta completar las lecciones previas.
*   **Reproductor Integrado:** Al "Comenzar capacitación", se despliega el material que puede incluir videos formativos, audios de explicación o archivos adjuntos (Word/Excel).
*   **Actividades Prácticas e Interacción:**
    *   *Reproductor de audio:* Control integrado para escuchar pistas de voz de la lección.
    *   *Grabación de Audio:* Permite al colaborador responder a una evaluación práctica grabando su propia voz. Solicita el permiso correspondiente en el dispositivo ("¿Permitir que Paco grabe audio?"), graba el archivo en formato `.wav`, permite reproducirlo para verificar la calidad y enviarlo directamente como actividad del curso.
    *   *Carga de Entregables:* Botón para subir archivos de soporte (PDF, imágenes, Word) como evidencia de la actividad práctica.
    *   *Lección Finalizada:* Casilla de verificación para marcar la lección como completada antes de avanzar a la siguiente sección.

---

## 5. MENÚ LATERAL Y AJUSTES DE PERFIL

El menú lateral proporciona accesos directos al expediente del colaborador y a la configuración de seguridad del sistema.

### 5.1. Mi Expediente
Muestra la información de contratación y datos personales del colaborador sincronizados desde el panel administrativo:
*   *Campos de Consulta:* Nombre Completo, Género, Fecha de Nacimiento, Número de Colaborador, RFC, CURP, Número de Seguridad Social, Fecha de Contratación, Antigüedad (calculada de forma dinámica en años, meses y días), Empleador (Razón social), Periodicidad de Pago (ej. Quincenal), Departamento, Área y Puesto.
*   *Edición Permitida:* El colaborador puede modificar de forma directa su correo electrónico y su teléfono celular, guardando los cambios con el botón de confirmación correspondiente.
*   *Contrato Laboral:* Botón superior que despliega el archivo PDF del contrato firmado por el colaborador.

### 5.2. Documentos Corporativos
Acceso directo a las políticas, reglamentos y manuales de operaciones generales de la organización (ej. *Test Condusef, Lead yourself first, Prestaciones y Beneficios, Políticas COVID, Manual de Operaciones*), organizados por carpetas.

### 5.3. Preguntas Frecuentes
Acceso directo al portal de soporte técnico externo de la plataforma para la consulta de manuales.

### 5.4. Chat de Soporte Técnico
Canal de comunicación alternativo para resolver problemas técnicos del aplicativo mediante un proveedor de chat en vivo integrado.
*   Si no hay conversaciones activas, el colaborador presiona el botón para iniciar un chat.
*   Solicita obligatoriamente los campos: *Nombre, Dirección de correo electrónico, Número de contacto* y la *Consulta escrita*. Al enviarse, abre un ticket en el panel de soporte técnico de Paco App.

### 5.5. Configuración y Seguridad
Sección de personalización y credenciales de acceso.
*   **Gestión de Foto de Perfil:** Al pulsar "Agregar foto", abre el explorador de archivos del celular (imágenes de galería o archivos recientes). Al seleccionar la imagen, el sistema actualiza la fotografía de perfil de forma inmediata.
*   **Cambiar Contraseña:** Formulario con los campos tradicionales: *Contraseña actual, Nueva contraseña y Confirmar contraseña* (todos con opción de visibilidad mediante el icono del ojo).
*   **Recuperar NIP (Código de Transacción):** Utilizado para autorizar movimientos financieros en la app. Al solicitarse, el sistema envía un código de verificación único al correo electrónico registrado para restablecer la clave.
*   **Cambiar NIP:** El sistema solicita introducir el NIP actual de 4 dígitos y posteriormente configurar y confirmar la nueva clave de transacciones.
*   **Cuentas de Banco y Tarjetas:**
    *   *Listado:* Muestra las tarjetas de débito o cuentas CLABE asociadas por el usuario para cobros o depósitos de adelanto de nómina. Cada tarjeta cuenta con su botón de eliminación ("Eliminar").
    *   *Agregar Cuenta o Tarjeta:* Mediante el botón "+", se abre una ventana dividida en dos pestañas:
        *   **Tarjetas:** Solicita Alias, Selección de Banco (menú desplegable) y Número de tarjeta de débito.
        *   **Cuenta:** Solicita Alias, Selección de Banco y los 18 dígitos de la Clave Interbancaria (CLABE).
*   **Cierre de Sesión:** Permite "Cerrar sesión" en el dispositivo de uso o forzar el "Cerrar sesión en todos los dispositivos" vinculados a la cuenta.
*   **Eliminar Cuenta:** Opción requerida para cumplir con las normativas de las tiendas de aplicaciones (App Store / Play Store). Permite al colaborador solicitar la baja definitiva de su perfil.

### 5.6. Módulo P: Chat Interno (Mensajería)
Herramienta de comunicación interna en tiempo real para los miembros de la empresa, emulando la experiencia de plataformas comerciales de mensajería (estilo WhatsApp).
*   **Crear Sala:** Permite configurar un nuevo canal o grupo de chat.
    1.  El usuario ingresa el nombre de la sala.
    2.  Selecciona a los participantes directamente desde el directorio de colaboradores de la empresa.
    3.  Crea el canal de conversación grupal.
*   **Flujo del Chat:** Permite buscar chats activos y enviar mensajes de texto individuales o grupales, así como compartir imágenes, documentos y videos de manera segura dentro de la infraestructura corporativa protegida de Paco App.

### 5.7. Términos y Condiciones de Uso
Ubicados en la sección de políticas del menú de configuración. Despliegan de forma íntegra los términos legales de la plataforma, detallando las condiciones del servicio de la sociedad mercantil emisora ("TBM"). Al final del documento se muestra la firma de conformidad digital del colaborador, registrando su nombre, carácter de "Mandante", fecha y hora de aceptación.

---

# SECCIÓN 2: TRANSCRIPCIÓN COMPLETA DEL VIDEO (PARTE 2)

**[00:00]**
> "...ipo. Este... igual aquí vienen todas las medallitas que están cargadas desde el panel. Entonces tú dices: 'Ah, bueno, yo quiero mandarle a Orlando una de iniciativa'. Entonces ya le pones a quién y buscas este... el nombre, ¿no? Orlando Luna. Y entonces, ¿por qué das este reconocimiento? 'Porque siempre busca resolver...'. Resolver, ya, le das en que sí. Y entonces ya se mandó la medallita de iniciativa."

**[00:34]**
> "También aquí tú puedes ver, en 'Mis reconocimientos', cuáles has enviado y cuáles has recibido. Entonces, bueno... es esta también igual, es como se manda de aquí hacia el panel. En 'Solicitudes' son todos los que tú quieres levantar de permisos o este... revisar tu historial de solicitudes, y llega al módulo en el panel de solicitudes. De vacaciones, salir temprano, de vacuna o lo que sea."

**[01:09]**
> "Entonces, por ejemplo, eh... dices: 'Bueno, quiero hacer una nueva solicitud de vacuna de COVID'. Le das en comenzar, dices: 'Voy a ir, no sé, mañana... mañana mismo', o sea, no voy a faltar otro día, le das en continuar. ¿Qué vacuna te van a poner? La del sarampión. Al día de hoy ¿ya has recibido alguna dosis de la vacuna contra el COVID-19?, le pones que sí o que no. Este... ya ahí continuar... ¿Qué vacuna te gustaría recibir? Pfizer... y continuar. Comentarios opcionales: 'revisión y pruebas'. Le das acá así y listo, se mandó. Y entonces llega al apartado del panel, entonces ya te hacen ahí como que la solicitud y ya."

**[01:55]**
> "Entonces, aquí están tus solicitudes, cuáles has hecho, si te las aprueban, si te las han rechazado, este... si está iniciada o no, y aquí mismo se puede editar y se pone como: 'Ah, bueno, quiero hacer este... quiero cambiar la fecha inicial, la fecha final, o quiero eliminar esta solicitud porque pues ya... hablé con mi jefe y me dijo que no la registrara, por ejemplo'."

**[02:22]**
> "En 'Bienestar en línea' igual es de lo... desde el panel donde mandan ellos, eh... todos esos mensajes de bienestar. Entonces, ves que había un módulo. Te metes a Bienestar Mental y vienen los cursos que puede ser video, puede ser una presentación de PowerPoint, puede ser un PDF, puede ser un archivo de Word, o sea, lo que sea. Entonces aquí viene igual como van cargando ellos en la división, tú lo puedes ver desde tu aplicación, pero se carga desde el panel."

**[02:53]**
> "La solicitud de documentos, igual, te mandan ellos como qué documento necesitan y entonces aquí ya tú este... vas a cargar tus archivos, generas este documento que te están solicitando por ejemplo, que es el alta del IMSS patronal, y te va a redirigir al formato que ya tenemos establecido. Entonces ya lo único que haces es firmarlo, le das en guardar y se sube."

**[03:20]**
> "Entonces, este... ahí solicitud de documentos. El módulo de capacitaciones: tienes dos opciones en el módulo de capacitaciones. O es una capacitación online o es una capacitación offline. Para que sea offline, lo que vas a hacer es descargar esta... este curso. Entonces aquí te viene incluso el texto que pueden verse y completarse sin conexión a internet, se va guardando el avance en el dispositivo, y una vez que ya tengas conexión se manda completo."

**[03:52]**
> "Entonces ya tú estás descargando tu curso, y si te quedas sin internet lo puedes contestar. Ahí está. Entonces ya tú entras y puedes comenzar el curso, le das comenzar capacitación. Vas a reproducir, te va a mandar un video, eh... te van a mandar Excels, Words, audios que se pueden escuchar. Tú puedes grabar también audios, puedes... aquí mira, grabas tu audio, bla bla bla bla bla..."

**[04:24]**
> "...así como de archivo de prueba, de audios, bla bla bla. Ya parado, se puede reproducir. Eh... puedes aquí subir algún este... adjunto, PDF, imagen, presentación, lo que sea, le das en enviar actividad y una vez que ya terminas, le das lección finalizada, te vas al siguiente y así vas terminando toda la capacitación. Entonces es cuando se va registrando como que el avance de lo que llevas de cada una de las capacitaciones y ya, la terminas."

**[04:55]**
> "Te sale cuáles están en curso, cuáles ya terminaste, y pues ya, o sea, están las pruebas. De este lado en el perfil, pues entras este... en configuración. Puedes agregar una foto... este... no sé. Te sale por default la de Paco, y si no, pues agregas ahí una foto y se cambia inmediatamente."

**[05:27]**
> "La cuenta, pues aquí puedes cambiar la contraseña. Recuperar el NIP: aquí te envía un código de verificación por correo electrónico y ya, ahí te... te manda una liga, lo cambias y aquí en automático se cambia en la aplicación, que todo eso lo manda al panel. También cambiar el NIP: aquí tú puedes poner tu NIP actual y luego te pone poner el nuevo, confirmarlo, terminas y ya. Cuentas de banco y tarjetas: aquí le das en el más y se crean, eh... todas las tarjetas bancarias, das de alta todas tus cuentas, ya le das en agregar."

**[06:05]**
> "Igual para abajo se cierra, o para atrás, o sea, te... tiene las dos opciones. Y aquí ya pues tú vas teniendo todo tu registro de cuentas y tarjetas que también si te vas para la derecha, pues tú vas viendo todas el concentrado que tienes de tarjetas. Puedes cerrar sesión en este dispositivo o en todos los dispositivos, o tienes la opción de eliminar tu cuenta, que es algo que piden las tiendas."

**[06:29]**
> "Aquí tú puedes ver tu historial de estados de ánimo... o sea, tus grafiquitas, como habíamos visto. Reporte de gastos que te viene el adeudo y los gastos, eso siempre es una gráfica circular, viene desglosado por periodos y por tipo de gasto. Los recibos de nómina: entonces, desde el panel te cargan los recibos de nómina y tú aquí los puedes ver, descargar y firmar. Tú puedes descargar tu XML, tu PDF, firmarlo, firmar todos de golpe, o sea, tienes todas esas opciones y ya, este... te sirve para tus declaraciones anuales. Las cartas SUA, igual te tienen que asignar desde el panel, tú aquí ves la carta SUA, la firmas y ya estuvo."

**[07:13]**
> "En 'Mi expediente', aquí subes tu currículum, entonces... o tu contrato laboral. Entonces, subes el contrato, se llena, ahí está todo. Se llena en automático desde el panel esta información. Tú puedes aquí editar el correo electrónico, guardarlo, cerrar; tu número celular, guardar o cerrar; eh... y ya toda esta información viene directamente desde el contrato que se carga, eh... desde el panel."

**[07:44]**
> "Documentos corporativos: igual, desde el panel te lo asignan, aquí este... tú los puedes ver, los puedes descargar y ya, ahí tú vas viendo en las carpetitas como que todos los documentos que te han mandado tu empresa. Estatus de voz del colaborador, como te había enseñado, o sea, tú tienes cuáles ya están atendidos, cuáles están en proceso, cuáles están todavía pendientes de de ver y todo. Tú puedes verlas por antiguos, recientes, por las que todavía no estén leídas, puedes buscar algún en específico que hayas puesto algún título."

**[08:26]**
> "Y, este... ya, te sale igual con semáforo de color el estatus en el que está. En 'Mis reconocimientos', como te había mostrado, todas las medallitas que has recibido y todas las que has mandado y cuándo las has mandado. En 'Preguntas frecuentes' te lleva directamente la página de ayuda, entonces es esa misma liga. Ah, por cierto, en reporte de gastos es importante este botón de contactar a soporte de WhatsApp, porque aquí tú le das en contactar a soporte y te manda directamente a el WhatsApp... ¡Ay caray! Está fallando aquí algo, pero bueno."

**[09:08]**
> "Este... le das aquí en soporte y te tiene que redirigir a WhatsApp. Yo creo que en la de tiendas sí hace eso, esta de sandbox que te digo que tiene algunos errores porque ya es muy viejita. Este... te redirige y ya te manda la conversación de Paco de 'necesito ayuda' o 'tengo una duda' y empiezas una conversación. En 'Chat de soporte técnico' es otro proveedor que se tiene en donde igual inicias una conversación, ya pones tu correo, tu número de contacto, pones la consulta, se manda y te va llegando, eh... a partir de un de asistencia, este... todo el soporte técnico para poder resolver temas de tu aplicativo. Este le llega también al panel, entonces desde el panel pueden resolver ciertas cosas y ya, tú lo estás viendo transparente en la aplicación."

**[10:00]**
> "Ya hemos entrado en configuración, y este chat es algo nuevo que ya lo aprobaron, que vamos a subir a tiendas, y entonces funciona igual que WhatsApp. Tú puedes crear una sala virtual, vas a poner qué usuarios quieres en esa sala... eh... ¡Ay!... le vas a poner en iniciar una conversación, por ejemplo con Simón. Y entonces aquí ya le pones: 'Hola'."

**[10:31]**
> "Ya se manda... bueno, os digo que este es este de sandbox, ¿no? Pero bueno, se manda la conversación y todo. Te permite cambiar fotografías, este... cargar imágenes, cambiar videos, o sea, como funciona Whats, pero aquí directamente desde el chat interno. Y pues ya, serían todos los... ah bueno, aquí ves la política de privacidad muy clarita, pero siempre tiene que estar. Tiene que estar firmada de que sí la leíste y todo, y ya este... se manda a la aplicación. Eso es cómo funciona la aplicación."