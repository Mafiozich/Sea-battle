import { field } from "../api/types/index";

const createFieldArray = () => {
  const newField: field[] = [];
  for (let i = 0; i < 35; i++) {
      const cell = {
        isShooted: false,
        isShip: false,
      }
      newField.push(cell);
    }

  return newField;
};

export default createFieldArray;