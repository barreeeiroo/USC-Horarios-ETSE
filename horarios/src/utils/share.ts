import {BD, LOCALSTORAGE_KEY} from "config";
import Asignatura from "models/asignatura";
import {request} from "utils/http";
import {
  parsearAsignaturas,
  parsearClases,
  parsearFestivos,
  parsearGrupos,
  parsearPeriodos
} from "utils/spreadsheet-json";
import {Grupo} from "models/grupo";
import {Clase} from "models/clase";
import {Periodo} from "models/periodo";
import assert from "assert";

/**
 * Indica si hay datos guardados en localStorage.
 */
export const hayMatriculaGuardada = () => {
  let datos = localStorage.getItem(LOCALSTORAGE_KEY);
  if (datos === null) return datos;
  let parse: Asignatura[] = JSON.parse(datos);
  return parse.length > 0;
}

/**
 * Devuelve el array de asignaturas, clases y grupos seleccionados, filtrando los datos
 * que hayan podido cambiar. Se eliminan las asignaturas, grupos no existentes
 * @param asignaturas valores válidos
 */
export const getMatriculaValida = (/*asignaturas: Asignatura[]*/): Asignatura[] => {
  let datosGuardados: string | null = localStorage.getItem(LOCALSTORAGE_KEY);
  if (datosGuardados === null) return [];
  let asignaturasGuardadas: Asignatura[] = JSON.parse(datosGuardados);

  /* let a = asignaturasGuardadas.length;
  while (a--) {
    let asignatura = asignaturasGuardadas[a - 1];
    let asignaturaOriginal = asignaturas.find(a => a.abreviatura === asignatura.abreviatura);
    if (asignaturaOriginal === undefined) {
      asignaturasGuardadas.splice(a, 1);
      continue;
    }

    // Actualizar datos de la asignatura, en caso de haber cambios
    asignatura = {
      ...asignatura,
      curso: asignaturaOriginal.curso,
      codigo: asignaturaOriginal.codigo,
      nombre: asignaturaOriginal.codigo,
      abreviatura: asignaturaOriginal.abreviatura,
      periodo: asignaturaOriginal.periodo
    }

    tiposClase.forEach(tipo => {
      assert(asignaturaOriginal);

      let clases: Clase[] = asignatura.clases.filter(clase => clase.tipo === tipo);

      // Extraer los grupos válidos para cada posible tipo de clase
      let gruposValidos: number[] = [];
      asignaturaOriginal.clases.filter(clase => clase.tipo === tipo).forEach(clase => {
        if (gruposValidos.indexOf(clase.grupo) === -1) gruposValidos.push(clase.grupo);
      });

      let c = clases.length;
      while (c--) {
        let clase = clases[c - 1];
        let claseOriginal = asignaturaOriginal.clases.filter(c => c.tipo === tipo && c.)
        if (gruposValidos.indexOf(clase.grupo) === -1) {
          clases.splice(c, 1);
          continue;
        }

        // TODO: No es necesario hacer esto
        // Basta con que la página de horarios descargue de nuevo los datos de las clases para los horarios
      }
    });
  } */

  return asignaturasGuardadas;
};

/**
 * Guarda la matrícula dada en localStorage
 * @param asignaturas matrícula
 */
export const guardarMatricula = (asignaturas: Asignatura[]) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(asignaturas));
};

/**
 * Genera un string para enviar información de ajustes a horarios, para que horarios luego la parsee
 * y genere el horario
 * @param asignaturas lista de asignaturas
 */
export const generarUrl = (asignaturas: Asignatura[]): string => {
  let strings: string[] = [];
  asignaturas.forEach(asignatura => {
    asignatura.clases.forEach(clase => {
      clase.grupos.forEach(grupo => {
        let str = `${asignatura.abreviatura}_${clase.tipo}_${grupo.grupo}`;
        if (grupo.rotacion) {
          str += `-${grupo.rotacion}`;
        }

        if (strings.indexOf(str) === -1) strings.push(str);
      });
    });
  });

  return btoa(strings.join(","));
};

const tieneAsignatura = (asignatura: Asignatura, asignaturas: string[]): boolean => {
  for (let i in asignaturas) {
    let datos = asignaturas[i].split("_");
    if (datos[0] === asignatura.abreviatura) {
      return true;
    }
  }
  return false;
}

const tieneClase = (clase: Clase, asignaturas: string[]): boolean => {
  for (let i in asignaturas) {
    let datos = asignaturas[i].split("_");
    if (datos[0] === clase.asignatura && datos[1] === clase.tipo) {
      let datos2 = datos[2].split("-");
      if (parseInt(datos2[0]) === clase.grupo) {
        return true;
      }
    }
  }
  return false;
};

