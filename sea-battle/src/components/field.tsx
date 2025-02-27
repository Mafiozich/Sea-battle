import React from "react";
import { field } from "../api/types";

type OwnProps = {
  field: field[][];
  placeShip: (e: string) => void;
};

export const Field: React.FC<OwnProps> = ({ field, placeShip }) => {
  let idCounter = 0;
  return (
    <div id="board">
      {field.map((row, rowIndex) => {
        return (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((cell, cellIndex) => {
              idCounter++;
              return (
                <div
                  id={idCounter.toString()}
                  key={cellIndex}
                  onClick={() => placeShip(idCounter.toString())}
                  style={{
                    width: "15px",
                    height: "15px",
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px",
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
