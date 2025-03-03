import React, { useContext, useEffect, useState } from "react";
import PlayerBoard from "./PlayerBoard";
import { globalContext } from "../App";
import { field } from "../api/types";

const PrepareToGame: React.FC = () => {
  const { currentUser } = useContext(globalContext);
  const [ships, setShips] = useState(5);

  if (!currentUser) return;

  return (
    <div className="prepare-container">
      <PlayerBoard user={currentUser} onclick={setShips} isShipsEnd={ships} />
      <div className="ship-placement-block">
        <h3>Ships: <span>{ships}</span>X</h3>
        <button>Начать игру</button>
      </div>
    </div>
  );
};

export default PrepareToGame;
