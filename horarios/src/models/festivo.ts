// Técnicamente los "festivos" serían días no lectivos, pero se usarán para referenciar días sin alguna clase en
// concreto

export interface Festivo {
  // Se permite poner asignatura y tipo a null para indicar festivos de la Universidad
  asignatura: string | null;
  tipo: string | null;

  dia: string;
}
