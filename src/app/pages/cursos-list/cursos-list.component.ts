import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgStyle, UpperCasePipe, TitleCasePipe } from '@angular/common';

import { Curso, CategoriasCurso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-cursos-list',
  standalone: true,
  // ── Pipes utilizados en el template ────────────────────────────
  // · TitleCasePipe  → curso.nombre
  // · UpperCasePipe  → curso.categoria (texto visible)
  // · DatePipe       → curso.fechaInicio
  // · NgStyle        → badge de color por categoría
  imports: [DatePipe, NgStyle, UpperCasePipe, TitleCasePipe],
  templateUrl: './cursos-list.component.html',
  styleUrl: './cursos-list.component.css'
})
export class CursosListComponent implements OnInit {

  // ── Inyección con la API moderna de Angular ─────────────────────
  private readonly cursoService = inject(CursoService);

  // ── Estado del componente ───────────────────────────────────────
  cursos: Curso[] = [];
  categorias: CategoriasCurso[] = [];
  categoriaSeleccionada: CategoriasCurso | 'Todas' = 'Todas';
  mostrarSolo: 'todos' | 'activos' | 'inactivos' = 'todos';

  // ── Getters derivados (no duplican estado) ──────────────────────

  /** Cursos filtrados por estado + categoría de forma combinada. */
  get cursosFiltrados(): Curso[] {
    let lista = this.cursos;

    if (this.mostrarSolo === 'activos') {
      lista = lista.filter((c) => c.activo);
    } else if (this.mostrarSolo === 'inactivos') {
      lista = lista.filter((c) => !c.activo);
    }

    if (this.categoriaSeleccionada !== 'Todas') {
      lista = lista.filter((c) => c.categoria === this.categoriaSeleccionada);
    }

    return lista;
  }

  get totalActivos(): number {
    return this.cursos.filter((c) => c.activo).length;
  }

  get totalInactivos(): number {
    return this.cursos.filter((c) => !c.activo).length;
  }

  // ── Ciclo de vida ───────────────────────────────────────────────

  ngOnInit(): void {
    this.cursos     = this.cursoService.getAll();
    this.categorias = this.cursoService.getCategorias();
  }

  // ── Acciones de filtrado ────────────────────────────────────────

  filtrarPorCategoria(cat: CategoriasCurso | 'Todas'): void {
    this.categoriaSeleccionada = cat;
  }

  filtrarPorEstado(estado: 'todos' | 'activos' | 'inactivos'): void {
    this.mostrarSolo = estado;
  }

  limpiarFiltros(): void {
    this.categoriaSeleccionada = 'Todas';
    this.mostrarSolo = 'todos';
  }

  // ── Estilos dinámicos para badge de categoría ──────────────────

  /**
   * Retorna estilos inline por categoría.
   * Se usa [ngStyle] para evitar problemas con tildes y espacios
   * en selectores CSS encapsulados.
   */
  getCategoriaBadgeStyles(categoria: string): { [prop: string]: string } {
    const mapa: Record<string, { bg: string; color: string }> = {
      'Programación':            { bg: '#dbeafe', color: '#1d4ed8' },
      'Bases de Datos':          { bg: '#e0e7ff', color: '#4338ca' },
      'Redes':                   { bg: '#cffafe', color: '#0e7490' },
      'Inteligencia Artificial': { bg: '#f3e8ff', color: '#7e22ce' },
      'Ciberseguridad':          { bg: '#fee2e2', color: '#b91c1c' }
    };
    const estilo = mapa[categoria] ?? { bg: '#f1f5f9', color: '#475569' };
    return { 'background-color': estilo.bg, color: estilo.color };
  }
}
