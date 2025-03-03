import { field } from "../api/types";

export function identifyFieldCell(field:field[][], id: number) {
  let currentCell: field;

  if (id < 7) currentCell = field[0][id];
  else if (id < 14) currentCell = field[1][id - 7];
  else if (id < 21) currentCell = field[2][id - 14];
  else if (id < 28) currentCell = field[3][id - 21];
  else currentCell = field[4][id - 28];

  return currentCell;
}