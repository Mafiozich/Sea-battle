import { field } from "../api/types/index";

export type FieldMatrix = field[][];

const createFieldArray = () => {
  const newField: FieldMatrix = [];
  for (let i = 0; i < 5; i++) {
    const row: field[] = [];
    for (let j = 0; j < 7; j++) {
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