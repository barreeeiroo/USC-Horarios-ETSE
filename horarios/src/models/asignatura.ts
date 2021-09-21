import {Periodos} from "./enums";
import {Clase} from "./clase";

export default interface Asignatura {
  codigo: string;
  nombre: string;
  abreviatura: string;
  periodo: Periodos;

  clases: Clase[];
}
