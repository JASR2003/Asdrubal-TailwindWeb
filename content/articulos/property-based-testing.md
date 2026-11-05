---
titulo: Property-based testing me encontró un bug con números somalíes que yo ni sabía que existían
titulo_seo: Pruebas basadas en propiedades en Python: un bug con números somalíes
fecha: 2026-11-04
actualizado: 2026-11-04
descripcion: Pruebas basadas en propiedades con Hypothesis (Python) y fast-check (TypeScript): dos ejemplos y un bug con números somalíes que no habría escrito a mano.
destacado: números somalíes
secciones: Python, TypeScript
link_linkedin: https://www.linkedin.com/pulse/property-based-testing-me-encontr%C3%B3-un-bug-con-n%C3%BAmeros-asdr%C3%BAbal-su%C3%A1rez-sgoyc
link_x: https://x.com/AsdrubalCodes/status/2118015250947850743
---

Imagínate que estás aprendiendo a formar plurales en inglés. Tu profesor te pregunta: cat, cats, dog, dogs, book, books.

Ahora imagina que en vez de 3 te mandan cientos de sustantivos, algunos regulares, otros irregulares, palabras que terminan en -y, -s, -x.

De repente aparece child, childs con s, y ahí encontramos algo que los 3 ejemplos anteriores no detectaron.

Así funciona property-based testing. En lugar de escribir casos específicos, defines una propiedad que tu código debe cumplir y dejas que una herramienta genere muchos inputs para intentar encontrar ejemplos que rompan lo que estás probando.

Existen diferentes librerías para esto. En Python existe Hypothesis. En TypeScript existe fast-check.

Vamos con 2 ejemplos.

### Ejemplo 1: Python con Hypothesis

Empecemos con una función sencilla, la cual calcula el promedio de una lista de números:

```python
def promedio(numeros):
    return sum(numeros) / len(numeros)
```

Lo normal sería probarla con un par de listas, tipo `[2, 4, 6]` y `[10]`, y las dos pasan.

Con property-based testing la pregunta cambia: ¿qué tiene que ser verdad siempre, sin importar la lista? En este caso, que el promedio nunca puede ser menor que el número más chico ni mayor que el más grande.

```python
from hypothesis import given, strategies as st

@given(st.lists(st.integers(min_value=-1000, max_value=1000)))
def test_promedio_esta_entre_el_minimo_y_el_maximo(numeros):
    resultado = promedio(numeros)
    assert min(numeros) <= resultado <= max(numeros)
```

`@given` le dice a Hypothesis que me genere las listas de enteros, y yo no escribo ninguna. Lo corro y falla:

```text
numeros = []
ZeroDivisionError: division by zero
```

Ni se me había ocurrido probar con la lista vacía. Hypothesis la encontró sola, y además me la mostró como el caso más chico que rompe la función.

Ahora me toca decidir qué debería pasar con una lista vacía. Para mí es un error, así que lo digo explícito:

```python
def promedio(numeros):
    if not numeros:
        raise ValueError("No se puede promediar una lista vacía")
    return sum(numeros) / len(numeros)
```

Y al test le digo que las listas traigan al menos un número con `min_size=1`:

```python
@given(st.lists(st.integers(min_value=-1000, max_value=1000), min_size=1))
```

Con eso pasa.

### Ejemplo 2: TypeScript con fast-check

El segundo ejemplo es una función que aplica un descuento a un precio:

```ts
function aplicarDescuento(precio: number, porcentaje: number): number {
  return precio - precio * (porcentaje / 100);
}
```

Si la pruebo con `aplicarDescuento(100, 10)`, da 90. Todo bien.

La propiedad que quiero que se cumpla siempre es que el precio final no sea negativo ni mayor que el precio original.

```ts
import fc from "fast-check";

fc.assert(
  fc.property(
    fc.integer({ min: 0, max: 10_000 }), // precio
    fc.integer(),                        // porcentaje, cualquier entero
    (precio, porcentaje) => {
      const final = aplicarDescuento(precio, porcentaje);
      return final >= 0 && final <= precio;
    }
  )
);
```

fast-check prueba con muchos precios y porcentajes, y falla:

```text
Counterexample: [1,101]
Shrunk 36 time(s)
```

Un precio de 1 con un descuento de 101% da un precio negativo. Fíjense en `Shrunk 36 time(s)`: fast-check encontró primero un caso grande que fallaba y lo fue achicando hasta dejar el más simple, para que yo no tenga que descifrar un número raro.

Si un día llega un porcentaje mal cargado a la base de datos, la tienda termina pagándole al cliente.

La corrección es validar el porcentaje para que se quede entre 0 y 100:

```ts
function aplicarDescuento(precio: number, porcentaje: number): number {
  const p = Math.min(Math.max(porcentaje, 0), 100);
  return precio - precio * (p / 100);
}
```

Con eso la propiedad pasa.

Nota del 4 de noviembre de 2026: aquí dije "validar", pero ese código solo limita el valor. `aplicarDescuento(100, 101)` devuelve `0`, así que la propiedad pasa y la tienda regala el producto sin avisar. Validar de verdad es rechazar el dato, igual que en el ejemplo de Python:

```ts
function aplicarDescuento(precio: number, porcentaje: number): number {
  if (!(porcentaje >= 0 && porcentaje <= 100)) {
    throw new RangeError("El porcentaje debe estar entre 0 y 100");
  }
  return precio - precio * (porcentaje / 100);
}
```

Y al test le digo que los porcentajes estén entre 0 y 100 con `fc.integer({ min: 0, max: 100 })`. Con eso pasa.

Me pasó validando numerales en Python. Hypothesis encontró que el sistema fallaba con números somalíes, unos dígitos que yo ni sabía que existían. Ese caso no se me habría ocurrido escribirlo a mano.
