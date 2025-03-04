import React, { useContext, useEffect, useState } from "react";
import PlayerBoard from "./PlayerBoard";
import { globalContext } from "../App";
import ApiWS from "../api/ws";

const PrepareToGame: React.FC = () => {
  const { currentUser, ships } = useContext(globalContext);
  const [IDs, setIDs] = useState<number[]>([]);

  if (!currentUser) return;

  const commitChanges = () => {
    if (IDs.length !== 5) return;
    console.log({
      type: "sendUserShips",
      payload: { shipsIndex: IDs }
    });
    ApiWS.invoke({
      type: "sendUserShips",
      payload: { shipsIndex: IDs }
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
