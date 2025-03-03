import React, { useContext, useState } from "react";
import createFieldArray from "../utils/createFieldArray";
import { Field } from "./Field";
import { field, User } from "../api/types";
import ApiWS from "../api/ws";
import { globalContext } from "../App";
import { getAdjacentCells } from "../utils/getAdjacentCells";
import { identifyFieldCell } from "../utils/identifyFieldCell";

type OwnProps = {
  user: User;
  onclick: React.Dispatch<React.SetStateAction<number>> | null;
  isShipsEnd: number;
};

const PlayerBoard: React.FC<OwnProps> = ({ user, onclick, isShipsEnd }) => {
  const { currentUser } = useContext(globalContext);
  const [field, setField] = useState<field[][]>(createFieldArray());

  function shootShip(id: string) {
    if (!currentUser) return;
    if (currentUser.name === user.name) {
      return;
    }
    console.log({
      enemyname: user.name,
      shootId: parseInt(id),
      username: currentUser?.name,
    });

    ApiWS.invoke({
      type: "sendShoot",
      payload: {
        enemyname: user.name,
        shootId: parseInt(id),
        username: currentUser?.name,
      },
    });
  }

  const placeShip = (strid: string) => {
    let id = +strid - 1;

    setField(prev => {
      let newField = [...prev];

      let currentCell = identifyFieldCell(newField, id);
      let blockedCellIds = getAdjacentCells(id);
      
      if (currentCell.isShip === false) {
        currentCell.isShip = true;
        blockedCellIds.forEach(index => {
          let cell = identifyFieldCell(newField, index);
          cell.isShooted = true;
        });

        onclick && onclick(prev => prev - 1);
      } else {
        currentCell.isShip = false;
        blockedCellIds.forEach(index => {
          let cell = identifyFieldCell(newField, index);
          cell.isShooted = false;
        });

        onclick && onclick(prev => prev + 1);
      }

      if (isShipsEnd === 1) {
        newField.forEach(row => row.forEach(cell => cell.isShooted = true));
        return newField;
      };

      return newField;
    });
  };

  return (
    <div className="playerBoard">
      <h3 className="boardTitle">{user.name}</h3>
      <Field
        field={field} 
        onclick={onclick ? placeShip : shootShip} 
        isHide={onclick ? false : true}
      />
    </div>
  );
};

export default PlayerBoard;
