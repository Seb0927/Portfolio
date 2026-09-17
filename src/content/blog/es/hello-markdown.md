---
title: "Hola, Markdown"
description: "Una publicación de ejemplo que muestra todo lo que soporta el blog: encabezados, listas, tablas, código, citas, notas al pie e imágenes con leyenda."
date: "2026-09-16"
image: "@/assets/images/blog/hello-markdown/cover.jpg"
imageAlt: "Portada de ejemplo con degradado verde"
draft: false
---

Esta es una publicación de ejemplo que muestra lo que el blog puede renderizar.
Existe para verificar de punta a punta el diseño, la tipografía y las notas al
pie[^1].

## Qué está soportado

Casi todo lo que esperarías de Markdown al estilo GitHub:

- **Negrita**, _cursiva_, ~~tachado~~ y `código en línea`
- [Enlaces](https://docs.astro.build) que siguen el tema del sitio
- Listas ordenadas y desordenadas

> Las citas son Markdown normal. Se estilizan con la paleta de la página y no
> necesitan ninguna sintaxis especial.

### Una tabla pequeña

| Función      | Soportado |
| ------------ | --------- |
| Notas al pie | Sí        |
| Figuras      | Sí        |
| Callouts     | No        |

### Algo de código

```js
const saludo = "Hola, mundo";
console.log(saludo);
```

## Una imagen con leyenda

Una imagen obtiene leyenda cuando se define el título de Markdown:

![Ilustración morada de ejemplo](../../../assets/images/blog/hello-markdown/figure.png "La leyenda se toma del título de la imagen.")

## Notas al pie

Las referencias se recogen al final de la publicación, al estilo GitHub.[^2]

[^1]: Esta nota demuestra que el flujo de notas al pie de GFM está activo.

[^2]: Una segunda nota, con un [enlace](https://example.com).
