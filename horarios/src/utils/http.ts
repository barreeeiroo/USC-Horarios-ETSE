import {Hojas} from "models/enums";
import {SPREADSHEET_ID} from "config";

export const request = async (hoja: Hojas, query?: string) => {
  let url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${hoja}`;
  if (query !== undefined) {
    url += `&tq=${encodeURI(query)}`;
  }

  let res = await fetch(url);
  return res.json();
};
