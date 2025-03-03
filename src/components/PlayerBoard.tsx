import React, { useContext, useEffect, useState } from "react";
import createFieldArray from "../utils/createFieldArray";
import { Field } from "./Field";
import { User, field } from "../api/types";
import ApiWS from "../api/ws";
import { globalContext } from "../App";
import { getAdjacentCells } from "../utils/getAdjacentCells";

type OwnProps = {
  user: User;
  isPrepare: boolean;
};

const PlayerBoard: React.FC<OwnProps> = ({ user, isPrepare=false }) => {
  const { currentUser, currentField, setCurrentField, ships, setShips } = useContext(globalContext);
  const [field, setField] = useState<field[]>(createFieldArray());


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
        username: user.name,
        shootIndex: parseInt(id),
      },
    });
  }

  // const placeShip = (strid: string) => {
  //   let id = +strid;
  //   setCurrentField({...field[id], id, username: ""});

  //   setField(prev => {
  //     let newField = [...prev];
  //     let blockedCellIds = getAdjacentCells(id);
      
  //     if (newField[id].isShip === false) {
  //       newField[id].isShip = true;
  //       blockedCellIds.forEach(index => field[index].isShooted = true);
  //     } else {
  //       newField[id].isShip = false;
  //       blockedCellIds.forEach(index => field[index].isShooted = false);

  //       let ships = newField.map((cell, i) => {
  //         if (cell.isShip) return i;
  //       });

  //       ships.forEach(el => {
  //         if (el) {
  //           let blockedCellIds = getAdjacentCells(el);
  //           blockedCellIds.forEach(i => field[i].isShooted = true)
  //         }
  //       });
  //     }
      
  //     if (ships === 1) {
  //       newField.forEach(cell => cell.isShooted = true);

  //       return newField;
  //     }

  //     return newField;
  //   });
  // }

  const placeShip = (strid: string) => {
    let id = +strid;
    setCurrentField({ ...field[id], id, username: "" });

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
      }

      return newField;
    });
};

  useEffect(() => {
    if (ships === 0) {
      setField(prev => prev.map(cell => ({ ...cell, isShooted: true })));
    }
  }, [ships]);

  return (
    <div className="playerBoard">
      <h3 className="boardTitle">{user.name}</h3>
      <Field
        field={field} 
        onclick={isPrepare ? placeShip : shootShip} 
        isHide={isPrepare ? false : true}
      />
    </div>
  );
};

export default PlayerBoard;
