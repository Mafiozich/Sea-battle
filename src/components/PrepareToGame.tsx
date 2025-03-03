import React, { useContext, useEffect, useState } from "react";
import PlayerBoard from "./PlayerBoard";
import { globalContext } from "../App";

const PrepareToGame: React.FC = () => {
  const { currentUser, ships } = useContext(globalContext);

  if (!currentUser) return;

  return (
    <div className="prepare-container">
      <PlayerBoard user={currentUser} isPrepare />
      <div className="ship-placement-block">
        <h3>Ships: <span>{ships}</span>X</h3>
        <button>Начать игру</button>
      </div>
    </div>
  );
};

export default PrepareToGame;
