# Pulso Comercial · versión web instalable (PWA) para iPhone

Es la misma app del APK, preparada para instalarse desde Safari, pero **sin datos demo**: al tocar *Ingresar* en la bienvenida pide directamente el archivo `pulso_datos.json`, y hasta cargarlo no se ve nada más. Solo acepta el archivo cifrado que genera el conversor. Queda con ícono propio en la pantalla de inicio, se abre a pantalla completa y funciona sin conexión. También sirve en Android desde Chrome, con "Instalar app".

## Contenido de la carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app, sin datos demo. |
| `manifest.webmanifest` | Nombre, colores e íconos de la app instalada. |
| `sw.js` | Guarda la app en el teléfono para abrirla sin conexión y detecta versiones nuevas. |
| `icons/` | Ícono gris grafito con el pulso, en todos los tamaños. |
| `robots.txt` | Pide a los buscadores que no la indexen (la página también lleva `noindex`). |
| `.nojekyll` | Opcional. Evita que GitHub procese los archivos. |

Los datos reales **no** van en esta carpeta. Cada usuario sigue cargando `pulso_datos.json` cifrado desde OneDrive con **Actualizar**.

## Publicar en GitHub Pages (una sola vez, desde el navegador)

1. En github.com: **+ › New repository**.
   - Nombre difícil de adivinar, por ejemplo **`pulso-jlqoo7zp1n`** (o cualquier combinación al azar).
   - Visibilidad: **Public**. Con la cuenta gratuita, GitHub Pages solo funciona con repositorios públicos. Lo que queda visible es el código de la app y los datos demo ficticios.
   - **Create repository**.
2. En el repositorio nuevo: **uploading an existing file** (o **Add file › Upload files**).
   - Arrastrá **todo el contenido** de esta carpeta: `index.html`, `manifest.webmanifest`, `sw.js`, `robots.txt` y la carpeta `icons`.
   - **Commit changes**.
3. **Settings › Pages**.
   - En *Build and deployment*, Source: **Deploy from a branch**.
   - Branch: **main**, carpeta **/ (root)**. **Save**.
4. Esperá 1 o 2 minutos. La app queda publicada en:
   **https://juliangarciacsl.github.io/pulso-jlqoo7zp1n/** (termina con el nombre que le hayas puesto al repositorio).
5. Compartí ese enlace solo con el equipo, por WhatsApp o mail.

## Instalar en el iPhone

1. Abrí el enlace en **Safari**. Tiene que ser Safari; desde otros navegadores no aparece la opción.
2. Tocá **Compartir** (el cuadrado con la flecha hacia arriba) › **Agregar a inicio** › **Agregar**.
3. Abrila desde el ícono **Pulso**. La primera vez, dentro de Safari, la app muestra un aviso con estos pasos.
4. Tocá **Ingresar**: se abre el selector de archivos. Elegí **Seleccionar archivo** › **Explorar** › **OneDrive** › `pulso_datos.json`. Hace falta tener la app de OneDrive instalada y activada en *Archivos*. Después, para traer datos nuevos: **Actualizar** dentro de la app.

## Publicar una versión nueva

Subí de nuevo `index.html` y `sw.js` al repositorio (**Add file › Upload files**; reemplazan a los anteriores) y confirmá con **Commit changes**.

La próxima vez que alguien abra la app, aparece arriba **"Hay una versión nueva · tocá para actualizar"**. Además, la app busca actualizaciones sola cada hora mientras está abierta.

## Qué tan privada queda

- La dirección no aparece en buscadores y es difícil de adivinar. Pero el repositorio **sí se ve en tu perfil de GitHub**; quien entre ahí puede encontrarlo.
- Aunque alguien abra el enlace, solo ve la bienvenida y el pedido del archivo. Sin `pulso_datos.json` no hay nada que mostrar.
- La protección real de los datos es la carpeta de OneDrive: el archivo cifrado se abre con la app, así que conviene que esa carpeta esté compartida **solo con el equipo**, no con "cualquiera que tenga el vínculo".

## Bueno saber

- Mientras la app esté instalada en la pantalla de inicio, iOS conserva sus datos guardados (sesión, registros manuales). Si solo se usa como página de Safari, sin instalar, iOS puede borrarlos después de varias semanas sin uso. Los datos oficiales se recuperan con **Actualizar**.
- El mapa necesita conexión para descargar el fondo. El resto funciona sin conexión.
- Si más adelante quieren una dirección propia (ej. `pulso.miempresa.com`), se configura en **Settings › Pages › Custom domain**.
