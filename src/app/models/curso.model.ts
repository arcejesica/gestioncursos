/**
 * Categorías válidas para un curso de capacitación.
 * Usar un union type literal garantiza tipado fuerte en toda la aplicación.
 */
export type CategoriasCurso =
  | 'Programación'
  | 'Bases de Datos'
  | 'Redes'
  | 'Inteligencia Artificial'
  | 'Ciberseguridad';

/**
 * Entidad principal que representa un Curso de Capacitación.
 */
export interface Curso {
  id: number;
  nombre: string;
  instructor: string;
  categoria: CategoriasCurso;
  duracionHoras: number;
  fechaInicio: Date;
  activo: boolean;
}
