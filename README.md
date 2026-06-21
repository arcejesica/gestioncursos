# 📚 Gestor de Cursos de Capacitación

> Aplicación web desarrollada con **Angular 20**, **Bootstrap 5** y **TypeScript**.  
> Permite administrar, visualizar y filtrar cursos de capacitación corporativa desde un panel moderno y responsive.

---

## 📋 Índice

- [¿Qué hace esta aplicación?](#-qué-hace-esta-aplicación)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Páginas y componentes](#-páginas-y-componentes)
- [Modelo de datos](#-modelo-de-datos)
- [El servicio CursoService](#-el-servicio-cursoservice)
- [Conceptos Angular utilizados](#-conceptos-angular-utilizados)
- [Cómo ejecutar el proyecto](#-cómo-ejecutar-el-proyecto)
- [Comandos útiles](#-comandos-útiles)

---

## 🎯 ¿Qué hace esta aplicación?

El **Gestor de Cursos de Capacitación** es una aplicación de una sola página (SPA) que permite:

- **Ver** un listado completo de cursos de capacitación registrados en el sistema.
- **Filtrar** cursos por categoría (Programación, IA, Redes, etc.) y por estado (Activo / Inactivo).
- **Consultar** información detallada de cada curso: nombre, instructor, categoría, duración en horas, fecha de inicio y estado.
- **Navegar** entre una página de inicio (Home) y el listado de cursos, con una barra de navegación siempre visible.

La aplicación está construida siguiendo buenas prácticas de Angular moderno: componentes standalone, routing con lazy loading, servicios inyectados con `inject()`, y tipado fuerte con TypeScript.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Versión | Para qué se usa |
|------------|---------|----------------|
| **Angular** | 20 | Framework principal de la aplicación |
| **TypeScript** | 5.x | Lenguaje tipado para la lógica |
| **Bootstrap** | 5.3.3 | Estilos, grid responsive y componentes visuales |
| **Bootstrap Icons** | 1.11.3 | Íconos del sistema (flechas, checkmarks, etc.) |
| **Google Fonts — Inter** | — | Tipografía moderna y legible |
| **Angular CLI** | 20 | Herramienta para crear y ejecutar el proyecto |

---

## 📁 Estructura del proyecto

```
gestor-cursos/
│
├── src/
│   ├── index.html               ← Página HTML raíz (incluye Bootstrap y Google Fonts)
│   ├── styles.css               ← Estilos globales de la aplicación
│   │
│   └── app/
│       ├── app.ts               ← Componente raíz (Navbar + Router)
│       ├── app.html             ← Template raíz: <app-navbar> + <router-outlet>
│       ├── app.css              ← Estilos mínimos del shell
│       ├── app.config.ts        ← Configuración de Angular (provideRouter)
│       ├── app.routes.ts        ← Definición de rutas de la aplicación
│       │
│       ├── models/
│       │   └── curso.model.ts   ← Interface Curso y type CategoriasCurso
│       │
│       ├── services/
│       │   ├── curso.service.ts       ← Servicio con los datos y métodos
│       │   └── curso.service.spec.ts  ← Tests unitarios del servicio
│       │
│       ├── shared/              ← Componentes reutilizables en toda la app
│       │   └── navbar/
│       │       ├── navbar.component.ts
│       │       ├── navbar.component.html
│       │       └── navbar.component.css
│       │
│       └── pages/               ← Una carpeta por cada página/ruta
│           ├── home/
│           │   ├── home.component.ts
│           │   ├── home.component.html
│           │   └── home.component.css
│           │
│           └── cursos-list/
│               ├── cursos-list.component.ts
│               ├── cursos-list.component.html
│               └── cursos-list.component.css
│
├── angular.json                 ← Configuración del proyecto Angular
├── package.json                 ← Dependencias npm
└── tsconfig.json                ← Configuración de TypeScript
```

---

## 🖥️ Páginas y componentes

### 🏠 Página de Inicio — `/`

La página principal tiene **5 secciones**:

1. **Hero** — Título grande, mensaje de bienvenida, descripción del sistema y dos botones de acción. Incluye partículas decorativas animadas con CSS.

2. **Strip de estadísticas** — Cuatro tarjetas que muestran en tiempo real (tomando los datos del servicio):
   - Total de cursos
   - Cursos activos
   - Cursos inactivos
   - Cantidad de categorías

3. **Descripción del sistema** — Explica qué hace la aplicación con una lista de características y una tarjeta técnica con el stack utilizado (Angular, Bootstrap, TypeScript, etc.).

4. **Funcionalidades** — Seis tarjetas generadas automáticamente desde el componente TypeScript, cada una con un ícono y color diferente, explicando las capacidades del sistema.

5. **Call To Action final** — Sección oscura con un botón para ir directamente al listado de cursos.

---

### 📋 Página de Cursos — `/cursos`

La página de listado tiene **4 secciones**:

1. **Encabezado** — Título de la página y contador de resultados.

2. **Tarjetas de resumen** — Igual que en Home, pero específicas de esta vista: total, activos, inactivos, categorías.

3. **Panel de filtros** — Dos tipos de filtros combinables:
   - **Por categoría**: botones pill generados dinámicamente desde el servicio.
   - **Por estado**: grupo de botones Todos / Activos / Inactivos.
   - Botón de **limpiar filtros** para resetear la selección.

4. **Tabla de cursos** — Tabla Bootstrap con todas las columnas:

   | Columna | Descripción |
   |---------|-------------|
   | **#** | Número de fila (no el ID de la base de datos) |
   | **Nombre** | Nombre del curso con `titlecase` (ej: "angular avanzado" → "Angular Avanzado") |
   | **Instructor** | Nombre con un avatar circular que muestra la inicial |
   | **Categoría** | Badge de color con el texto en `uppercase` |
   | **Duración** | Horas del curso |
   | **Fecha de Inicio** | Formateada como `dd/MM/yyyy` con el pipe `date` |
   | **Estado** | Badge verde **Activo** o badge rojo **Inactivo** |

---

### 🔗 Barra de Navegación — `NavbarComponent`

Visible en **todas las páginas**. Contiene:
- Logo con ícono, nombre de la aplicación y subtítulo.
- Links de navegación: **Inicio** y **Cursos**.
- El link activo se resalta automáticamente (Angular `routerLinkActive`).
- En pantallas chicas (móviles) colapsa en un menú hamburguesa.

---

## 🗂️ Modelo de datos

La entidad principal es `Curso`, definida en `src/app/models/curso.model.ts`:

```typescript
// Categorías válidas — solo se puede usar una de estas opciones
export type CategoriasCurso =
  | 'Programación'
  | 'Bases de Datos'
  | 'Redes'
  | 'Inteligencia Artificial'
  | 'Ciberseguridad';

// Estructura de un Curso
export interface Curso {
  id: number;               // Identificador único
  nombre: string;           // Nombre del curso
  instructor: string;       // Nombre del instructor
  categoria: CategoriasCurso; // Una de las 5 categorías válidas
  duracionHoras: number;    // Duración total en horas
  fechaInicio: Date;        // Fecha en que inicia el curso
  activo: boolean;          // true = visible/disponible, false = no disponible
}
```

> **¿Por qué `CategoriasCurso` es un `type` y no un `string`?**  
> Usar un *union type literal* hace que TypeScript te avise si escribís mal una categoría.  
> Por ejemplo, `'Programacion'` (sin tilde) daría error de compilación.

---

## ⚙️ El servicio CursoService

Ubicación: `src/app/services/curso.service.ts`

Es el **centro de datos** de la aplicación. Almacena los cursos en memoria y los expone mediante métodos. Por ahora usa datos hardcodeados, pero está preparado para conectarse a una API REST en el futuro.

### Métodos disponibles

```typescript
// Obtener todos los cursos (retorna una copia, no la lista original)
cursoService.getAll(): Curso[]

// Obtener solo los cursos activos (activo === true)
cursoService.getActivos(): Curso[]

// Obtener solo los cursos inactivos (activo === false)
cursoService.getInactivos(): Curso[]

// Buscar un curso por su ID
cursoService.getById(id: number): Curso | undefined

// Filtrar por categoría
cursoService.getByCategoria(categoria: CategoriasCurso): Curso[]

// Obtener las categorías únicas que existen en los datos
cursoService.getCategorias(): CategoriasCurso[]
```

### ¿Por qué `providedIn: 'root'`?

```typescript
@Injectable({ providedIn: 'root' })
export class CursoService { ... }
```

Esto significa que Angular crea **una única instancia** del servicio para toda la aplicación (patrón Singleton). Cualquier componente que lo pida con `inject(CursoService)` recibe la misma instancia — no se crean datos duplicados.

---

## 🧩 Conceptos Angular utilizados

### Standalone Components
Cada componente declara sus propios imports sin necesitar un módulo (`NgModule`). Esto es la forma moderna de Angular (v17+).

```typescript
@Component({
  standalone: true,
  imports: [DatePipe, NgStyle, UpperCasePipe, TitleCasePipe],
  ...
})
```

### Lazy Loading (Carga diferida)
Las páginas se cargan **solo cuando el usuario las visita**, no al arrancar la app. Esto hace que la carga inicial sea más rápida.

```typescript
// app.routes.ts
{
  path: 'cursos',
  loadComponent: () =>
    import('./pages/cursos-list/cursos-list.component')
      .then(m => m.CursosListComponent)
}
```

### Inyección de dependencias con `inject()`
La forma moderna de obtener servicios en Angular — sin parámetros en el constructor:

```typescript
private readonly cursoService = inject(CursoService);
```

### Control Flow moderno (@for, @if)
Angular 17+ reemplaza `*ngFor` y `*ngIf` con una sintaxis más limpia:

```html
<!-- Recorrer una lista -->
@for (curso of cursosFiltrados; track curso.id) {
  <tr>...</tr>
}

<!-- Condición: mostrar badge verde o rojo -->
@if (curso.activo) {
  <span class="badge-estado--activo">Activo</span>
} @else {
  <span class="badge-estado--inactivo">Inactivo</span>
}
```

### Pipes (transformadores de datos)
Los pipes transforman cómo se muestra un valor **sin modificar el dato original**:

```html
{{ curso.nombre     | titlecase }}       <!-- "angular avanzado" → "Angular Avanzado" -->
{{ curso.categoria  | uppercase }}       <!-- "programación" → "PROGRAMACIÓN" -->
{{ curso.fechaInicio | date:'dd/MM/yyyy' }} <!-- 2026-03-10 → "10/03/2026" -->
```

### RouterLink y RouterLinkActive
Permiten la navegación sin recargar la página, y marcan automáticamente el link de la página actual como "activo":

```html
<a routerLink="/cursos" routerLinkActive="active">Cursos</a>
```

---

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos
- Tener instalado **Node.js** (versión 18 o superior)
- Tener instalado **npm** (viene con Node.js)

### Pasos

```bash
# 1. Clonar o descargar el proyecto
#    (si ya lo tenés descargado, salteá este paso)

# 2. Instalar las dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm start

# 4. Abrir el navegador en:
#    http://localhost:4200
```

El servidor detecta cambios automáticamente — si modificás un archivo, la página se actualiza sola en el navegador (Hot Reload).

---

## 🧪 Tests unitarios

El servicio `CursoService` tiene **12 tests unitarios** en `curso.service.spec.ts` que verifican:

- Que `getAll()` devuelve al menos 10 cursos.
- Que `getActivos()` devuelve solo cursos con `activo === true`.
- Que `getInactivos()` devuelve solo cursos con `activo === false`.
- Que `getById()` encuentra un curso o devuelve `undefined` si no existe.
- Que `getByCategoria()` filtra correctamente.
- Que `getCategorias()` devuelve exactamente 5 categorías sin repetir.
- Que `activos + inactivos === total` (integridad de datos).

```bash
# Ejecutar los tests
npm test
```

---

## 📐 Comandos útiles

```bash
npm start            # Inicia el servidor de desarrollo en http://localhost:4200
npm test             # Ejecuta los tests unitarios
npm run build        # Compila la app para producción (carpeta dist/)

# Generar nuevos elementos con Angular CLI
ng generate component pages/mi-pagina   # Nuevo componente
ng generate service services/mi-servicio # Nuevo servicio
ng generate pipe pipes/mi-pipe           # Nuevo pipe
```

---

## 📌 Datos de prueba incluidos

El sistema incluye **13 cursos de ejemplo** que cubren las 5 categorías:

| Categoría | Cantidad | Color del badge |
|-----------|----------|----------------|
| Programación | 4 | Azul |
| Bases de Datos | 3 | Índigo |
| Redes | 2 | Cyan |
| Inteligencia Artificial | 2 | Violeta |
| Ciberseguridad | 2 | Rojo |

Algunos tienen `activo: true` y otros `activo: false` para poder probar los filtros de la tabla.

---

*Desarrollado con Angular 20 · Bootstrap 5 · TypeScript*
