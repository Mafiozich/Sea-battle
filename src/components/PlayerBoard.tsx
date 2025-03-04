import React, { use, useContext, useEffect, useState } from "react";
import createFieldArray from "../utils/createFieldArray";
import { Field } from "./Field";
import { User, field } from "../api/types";
import ApiWS from "../api/ws";
import { globalContext } from "../App";
import { getAdjacentCells } from "../utils/getAdjacentCells";
import { createClassName } from "../utils/createClassName";

type OwnProps = {
  user: User;
  isPrepareNow?: boolean;
  setIDs?:  React.Dispatch<React.SetStateAction<number[]>>;
};

const PlayerBoard: React.FC<OwnProps> = ({ user, setIDs, isPrepareNow=false }) => {
  const {currentUser, currentField, ships, setShips} = useContext(globalContext);
  const [field, setField] = useState<field[]>(createFieldArray());

  const shootShip = (id: string) => {
    // if (!currentUser || (gameState && currentUser.name !== gameState.players[gameState.currentPlayerIndex].name))
    if (!currentUser) return;

    if (user.name === currentUser.name) {
      alert("Нельзя стрелять в себя!");
      return;
    }

    ApiWS.invoke({
      type: "sendShoot",
      payload: {
        username: user.name,
        shootIndex: parseInt(id),
      },
    });
    console.log({
      type: "sendShoot",
      payload: {
        username: user.name,
        shootIndex: parseInt(id),
      },
    });
    //setCurrentField({ ...field[+id], id: +id, username: user.name, isShooted: true});   по сути это происходит на беке
  };

  useEffect(() => {
    setField(prev => {
      let updatedField = [...prev];
      
      if (currentField 
        && currentField.id 
        && user.name === currentField.username) {
          let field = updatedField[+currentField.id];
          field.isShooted = true;
          field.isShip = currentField.isShip;
        }

      return updatedField;
    });

    return () => {}
  }, [currentField])

  const placeShip = (strid: string) => {
    let id = +strid;
    if (!setIDs) return;

    setField((prev) => {
      const newField = prev.map(cell => ({ ...cell })); // Создаем глубокую копию
      const blockedCellIds = getAdjacentCells(id);

      if (!newField[id].isShip) {
        // Добавление корабля
        newField[id].isShip = true;
        blockedCellIds.forEach(index => {
          if (newField[index]) newField[index].isShooted = true;
        });
        setShips(prevShips => prevShips - 1);

        setIDs(p => [...p, id]);
      } else {
        newField[id].isShip = false;
        newField.forEach(cell => cell.isShooted = false);
        
        newField.forEach((cell, i) => {
          if (cell.isShip) {
            getAdjacentCells(i).forEach(index => {
              if (newField[index]) newField[index].isShooted = true;
            });
          }
        });
        
        setShips(prevShips => prevShips + 1);

        setIDs(p => {
          let newState = [...p];
          newState.pop();
          return newState;
        });
      }
      return newField;
    });
};

  useEffect(() => {
    if (ships === 0) {
      setField(prev => prev.map(cell => ({ ...cell, isShooted: true })));
    }

    return () => {}
  }, [ships]);

  return (
    <div className="playerBoard">
      <h3 className="boardTitle">{user.name}</h3>

      <Field
        field={field} 
        onclick={isPrepareNow ? placeShip : shootShip} 
        isHide={isPrepareNow ? false : true}
      />

      {!isPrepareNow && <h4 className={createClassName("playerTurn", 1 && "disabledTurn")}>Твой ход</h4>}
    </div>
  );
};

export default PlayerBoard;