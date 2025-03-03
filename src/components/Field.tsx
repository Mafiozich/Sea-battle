import React from "react";
import { field } from "../api/types";
import { createClassName } from "../utils/createClassName";

type OwnProps = {
  field: field[][];
  onclick: (e: string) => void;
  isHide: boolean;
};

export const Field: React.FC<OwnProps> = ({ field, onclick, isHide }) => {
  return (
    <div id="board" className="board">
      {field.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => {
              return (
                <div
                  id={(cellIndex + 1 + rowIndex * 7).toString()}
                  key={cellIndex}
                  
                  onClick={() =>
                    onclick((cellIndex + 1 + rowIndex * 7).toString())
                  }
                  className={createClassName("cell", cell.isShip && "occupied-cell", cell.isShooted && !cell.isShip && "blocked-cell", isHide && "disabled")}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
