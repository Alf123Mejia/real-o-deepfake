# 🕵️‍♂️ Proyecto Vibecoding: "Real o Deepfake"

**Desarrollador:** Alfredo Javier Mejia Cardoza 

---

## 1. Aplicación o Mini-juego Funcional
"Real o Deepfake" es una aplicación web interactiva desarrollada con React, Vite y Tailwind CSS. El objetivo es entrenar la vista del usuario para detectar imágenes generadas por Inteligencia Artificial. El jugador tiene 15 segundos y 3 vidas por nivel para identificar qué imagen contiene errores sutiles (deepfake). La app funciona sin errores críticos, cuenta con un temporizador funcional, sistema de puntuación dinámico y está publicada en Vercel.

---

## 2. Evidencia de Vibecoding (Prompts Utilizados)
Durante el desarrollo, utilicé técnicas avanzadas de *prompt engineering* para guiar a la IA. A continuación se muestran 3 ejemplos estructurados de cómo me comuniqué con mi copiloto:

### Prompt 1: Creación de la Interfaz Base (UI)
* **Rol del Asistente:** Actúa como un Desarrollador Senior de React y experto en Tailwind CSS.
* **Tarea Específica y Contexto:** Necesito código para crear la estructura visual de un juego llamado "Real o Deepfake". Genera un panel superior (HUD) que muestre 3 corazones para las vidas, el nivel actual y un contador de puntaje.
* **Restricciones y Criterios de Éxito:** Utiliza Tailwind CSS con un tema oscuro y moderno. Mantén todo el código dentro de un solo archivo (`App.jsx`). No crees múltiples componentes separados por ahora.
* **Ejemplo de Salida Deseada:** Un bloque de código funcional con iconos de `lucide-react` y variables de estado (`useState`) listas para usarse.
> **¿Por qué se refinó?** El primer resultado era visualmente bueno, pero estático. Tuve que refinar el prompt para pedirle que los corazones estuvieran vinculados a una variable para poder restarlos más adelante.

### Prompt 2: Lógica del Temporizador
* **Rol del Asistente:** Eres un experto en lógica de programación y asincronismo en React.
* **Tarea Específica y Contexto:** Necesito implementar un temporizador estricto de 15 segundos para cada ronda usando el hook `useEffect`. 
* **Restricciones y Criterios de Éxito:** Si el tiempo llega a cero, el jugador debe perder una vida automáticamente. El reloj debe detenerse en el instante en que el usuario hace clic en una imagen.
* **Ejemplo de Salida Deseada:** Un bloque de código centrado solo en el `useEffect` que muestre cómo restar un segundo cada 1000 milisegundos sin causar errores de memoria.
> **¿Por qué se refinó?** El reloj inicialmente seguía corriendo en el fondo o se aceleraba. Se ajustó el prompt para pedir explícitamente una función de limpieza (`clearInterval`) para estabilizar el temporizador.

### Prompt 3: Creación de Assets (Imágenes con IA)
* **Rol del Asistente:** Actúa como un experto en Ingeniería de Prompts para generación de imágenes (DALL-E 3 / Midjourney).
* **Tarea Específica y Contexto:** Necesito prompts en inglés para generar las imágenes falsas del juego. El objetivo es que el jugador tarde en encontrar el error.
* **Restricciones y Criterios de Éxito:** Los errores deben ser **muy sutiles** (ej. un reflejo incorrecto o un dedo ligeramente deforme). La imagen real y la falsa deben tener la misma temática, iluminación y tamaño para que no sea obvio cuál es cuál. 
> **¿Por qué se refinó?** Al principio la IA sugería monstruosidades evidentes. Se iteró la instrucción para aumentar la dificultad y lograr el concepto de "engaño sutil".

---

## 3. Iteración y Mejora
La mejora más significativa se dio en la **gestión de recursos visuales y dificultad**. En la primera versión, el juego usaba imágenes genéricas de relleno (`placeholders`) traídas de internet, lo cual hacía el juego monótono y rompía las imágenes si fallaba la conexión. 

Iteré las instrucciones con la IA para rediseñar esta parte: creamos una carpeta local `/images`, descargamos fotografías reales y generamos nuestros propios Deepfakes sutiles. Además, armamos una estructura de datos (`GAME_LEVELS`) para incluir pistas explicativas tras cada ronda, convirtiendo un simple test en una herramienta de aprendizaje.

---

## 4. Validación del Resultado
* **¿Cómo se probó?** Se probó en un entorno local ejecutando `npm run dev`. Puse a prueba el código fallando a propósito para ver la pantalla de *Game Over*, dejando que el tiempo llegara a 0, y superando los 8 niveles para confirmar que la pantalla de *Victoria* se mostrara correctamente.
* **Limitación / Error resuelto:** Al publicar en Vercel, las imágenes dejaron de verse. Gracias a la depuración con IA, descubrí que los servidores de Vercel (Linux) son sensibles a las mayúsculas/minúsculas (*Case Sensitivity*). Mi código buscaba `.jpg` pero el archivo decía `.JPG`. Se ajustó la nomenclatura de los archivos y se solucionó el problema de inmediato.

---

## 5. Reflexión Final
* **Qué aprendí usando IA:** Entendí que la IA no hace el trabajo por ti, sino que amplifica tus instrucciones. Dar un prompt ambiguo genera código inútil. Aprendí a estructurar mis peticiones definiendo roles, restricciones y ejemplos claros para obtener piezas funcionales a la primera.
* **Ventajas y Límites del Vibecoding:** La ventaja principal es la velocidad; montar una interfaz completa con Tailwind toma minutos en lugar de horas. El límite es que la IA no tiene "sentido común visual". Como estudiante de diseño, me di cuenta de que la IA te da la lógica cruda, pero la intuición para crear una buena experiencia de usuario, elegir el nivel de dificultad adecuado y aplicar los fundamentos del diseño webgi sigue siendo 100% humana.
* **Nivel de Comprensión:** Comprendo bien cómo estructurar la interfaz, manejar los estilos en Tailwind y utilizar estados básicos (`useState`) para cambiar pantallas. Necesito reforzar mi dominio sobre funciones asíncronas y el ciclo de vida de los componentes (como `useEffect`), ya que la lógica detrás de los temporizadores aún resulta un poco abstracta de escribir desde cero.