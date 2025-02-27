import React, { useEffect, useState } from "react";
import createFieldArray from "../api/types/field";
import { field } from "../api/types";

const PrepareToGame: React.FC = () => {
  const [field, setField] = useState<field[][]>([]);

  useEffect(() => {
    setField(createFieldArray());
  }, []);

  const placeShip = (id: string) => {
    console.log(id);
  };

  return <div></div>;
};

export default PrepareToGame;
