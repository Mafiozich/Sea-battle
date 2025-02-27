import React from "react";
import createFieldArray from "../utils/createFieldArray";
import { Field } from "./Field";
import { User } from "../api/types";

type OwnProps = {
  user: User;
}

const PlayerBoard: React.FC<OwnProps> = ({ user }) => (
  <div className="playerBoard">
      <h3 className="boardTitle">{user.name}</h3>
      <Field 
          field={createFieldArray()} 
          placeShip={console.log} 
      />
  </div>
);

export default PlayerBoard;