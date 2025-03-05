import React, { useEffect, useState } from 'react';
import { currentField, UpdateHandler, User } from './api/types';
import ApiWS from "./api/ws"

import './styles.css';
import PrepareToGame from './components/PrepareToGame';
import PlayerBoard from './components/PlayerBoard';
import { createClassName } from './utils/createClassName';

type gameStateType = {
  players: User[],
  currentPlayerIndex: number;
}

type GlobalCtx = {
  ships: number;
  setShips: React.Dispatch<React.SetStateAction<number>>;
  
  currentUser: User | null;
  currentField: currentField | null;

  setCurrentField: React.Dispatch<React.SetStateAction<currentField | null>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const globalContext = React.createContext<GlobalCtx>({
  ships: 0,
  currentUser: null,
  currentField: null,
  setShips: () => void 0,
  setCurrentField: () => void 0,
  setCurrentUser: () => void 0,
});

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentField, setCurrentField] = useState<currentField | null>(null);
  const [ships, setShips] = useState(5);
  const [gameState, setGameState] = useState<gameStateType>({
    players: [], 
    currentPlayerIndex: 0
  });

  //const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    let user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
      return;
    }

    //let serverIp = prompt("Enter server ip");
    //while (!serverIp?.trim()) serverIp = prompt("Enter server ip");

    //let username = prompt("Enter your name");
    //while (!username?.trim()) username = prompt("Enter ypur name");
    
    //ApiWS.setServerIp(serverIp);
    //ApiWS.invoke({type: 'sendAuth', payload: {name: username}});
  });

  useEffect(() => {
    const updateHandler: UpdateHandler = (update) => {
      switch (update.type) {
        case "updateAuth":
          localStorage.setItem("currentUser", JSON.stringify(update.user));
          setCurrentUser(update.user);
          break;
        case "updateState":
          setGameState(prev => ({...prev, players: update.state}));
          break;
        case "updateShips":
          let shootedUser = gameState.players.find(user => user.name === update.currentField.username);

          if (shootedUser) {
            setCurrentField(update.currentField);
            switchToNextPlayer();
          }
          break;
      }
    }

    ApiWS.onUpdate(updateHandler);
    
    return () => {
      ApiWS.offUpdate(updateHandler);
    }
  }, [currentUser]);

  const switchToNextPlayer = () => {
    setGameState(prev => ({
      ...prev,
      currentPlayerIndex: (prev.currentPlayerIndex + 1) % 3
    }));
  };

  if (gameState.players.length !== 3) {
    //return <h1 className="playersIndicator">{gameState.players.length}/3</h1>
  }
  
  return (
    <globalContext.Provider value={{
      ships: ships,
      setShips: setShips, 
      currentUser: currentUser,
      currentField: currentField,
      setCurrentUser: setCurrentUser,
      setCurrentField: setCurrentField,
    }}>
      <>
        <h1 className="mainTitle">Морской бой</h1>
        <div className={createClassName("container", currentUser?.field !== undefined
            && gameState.players.length !== 3
            && "gameStopped")
          }>

          {currentUser?.field.length === 0
            ? <PrepareToGame /> 
            : gameState.players.map((user) => (
              <PlayerBoard user={user} key={user.id} />
            ))
          }
        </div>
      </>
    </globalContext.Provider>
  );
};

export default App;