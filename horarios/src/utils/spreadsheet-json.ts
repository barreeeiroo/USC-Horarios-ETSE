import Asignatura from "models/asignatura";
import {Clase} from "models/clase";
import {Periodo} from "models/periodo";
import {Grupo} from "models/grupo";
import {Festivo} from "models/festivo";
import {Examen} from "models/examen";
import {Edificio} from "models/aula";

export const parsearAsignaturas = (json: any): Asignatura[] => {
  const rows = json.table.rows;
  const out: Asignatura[] = [];

  // Esta tabla por algún motivo devuelve la cabecera como una fila.
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].c;
    out.push({
      curso: row[0].v,
      abreviatura: row[3].v,
      codigo: row[1].v,
      nombre: row[2].v,
      periodo: row[4].v,
      clases: [],
      examenes: [],
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

export const parsearAulas = (json: any): Edificio[] => {
  const rows = json.table.rows;
  const out: Edificio[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].c;

    let edificio = out.find(e => e.nombre.toLowerCase() === row[2].v.toLowerCase());
    if (edificio === undefined) {
      edificio = {nombre: row[2].v, aulas: []};
      out.push(edificio);
    }

    edificio.aulas.push({
      nombre: row[0].v,
      tipo: row[1].v
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
      fin: row[3].f,
      inicio: row[2].f,
      tipo: row[1].v
    });
  }

  return out;
};

export const parsearFestivos = (json: any): Festivo[] => {
  const rows = json.table.rows;
  const out: Festivo[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].c;
    out.push({
      asignatura: row[0].v,
      tipo: row[1].v,
      dia: row[2].f
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
      fin: row[5].v + "~",
      grupo: row[2].v,
      inicio: row[4].v,
      rotacion: row[3] === null ? undefined : row[3].v,
      tipo: row[1].v
    });
  }

  return out;
};

export const parsearExamenes = (json: any): Examen[] => {
  const rows = json.table.rows;
  const out: Examen[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].c;
    out.push({
      asignatura: row[0].v,
      oportunidad: row[1].v,
      fecha: row[2].f,
      hora: row[3].f,
      aulas: row[4].v.split(" "),
    });
  }

  return out
}
