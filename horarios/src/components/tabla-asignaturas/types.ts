import Asignatura from "models/asignatura";
import {RouteComponentProps} from "react-router-dom";
import {PropsFromRedux} from "components/tabla-asignaturas/actions";

export interface TablaAsignaturasProps extends PropsFromRedux, RouteComponentProps {
  asignaturas: Asignatura[];
  cargando: boolean;
  matricula: Asignatura[];

  guardar(asignaturas: Asignatura[]): void;
}

export interface TablaAsignaturasState {
}

export type TablaAsignaturasActionTypes =
  { type: undefined, action: undefined };
