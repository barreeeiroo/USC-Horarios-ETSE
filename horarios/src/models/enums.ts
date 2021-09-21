export const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] as const;
export type DiasSemana = typeof diasSemana[number];

export const periodos = ["1SG", "2SG", "ANG"] as const;
export type Periodos = typeof periodos[number];

export const tiposClase = ["CLE", "CLIS", "CLIL"] as const;
export type TiposClase = typeof tiposClase[number];

export const hojas = ["ASIGNATURAS", "CLASES", "PERIODOS", "FESTIVOS", "GRUPOS"] as const;
export type Hojas = typeof hojas[number];
