export const busquedaAlfanumerica = (str: string) => {
  return str.toLowerCase()
    .replace("á", "a")
    .replace("é", "e")
    .replace("í", "i")
    .replace("ó", "o")
    .replace("ú", "u");
};
