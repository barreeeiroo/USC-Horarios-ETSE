import {BD} from "config";

export const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] as const;
export type DiasSemana = typeof diasSemana[number];

export const periodos = ["1SG", "2SG", "ANG"] as const;
export type Periodos = typeof periodos[number];

export const tiposClase = ["CLE", "CLIS", "CLIL"] as const;
export type TiposClase = typeof tiposClase[number];

export const hojas = [BD.ASIGNATURAS, BD.CLASES, BD.AULAS, BD.PERIODOS, BD.FESTIVOS, BD.GRUPOS, BD.EXAMENES] as const;
export type Hojas = typeof hojas[number];

export const cursosCardinales = ['Primer', 'Segundo', 'Tercer', 'Cuarto'];
