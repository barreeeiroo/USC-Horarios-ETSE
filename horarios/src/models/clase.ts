import {DiasSemana, TiposClase} from "./enums";
import {Grupo} from "./grupo";
import {Festivo} from "./festivo";
import {Periodo} from "./periodo";

export interface Clase {
  asignatura: string;
  dia: DiasSemana;
  inicio: string;
  fin: string;
  // TODO(diego@kodular.io): Es necesario?
  grupo: number;

  aula?: string;
  tipo: TiposClase;

  grupos: Grupo[];
  periodos: Periodo[];
  festivos: Festivo[];
}
