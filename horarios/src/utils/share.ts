import {LOCALSTORAGE_KEY} from "config";

export const hayDatosGuardados = () => {
  return localStorage.getItem(LOCALSTORAGE_KEY) !== null;
}
