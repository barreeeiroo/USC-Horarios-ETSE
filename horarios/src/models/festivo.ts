// Técnicamente los "festivos" serían días no lectivos, pero se usarán para referenciar días sin alguna clase en
// concreto

import {TiposClase} from "models/enums";

export interface Festivo {
  asignatura: string;
  tipo: TiposClase | "-";

  dia: string;
}
