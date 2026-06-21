import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private readonly cursoService = inject(CursoService);

  // ── Stats derivadas del servicio ──────────────────────────────────────────
  totalCursos    = 0;
  totalActivos   = 0;
  totalInactivos = 0;
  totalCategorias = 0;

  // ── Funcionalidades del sistema para las tarjetas ─────────────────────────
  readonly funcionalidades = [
    {
      icono: 'bi-ui-checks-grid',
      titulo: 'Listado de Cursos',
      descripcion:
        'Visualiza todos los cursos disponibles con su información detallada: nombre, instructor, categoría, duración y estado.',
      color: 'primary'
    },
    {
      icono: 'bi-funnel',
      titulo: 'Filtrado Inteligente',
      descripcion:
        'Filtra cursos por categoría (Programación, IA, Redes, etc.) o por estado (activo / inactivo) en tiempo real.',
      color: 'success'
    },
    {
      icono: 'bi-person-workspace',
      titulo: 'Gestión de Instructores',
      descripcion:
        'Cada curso está asociado a un instructor responsable, facilitando la organización y el seguimiento.',
      color: 'warning'
    },
    {
      icono: 'bi-calendar-check',
      titulo: 'Control de Fechas',
      descripcion:
        'Registra y consulta las fechas de inicio de cada curso para una planificación eficiente.',
      color: 'info'
    },
    {
      icono: 'bi-bar-chart-line',
      titulo: 'Panel de Estadísticas',
      descripcion:
        'Resumen visual con totales de cursos activos, inactivos y distribución por categorías.',
      color: 'danger'
    },
    {
      icono: 'bi-shield-check',
      titulo: 'Estado de Cursos',
      descripcion:
        'Control claro del estado de cada curso (activo / inactivo) para gestionar la oferta formativa vigente.',
      color: 'secondary'
    }
  ] as const;

  ngOnInit(): void {
    this.totalCursos     = this.cursoService.getAll().length;
    this.totalActivos    = this.cursoService.getActivos().length;
    this.totalInactivos  = this.cursoService.getInactivos().length;
    this.totalCategorias = this.cursoService.getCategorias().length;
  }
}
