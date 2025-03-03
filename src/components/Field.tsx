import React from "react";
import { field } from "../api/types";
import { createClassName } from "../utils/createClassName";

type OwnProps = {
  field: field[];
  onclick: (e: string) => void;
  isHide: boolean;
};

export const Field: React.FC<OwnProps> = ({ field, onclick, isHide }) => {
  return (
    <div id="board" className="board">
      <div className="grid">
        {field.map((cell, cellIndex) => {
          return (
            <div
              id={(cellIndex).toString()}
              key={cellIndex}
              onClick={() => onclick((cellIndex).toString())}
              className={createClassName(
                "cell", cell.isShip && "occupied-cell", !cell.isShip && cell.isShooted && "blocked-cell", isHide && "disabled"
              )}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
