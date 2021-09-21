import {TiposClase} from "./enums";

export interface Grupo {
  asignatura: string;
  tipo: TiposClase;
  grupo: number;
  rotacion?: string;

  inicio: string;
  fin: string;
}
