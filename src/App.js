import React, { useState, useEffect } from "react";

const rowsLength = 10;
const grid = [];
[...Array(rowsLength).keys()].forEach((i) =>
  [...Array(rowsLength).keys()].forEach((_, j) => grid.push([i, j]))
);

function App() {
  const [position, setposition] = useState([0, 0]);
  const [direction, setDirection] = useState("right");
  useEffect(() => {
    const [body] = document.getElementsByTagName("body");
    body.onkeydown = ({ key }) => {
      switch (key) {
        case "ArrowUp":
          return setDirection("up");
        case "ArrowDown":
          return setDirection("down");
        case "ArrowLeft":
          return setDirection("left");
        case "ArrowRight":
          return setDirection("right");
      }
    };
  }, []);
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

  function Row({ rowVals, currentPosition: [currentX, currentY] }) {
    return rowVals.map(([x, y]) => (
      <Tile key={x + y} isActive={currentX === x && currentY === y} />
    ));
  }

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
}
export default App;
