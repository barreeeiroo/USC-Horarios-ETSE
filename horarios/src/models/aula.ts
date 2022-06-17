export interface Edificio {
  nombre: string;
  aulas: Aula[];
}

export interface Aula {
  nombre: string;
  tipo: string;
}
