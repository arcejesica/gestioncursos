import { TestBed } from '@angular/core/testing';
import { CursoService } from './curso.service';
import { CategoriasCurso } from '../models/curso.model';

describe('CursoService', () => {
  let service: CursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll()', () => {
    it('debería devolver al menos 10 cursos', () => {
      const cursos = service.getAll();
      expect(cursos.length).toBeGreaterThanOrEqual(10);
    });

    it('debería devolver una copia del array, no la referencia original', () => {
      const primera = service.getAll();
      const segunda = service.getAll();
      expect(primera).not.toBe(segunda);
    });
  });

  describe('getActivos()', () => {
    it('debería devolver únicamente cursos activos', () => {
      const activos = service.getActivos();
      expect(activos.every((c) => c.activo)).toBe(true);
    });

    it('debería devolver al menos 1 curso activo', () => {
      expect(service.getActivos().length).toBeGreaterThan(0);
    });
  });

  describe('getInactivos()', () => {
    it('debería devolver únicamente cursos inactivos', () => {
      const inactivos = service.getInactivos();
      expect(inactivos.every((c) => !c.activo)).toBe(true);
    });

    it('debería devolver al menos 1 curso inactivo', () => {
      expect(service.getInactivos().length).toBeGreaterThan(0);
    });
  });

  describe('getById()', () => {
    it('debería encontrar un curso existente por ID', () => {
      const curso = service.getById(1);
      expect(curso).toBeDefined();
      expect(curso?.id).toBe(1);
    });

    it('debería devolver undefined para un ID inexistente', () => {
      const curso = service.getById(9999);
      expect(curso).toBeUndefined();
    });
  });

  describe('getByCategoria()', () => {
    it('debería filtrar correctamente por categoría', () => {
      const categoria: CategoriasCurso = 'Programación';
      const cursos = service.getByCategoria(categoria);
      expect(cursos.every((c) => c.categoria === categoria)).toBe(true);
    });

    it('debería devolver resultados para cada categoría del sistema', () => {
      const categorias: CategoriasCurso[] = [
        'Programación',
        'Bases de Datos',
        'Redes',
        'Inteligencia Artificial',
        'Ciberseguridad'
      ];
      categorias.forEach((cat) => {
        expect(service.getByCategoria(cat).length).toBeGreaterThan(0);
      });
    });
  });

  describe('getCategorias()', () => {
    it('debería devolver categorías únicas sin duplicados', () => {
      const categorias = service.getCategorias();
      const unicaSet = new Set(categorias);
      expect(unicaSet.size).toBe(categorias.length);
    });

    it('debería devolver las 5 categorías del sistema', () => {
      expect(service.getCategorias().length).toBe(5);
    });
  });

  describe('totales activos + inactivos', () => {
    it('debería sumar exactamente el total de cursos', () => {
      const total = service.getAll().length;
      const activos = service.getActivos().length;
      const inactivos = service.getInactivos().length;
      expect(activos + inactivos).toBe(total);
    });
  });
});
