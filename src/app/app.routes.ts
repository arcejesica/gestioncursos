import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Inicio | Gestor de Cursos'
  },
  {
    path: 'cursos',
    loadComponent: () =>
      import('./pages/cursos-list/cursos-list.component').then(
        (m) => m.CursosListComponent
      ),
    title: 'Cursos | Gestor de Cursos'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

