import { Injectable } from '@angular/core';
import { Curso, CategoriasCurso } from '../models/curso.model';

/**
 * CursoService
 *
 * Servicio centralizado para la gestión de Cursos de Capacitación.
 * Provisto en el root injector (singleton global).
 * Actualmente utiliza datos en memoria; preparado para reemplazar
 * con llamadas HTTP en fases posteriores.
 */
@Injectable({
  providedIn: 'root'
})
export class CursoService {

  // ─── Dataset inicial ────────────────────────────────────────────────────────

  private readonly cursos: Curso[] = [
    {
      id: 1,
      nombre: 'Angular 20: Desarrollo Web Moderno',
      instructor: 'Laura Méndez',
      categoria: 'Programación',
      duracionHoras: 40,
      fechaInicio: new Date('2026-03-10'),
      activo: true
    },
    {
      id: 2,
      nombre: 'Python para Ciencia de Datos',
      instructor: 'Carlos Ruiz',
      categoria: 'Programación',
      duracionHoras: 35,
      fechaInicio: new Date('2026-04-01'),
      activo: true
    },
    {
      id: 3,
      nombre: 'SQL Server: Diseño y Optimización',
      instructor: 'Mariana López',
      categoria: 'Bases de Datos',
      duracionHoras: 28,
      fechaInicio: new Date('2026-02-15'),
      activo: false
    },
    {
      id: 4,
      nombre: 'MongoDB para Desarrolladores',
      instructor: 'Ignacio Ferraro',
      categoria: 'Bases de Datos',
      duracionHoras: 20,
      fechaInicio: new Date('2026-05-05'),
      activo: true
    },
    {
      id: 5,
      nombre: 'Redes TCP/IP: Fundamentos y Práctica',
      instructor: 'Sofía Castro',
      categoria: 'Redes',
      duracionHoras: 30,
      fechaInicio: new Date('2026-01-20'),
      activo: false
    },
    {
      id: 6,
      nombre: 'Cisco CCNA: Preparación para Certificación',
      instructor: 'Diego Herrera',
      categoria: 'Redes',
      duracionHoras: 50,
      fechaInicio: new Date('2026-06-01'),
      activo: true
    },
    {
      id: 7,
      nombre: 'Machine Learning con Python y Scikit-Learn',
      instructor: 'Valentina Torres',
      categoria: 'Inteligencia Artificial',
      duracionHoras: 45,
      fechaInicio: new Date('2026-04-15'),
      activo: true
    },
    {
      id: 8,
      nombre: 'Deep Learning y Redes Neuronales',
      instructor: 'Rodrigo Vega',
      categoria: 'Inteligencia Artificial',
      duracionHoras: 60,
      fechaInicio: new Date('2026-07-01'),
      activo: false
    },
    {
      id: 9,
      nombre: 'Ethical Hacking y Pentesting',
      instructor: 'Natalia Ríos',
      categoria: 'Ciberseguridad',
      duracionHoras: 38,
      fechaInicio: new Date('2026-03-25'),
      activo: true
    },
    {
      id: 10,
      nombre: 'Seguridad en Aplicaciones Web (OWASP)',
      instructor: 'Andrés Molina',
      categoria: 'Ciberseguridad',
      duracionHoras: 25,
      fechaInicio: new Date('2026-05-18'),
      activo: false
    },
    {
      id: 11,
      nombre: 'TypeScript Avanzado: Patrones y Buenas Prácticas',
      instructor: 'Laura Méndez',
      categoria: 'Programación',
      duracionHoras: 22,
      fechaInicio: new Date('2026-06-10'),
      activo: true
    },
    {
      id: 12,
      nombre: 'PostgreSQL: Administración y Performance',
      instructor: 'Pablo Quiroga',
      categoria: 'Bases de Datos',
      duracionHoras: 32,
      fechaInicio: new Date('2026-08-01'),
      activo: false
    },
    {
      id: 13,
      nombre: 'Antigravity',
      instructor: 'Carlos Juarez',
      categoria: 'Programación',
      duracionHoras: 40,
      fechaInicio: new Date('2026-06-15'),
      activo: true
    }
  ];

  // ─── Métodos públicos ────────────────────────────────────────────────────────

  /**
   * Devuelve todos los cursos registrados.
   */
  getAll(): Curso[] {
    return [...this.cursos];
  }

  /**
   * Devuelve únicamente los cursos activos.
   */
  getActivos(): Curso[] {
    return this.cursos.filter((curso) => curso.activo);
  }

  /**
   * Devuelve únicamente los cursos inactivos.
   */
  getInactivos(): Curso[] {
    return this.cursos.filter((curso) => !curso.activo);
  }

  /**
   * Busca un curso por su ID.
   * @returns El curso encontrado o `undefined` si no existe.
   */
  getById(id: number): Curso | undefined {
    return this.cursos.find((curso) => curso.id === id);
  }

  /**
   * Filtra cursos por categoría.
   */
  getByCategoria(categoria: CategoriasCurso): Curso[] {
    return this.cursos.filter((curso) => curso.categoria === categoria);
  }

  /**
   * Devuelve la lista de categorías únicas presentes en el dataset.
   */
  getCategorias(): CategoriasCurso[] {
    const set = new Set(this.cursos.map((c) => c.categoria));
    return [...set] as CategoriasCurso[];
  }
}
