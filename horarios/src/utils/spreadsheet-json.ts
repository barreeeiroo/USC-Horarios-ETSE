import Asignatura from "models/asignatura";
import {Clase} from "models/clase";
import {Periodo} from "models/periodo";
import {Grupo} from "models/grupo";

export const parsearAsignaturas = (json: any): Asignatura[] => {
  const rows = json.table.rows;
  const out: Asignatura[] = [];

  // Esta tabla por algún motivo devuelve la cabecera como una fila.
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].c;
    out.push({
      curso: row[0].v,
      abreviatura: row[3].v,
      clases: [],
      codigo: row[1].v,
      nombre: row[2].v,
      periodo: row[4].v
    });
  }

  return out;
};

export const parsearClases = (json: any): Clase[] => {
  const rows = json.table.rows;
  const out: Clase[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].c;
    out.push({
      asignatura: row[0].v,
      aula: row[4].v,
      dia: row[1].v,
      festivos: [],
      fin: row[3].f,
      grupo: row[6].v,
      grupos: [],
      inicio: row[2].f,
      periodos: [],
      tipo: row[5].v
    });
  }

  return out;
};

export const parsearPeriodos = (json: any): Periodo[] => {
  const rows = json.table.rows;
  const out: Periodo[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].c;
    out.push({
      asignatura: row[0].v,
      fin: row[2].f,
      inicio: row[3].f,
      tipo: row[1].v
    });
  }

  return out;
};

export const parsearGrupos = (json: any): Grupo[] => {
  const rows = json.table.rows;
  const out: Grupo[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].c;
    out.push({
      asignatura: row[0].v,
      fin: row[5].v,
      grupo: row[2].v,
      inicio: row[4].v,
      rotacion: row[3] === null ? undefined : row[3].v,
      tipo: row[1].v
    });
  }

  return out;
};
