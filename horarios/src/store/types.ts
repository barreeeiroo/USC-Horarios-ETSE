import {AjustesState} from "routes/ajustes/types";
import {SelectorAsignaturasState} from "components/selector-asignaturas/types";
import {TablaAsignaturasState} from "components/tabla-asignaturas/types";

export type StoreState = {
  // Rutas
  ajustes: AjustesState,

  // Componentes
  selectorAsignaturas: SelectorAsignaturasState
  tablaAsignaturas: TablaAsignaturasState
};
