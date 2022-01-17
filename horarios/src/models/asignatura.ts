import {Periodos} from "./enums";
import {Clase} from "./clase";
import {Examen} from "./examen";

export default interface Asignatura {
  curso: number;
  codigo: string;
  nombre: string;
  abreviatura: string;
  periodo: Periodos;

  clases: Clase[];
  examenes: Examen[];
}
