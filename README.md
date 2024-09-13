# React Challenge - PagaTodo


Soy **Emiliano Acevedo**. Está es mi solución del React Challenge de nivel Mid.

## Ejecución de la aplicación
La aplicación se desarrolló utilizando Vite, 
una herramienta de compilación de JavaScript de tercera genereación que 
mejora enormente la experiencia de desarrollo de front-end. 

Gracias a ello, ejecutar la aplicación en modo desarollo es muy sencillo:
1. Estoy usando el gestor de dependencias **pnpm**, que es prácticamente lo mismo que **npm**, solo que más veloz. Si no se tiene instalado, se puede hacer mediante el comando ```npm install -g pnpm```
2. Instalamos las dependencias del package.json con ```pnpm install```
3. Y eso sería todo, solo que queda ejecutar el servidor de desarrollo con ```pnpm dev```, el código se programos para que no haya que programar ni configurar nada respecto a la funcionalidad de la aplicación.

## ¿Cómo funciona la autenticación simulada?
En base a los requisitos de la prueba, no quize complicar muchas las cosas usando React Router o similares, así que hice lo siguiente:
- Cree un **authContext** con 2 estados: un booleano que me dice si se esta autenticado o no, y otro con un objeto para guardar la info de la sesión, que para este caso pues solo es el rol. Cree también la función de *login* que se encarga de actualizar los estados y guardar en el sessionStorage.
- Envolvó **TODA** la aplicación (desde el main.jsx) con el wrapper de este contexto.
- Creo un componente a manera de "pantalla" llamado **LoginPage.jsx** que pues solo tiene un formulario con un select de los roles disponibles a seleccionar, aquí tambien bindeo la función de login del contexto.
- Y finalmente en un componente intermedio, **AuthValidator.jsx**, haciendo uso del contexto y un simple ternary operator, decido si renderizar la página de Login o la **App.jsx**, que es un componente con todo el resto de lá aplicación.
- Implemente en el contexto un useEffect que chece si ya hay una sesión en el storage guardada, si es el caso, mostramos la App inmediatamente.
- No se pidio esto en la prueba, pero me tome la libertad de agregar un botón de logout que funciona igual con el contexto, con el fin de probar rápidamente los demás roles.


## Descripción de tu enfoque y decisiones de diseño

### NextUI como librería de componentes

- Personalmente me gusta muchísimo esta librería, es un poco pesada debido a su uso de **Framer Motion** para las animaciones, pero creo que los componentes que ofrece tienen una calidad tremenda, tanto a nivel visual como de experiencia de usuario.
- Usa **TailwindCSS** de fondo, por lo que si necesito modificar los componentes a nivel de estilo, es bastante sencillo.
- Ofrece componentes bastante **avanzados**, por lo que implementar cosas como modales, tooltips, inclusó paginación resulta mucho más sencillo.
- Ligado con lo anterior, facilita bastante implementar Dark Mode.
- Es fácil de configurar y de instalar, facilitando la experiencia de desarrollos.

### Evitar "Magic Strings"

Cree una carpeta de constante, con el fin de evitar lo más posible esta mala práctica que me causado bastantes problemas en algunas ocaciones. Me parece algo
especialmente útil sobre todo a la hora de trabajar con comparación de roles o los géneros, keys para el sessionStorage, etc.

### Carpetas para **TODO**

Me gusta mucho tener una carpeta para cada cosa, para los hooks, para helpers (funciones de utiliad relacionadas con el negocio de la app), services (lo uso más que nada para peticiones fetch externas), contexts y components. De igual manera trato de crear subcarpetas para internamente separar las cosas, como en components donde tengo las cosas relacionadas a **Auth** por lado y de los **Users** por otro.

### Un archivo para cada cosa

Similar a lo anterior, ayuda a la mantenibilidad, trato de separar las funcionalidades lo más posible, para que si algún día alguna de las librerias a usar llega a cambiar, sea un poco más facil migrar las cosas. De igual manera, ayuda a debuggear bastante, puesto que ve claramente de que archivo viene el error. Es por eso que para este caso, generé bastantes componentes y hooks.

### Archivos de barril

Se podrá ver que en las carpetas se repite mucho el agregar archivos **index.js**, que unicamente exportan otros componentes o funciones. De está manera centralizo los exports haciendo el código más legible y reutilizable, pasando de estó:
```jsx
import { Button } from "../components/ui/button"
import { Tooltip } from "../components/ui/tooltip"
import { Chip } from "../components/ui/chip"
```
a esto
```jsx
import { Button, Tooltip, Chip } from "../components/ui"
```
Y con un archivo de tsconfig.json con aliases es incluso más util en temas de reutilzar código:
```jsx
import { Button, Tooltip, Chip } from "@/components/ui"
```
### ¿Por qué no use TypeScript?

Me gusta TypeScript, y lo uso mucho para mis proyectos personales y freelance, sobre todo con Next.js, pero para este caso, lo veo un poco innceseario
debido al tamnaño del proyecto, además de que invertiría bastante tiempo tipando el código, asíi que prefire ser ágil y usar JavaScript en su lugar.

