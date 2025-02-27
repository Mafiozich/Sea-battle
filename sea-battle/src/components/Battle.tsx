import React, { useEffect } from "react";

let penis: number = 0;
function Battle() {
  useEffect(() => {
    let count: number = 0;
    let board = document.getElementById("board");

    if (board) {
      for (let i = 0; i < 5; i++) {
        let trtrtr: HTMLElement = document.createElement("tr");
        // tr
        for (let j = 0; j < 7; j++) {
          count++;
          // td
          let tdtdtd: HTMLElement = document.createElement("td");
          tdtdtd.id = count.toString();
          console.log(tdtdtd.id);
          tdtdtd.textContent = tdtdtd.id;
          trtrtr.appendChild(tdtdtd);
        }
        board.appendChild(trtrtr);
      }
    }
    penis++;
    console.log(penis);
  });

  return (
    <table id="board">
      <tbody>
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

export default Battle;
