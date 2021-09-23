import {AjustesState} from "routes/ajustes/types";
import {SelectorAsignaturasState} from "components/selector-asignaturas/types";
import {TablaAsignaturasState} from "components/tabla-asignaturas/types";
import {HorarioState} from "routes/horario/types";

export type StoreState = {
  // Rutas
  ajustes: AjustesState,
  horario: HorarioState,

  // Componentes
  selectorAsignaturas: SelectorAsignaturasState
  tablaAsignaturas: TablaAsignaturasState
};
