import {Periodos, TiposClase} from "./enums";

export interface Periodo {
  // Se permite tipo null para almacenar los periodos académicos globales
  asignatura: string | null;
  // Se permtie almacenar Periodos para almacenar los periodos académicos globales
  tipo: TiposClase | Periodos;

  inicio?: string;
  fin?: string;
}
