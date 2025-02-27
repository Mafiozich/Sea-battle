
export interface field {
  isShooted: boolean;
  isShip: boolean;
}

export interface currentField extends field {
  enemyname: string;
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
type InvokeType = "sendShoot" | "sendAuth";

type Invoke$Shoot = {
  payload: {
    username: string;
    enemyname: string;
    shootId: number;    //id в хтмл
  }
}

type Invoke$Auth = {
  payload: {
    name: string;
  }
}

type InvokeInputByType = {
  "sendShoot": Invoke$Shoot;
  "sendAuth": Invoke$Auth;
}

export type Invoke = {
  [I in InvokeType]: { type: I } & InvokeInputByType[I];
}[InvokeType];