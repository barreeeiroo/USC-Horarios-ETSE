import {AjustesState} from "routes/ajustes/types";
import {SelectorAsignaturasState} from "components/selector-asignaturas/types";
import {TablaAsignaturasState} from "components/tabla-asignaturas/types";
import {HorarioState} from "routes/horario/types";
import {FabState} from "components/fab/types";

export type StoreState = {
  // Rutas
  ajustes: AjustesState,
  horario: HorarioState,

  // Componentes
  fab: FabState,
  selectorAsignaturas: SelectorAsignaturasState
  tablaAsignaturas: TablaAsignaturasState
};
