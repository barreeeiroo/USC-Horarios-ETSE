import {BD} from "config";
import {Hojas} from "models/enums";

// TODO(diego@kodular.io): Acabar esto de una p*** vez
// TODO(diego@kodular.io): Quizás un posible return para cada tabla?
export const parsear = (json: any, sheet: Hojas) => {
  const table = json.table;
  const columns = table.cols, rows = table.rows;

  console.log(columns, rows);

  const out = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].c;

    const rowOut: any = {};
    for (let j = 0; j < row.length; j++) {
      switch (typeof row[j].v) {
        case "string":
        case "number":
          break;
        default:
          break;
      }
    }
    out.push(rowOut);
  }

  return out;
};
