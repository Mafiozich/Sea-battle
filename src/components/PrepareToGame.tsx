import React, { useContext, useEffect, useState } from "react";
import PlayerBoard from "./PlayerBoard";
import { globalContext } from "../App";
import ApiWS from "../api/ws";
import createFieldArray from "../utils/createFieldArray";

const PrepareToGame: React.FC = () => {
  const { currentUser, setCurrentUser, ships } = useContext(globalContext);
  const [IDs, setIDs] = useState<number[]>([]);

  if (!currentUser) return;

  const commitChanges = () => {
    if (IDs.length !== 5) return;
    ApiWS.invoke({
      type: "sendUserShips",
      payload: { username: currentUser.name, field: IDs }
    });

    setCurrentUser(prev => {
      if (!prev) return null;
      let fieldWithShips = createFieldArray();
      fieldWithShips.forEach((cell, index) => IDs.includes(index) ? cell.isShip = true : null);

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      return { ...prev, field: fieldWithShips }
    });
  }

  return (
    <div className="prepare-container">
      <PlayerBoard user={currentUser} setIDs={setIDs} isPrepareNow />
      <div className="ship-placement-block">
        <h3>Ships: <span>{ships}</span>X</h3>
        <button onClick={commitChanges}>Начать игру</button>
      </div>
    </div>
  );
};

export default PrepareToGame;
