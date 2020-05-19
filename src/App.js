import React, { useState, useEffect } from "react";

const rowsLength = 10;
const grid = [];
[...Array(rowsLength).keys()].forEach((i) =>
  [...Array(rowsLength).keys()].forEach((_, j) => grid.push([i, j]))
);

function App() {
  const [position, setposition] = useState([0, 0]);
  return (
    <div style={makeOuterStyles()}>
      <div style={makeGridStyles()}></div>
    </div>
  );

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
}
export default App;
