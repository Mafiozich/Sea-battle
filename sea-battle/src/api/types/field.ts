import { field } from "./index";

export type FieldMatrix = field[][];

const createFieldArray = () => {
  let count = 0;
  const newField: FieldMatrix = [];
  for (let i = 0; i < 7; i++) {
    const row: field[] = [];
    for (let j = 1; j < 6; j++) {
      const column = {
        isShooted: false,
        isShip: false,
      };
      row.push(column);
    }
    newField.push(row);
  }

  return newField;
};

export default createFieldArray;
