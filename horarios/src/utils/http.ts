import {Hojas} from "models/enums";
import {SPREADSHEET_ID} from "config";

function parsearRespuesta(text: string) {
  text = text.replace("/*O_o*/\n", "");
  text = text.replace(/(^google\.visualization\.Query\.setResponse\(|\);$)/gm,'');
  return JSON.parse(text);
}

export const request = async (hoja: Hojas, query?: string) => {
  let url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${hoja}`;
  if (query !== undefined) {
    url += `&tq=${encodeURI(query)}`;
  }

  let res = await fetch(url);
  let text = await res.text();

  return parsearRespuesta(text);
};