const tieneGrupo = (grupo: Grupo, asignaturas: string[]): boolean => {
  for (let i in asignaturas) {
    let datos = asignaturas[i].split("_");
    // Se pone "-" indicando grupos globales
    if ((grupo.asignatura === "-" || datos[0] === grupo.asignatura) && datos[1] === grupo.tipo) {
      let datos2 = datos[2].split("-");
      if (parseInt(datos2[0]) === grupo.grupo &&
        ((grupo.rotacion === undefined && datos2.length === 0) || (grupo.rotacion === datos2[1]))) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Dada una string codificada en Base 64 con la función generarUrl, devuelve un array con la
 * respectiva matrícula.
 * @param b64
 */
export const generarAsignaturas = async (b64: string): Promise<Asignatura[]> => {
  const str = atob(b64);
  let strAsignaturas = str.split(",");
  let asignaturas: Asignatura[] = [];

  // Obtener las asignaturas
  parsearAsignaturas(await request(BD.ASIGNATURAS)).forEach(asignatura => {
    if (tieneAsignatura(asignatura, strAsignaturas)) asignaturas.push(asignatura);
  });

  // Obtener las clases
  parsearClases(await request(BD.CLASES)).forEach(clase => {
    let asignatura = asignaturas.find(a => a.abreviatura === clase.asignatura);
    if (asignatura !== undefined) {
      if (tieneClase(clase, strAsignaturas)) asignatura.clases.push(clase);
    }
  });

  // Obtener los grupos
  let gruposGlobales: Grupo[] = [];
  parsearGrupos(await request(BD.GRUPOS)).forEach(grupo => {
    if (grupo.asignatura === "-") {
      gruposGlobales.push(grupo);
    } else {
      let asignatura = asignaturas.find(a => a.abreviatura === grupo.asignatura);
      if (asignatura !== undefined) {
        let clases = asignatura.clases.filter(c => c.tipo === grupo.tipo && c.grupo === grupo.grupo);
        if (clases !== undefined && clases.length > 0) {
          clases.forEach(clase => {
            if (tieneGrupo(grupo, strAsignaturas)) clase.grupos.push(grupo);
          });
        }
      }
    }
  });

  // Asignar los grupos globales
  asignaturas.forEach(asignatura => {
    asignatura.clases.forEach(clase => {
      if (clase.grupos.length === 0) {
        let grupos = gruposGlobales.filter(g => g.grupo === clase.grupo && g.tipo === clase.tipo);
        grupos.forEach(grupo => {
          if (tieneGrupo(grupo, strAsignaturas)) clase.grupos.push(grupo);
        });
      }
    });
  });

  // Descargar todos los periodos
  let periodosGlobales: Periodo[] = [];
  parsearPeriodos(await request(BD.PERIODOS)).forEach(periodo => {
    if (periodo.asignatura === "-") {
      periodosGlobales.push(periodo);
    } else {
      let asignatura = asignaturas.find(a => a.abreviatura === periodo.asignatura);
      if (asignatura !== undefined) {
        asignatura.clases.filter(c => c.tipo === periodo.tipo).forEach(clase => {
          clase.periodos.push(periodo);
        });
      }
    }
  });

  // Insertar los periodos globales en las asignaturas sin periodos
  asignaturas.forEach(asignatura => {
    asignatura.clases.forEach(clase => {
      if (clase.periodos.length === 0) {
        let periodos = periodosGlobales.filter(p => asignatura.periodo === "ANG" || asignatura.periodo === p.tipo);
        periodos.forEach(periodo => clase.periodos.push(periodo));
      }
    });
  });

  // Revisar si hay periodos incompletos
  asignaturas.forEach(asignatura => {
    asignatura.clases.forEach(clase => {
      clase.periodos.forEach(periodo => {
        if (periodo.inicio === undefined) {
          let periodoGlobal = periodosGlobales.find(p => p.tipo === asignatura.periodo || (asignatura.periodo === "ANG" && p.tipo === "1SG"));
          assert(periodoGlobal !== undefined);
          periodo.inicio = periodoGlobal.inicio;
        }

        if (periodo.fin === undefined) {
          let periodoGlobal = periodosGlobales.find(p => p.tipo === asignatura.periodo || (asignatura.periodo === "ANG" && p.tipo === "2SG"));
          assert(periodoGlobal !== undefined);
          periodo.fin = periodoGlobal.fin;
        }
      });
    });
  });

  // Descargar todos los festivos que no son globales
  parsearFestivos(await request(BD.FESTIVOS, `SELECT * WHERE ${BD.FESTIVOS__ASIGNATURA}<>'-'`))
    .forEach(festivo => {
      let asignatura = asignaturas.find(a => a.abreviatura === festivo.asignatura);
      if (asignatura !== undefined) {
        asignatura.clases.filter(c => c.tipo === festivo.tipo).forEach(clase => {
          clase.festivos.push(festivo);
        });
      }
    });

  return asignaturas;
}
