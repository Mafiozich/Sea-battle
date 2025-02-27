import React from "react";
import { field } from "../api/types";

type OwnProps = {
  field: field[][];
  placeShip: (e: string) => void;
};

export const Field: React.FC<OwnProps> = ({ field, placeShip }) => {
  return (
    <div id="board" className="board">
      {field.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => {
              return (
                <div
                  id={(cellIndex + 1 + (rowIndex * 7)).toString()}
                  key={cellIndex}
                  onClick={() => placeShip((cellIndex + 1 + (rowIndex * 7)).toString())}
                  className="cell"
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
