export interface field {
  isShooted: boolean;
  isShip: boolean;
}

export interface currentField extends field {
  username: string;     //в кого стреляют
  id: number;
}

export type User = {
  id: number;
  name: string;
  field: field[];
}

type UpdateType = "updateAuth" | "updateState" | "updateShips";

type UpdateData$Auth = {
  user: User;
}

type UpdateData$State = {
  state: User[];
}

interface UpdateData$Ships {
  currentField: currentField;
};

type UpdateDataByType = {
  "updateAuth": UpdateData$Auth;
  "updateState": UpdateData$State;
  "updateShips": UpdateData$Ships;
}

export type Update = {
  [U in UpdateType]: { type: U } & UpdateDataByType[U];
}[UpdateType];

export type UpdateHandler = (update: Update) => void;

// invoke types
type InvokeType = "sendShoot" | "sendAuth" | "sendUserShips";

type Invoke$Shoot = {
  payload: {
    [username: string]: number; 
  }
}

type Invoke$Auth = {
  payload: {
    name: string;
  }
}

type Invoke$UserShips = {
  payload: { 
    username: string
    field: number[]        // idx кораблей 
  }
}

type InvokeDataByType = {
  "sendShoot": Invoke$Shoot;
  "sendAuth": Invoke$Auth;
  "sendUserShips": Invoke$UserShips;
}

export type Invoke = {
  [I in InvokeType]: { type: I } & InvokeDataByType[I];
}[InvokeType];