import React, { useState, useEffect, useReducer } from "react";

const rowsLength = 10;
const grid = [];

[...Array(rowsLength).keys()].forEach((i) =>
  [...Array(rowsLength).keys()].forEach((_, j) => grid.push([i, j]))
);
function App() {
  console.log(grid);
  const defaultState = [0, 0];
  const [direction, setDirection] = useState("right");
  const [position, dispatch] = useReducer(reducer, [0, 0]);
  function makeOuterStyles() {
    return {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  }

  function makeGridStyles() {
    return {
      maxWidth: (30 + 2 + 2) * rowsLength,
      maxHeight: (30 + 2 + 2) * rowsLength,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
    };
  }

  function Tile({ isActive }) {
    const styles = {
      width: "30px",
      height: "30px",
      border: "1px solid black",
      margin: "1px",
      backgroundColor: isActive && "yellow",
    };
    return <div style={styles} />;
  }

  function Row({ rowVals = [0, 0], currentPosition: [currentX, currentY] }) {
    return rowVals.map(([x, y]) => (
      <Tile key={x + y} isActive={currentX === x && currentY === y} />
    ));
  }

  function reducer([x, y]) {
    const defaultState = [0, 0];
    const [body] = document.getElementsByTagName("body");

    body.onkeydown = ({ key }) => {
      switch (direction) {
        case "right":
          return y === rowsLength - 1 ? defaultState : [x, y + 1];
        case "left":
          return y === 0 ? defaultState : [x, y - 1];
        case "up":
          return x === 0 ? defaultState : [x - 1, y];
        case "down":
          return x === rowsLength - 1 ? defaultState : [x + 1, y];
        default:
          return [0, 0];
      }
    };
  }

  useEffect(() => {
    const interval = setInterval(dispatch, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div style={makeOuterStyles()}>
      <div style={makeGridStyles()}>
        {[...Array(rowsLength).keys()].map((i) => (
          <Row
            key={i}
            rowVals={grid.slice(i * rowsLength, i * rowsLength + rowsLength)}
            currentPosition={position}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
