import {Periodos, TiposClase} from "./enums";

export interface Periodo {
  asignatura: string;
  // Se permtie almacenar Periodos para almacenar los periodos académicos globales
  tipo: TiposClase | Periodos;

  inicio?: string;
  fin?: string;
}
