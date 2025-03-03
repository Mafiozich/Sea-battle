import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from "axios"
import { currentField, field, UpdateHandler, User } from './api/types';
import ApiWS from "./api/ws"

import './styles.css';
import createFieldArray from './utils/createFieldArray';
import { Field } from './components/Field';
import PlayerBoard from './components/PlayerBoard';
import PrepareToGame from './components/PrepareToGame';

type GlobalCtx = {
  currentUser: User | null;
  currentField: currentField | null;
  setCurrentField: React.Dispatch<React.SetStateAction<currentField | null>>;
  ships: number;
  setShips: React.Dispatch<React.SetStateAction<number>>;
}

export const globalContext = React.createContext<GlobalCtx>({
  currentUser: null,
  currentField: null,
  setCurrentField: () => void 0,
  ships: 0,
  setShips: () => void 0,
});

const App = () => {
  let globalState: User[] = [
    {
      id: 1,
      name: "Muhma",
      field: [],
    },
    {
      id: 2,
      name: "Sega",
      field: [],
    },
    {
      id: 3,
      name: "Masim",
      field: [],
    },
  ];

  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 1,
    name: "Muhma",
    field: [],
  });
  const [currentField, setCurrentField] = useState<currentField | null>(null);
  const [ships, setShips] = useState(5);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    //const serverIp = prompt("Enter server ip");
    //const username = prompt("Enter your name");
  });

  useEffect(() => {
    const updateHandler: UpdateHandler = (update) => {
      switch (update.type) {
        case "updateAuth":
          localStorage.setItem("currentUser", JSON.stringify(update.user));
          setCurrentUser(update.user);
          break;
        case "updateState":
          globalState = update.state;
          break;
        case "updateShips":
          let shootedUser = globalState.find(user => user.name === update.currentField.username);
          
          if (shootedUser) {
            let shootedField = shootedUser.field[update.currentField.id]
            shootedField.isShooted = update.currentField.isShooted;
            setCurrentField(update.currentField);
          }
          break;
      }
    }

    ApiWS.onUpdate(updateHandler);
    
    return () => {
      ApiWS.offUpdate(updateHandler);
    }
  }, [currentUser]);
  
  return (
    <globalContext.Provider value={{
      currentField: currentField,
      setCurrentField: setCurrentField,
      currentUser: currentUser,
      ships: ships,
      setShips: setShips, 
    }}>
      <>
        <h1 className="mainTitle">Морской бой</h1>
        <div className="container">
          {/* {globalState.map((user) => (
            <PlayerBoard user={user} key={user.id}/>
          ))} */}
          <PrepareToGame />
        </div>
      </>
    </globalContext.Provider>
  );
};

export default App;