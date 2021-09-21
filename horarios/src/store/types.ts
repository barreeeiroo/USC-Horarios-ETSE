import {AjustesState} from "routes/ajustes/types";
import {SelectorAsignaturasState} from "components/selector-asignaturas/types";

export type StoreState = {
  // Rutas
  ajustes: AjustesState,

  // Componentes
  selectorAsignaturas: SelectorAsignaturasState
};
