import React, { useState, useEffect, useRef } from "react";

function RandomColor() {
  const [color, setColor] = useState("");
  const [history, setHistory] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const historyRef = useRef([]);

  const changeColor = () => {
    const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(newColor);
    historyRef.current = [...historyRef.current, newColor];
    setHistory([...historyRef.current]);
  };

  const undoColor = () => {
    if (historyRef.current.length > 0) {
      const newHistory = [...historyRef.current];
      newHistory.pop();
      historyRef.current = newHistory;
      setHistory(newHistory);
      setColor(newHistory[newHistory.length - 1] || "");
    }
  };

  const startAutoChange = () => {
    if (!intervalId) {
      const id = setInterval(changeColor, 1000);
      setIntervalId(id);
    }
  };

  const stopAutoChange = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="random-color">
      <h2>Random Color</h2>
      <button onClick={changeColor}>Change Background Color</button>
      <button onClick={undoColor} disabled={history.length === 0}>
        Undo
      </button>
      <button onClick={stopAutoChange} disabled={!intervalId}>
        Stop Auto Change
      </button>
      <button onClick={startAutoChange} disabled={intervalId}>
        Start Auto Change
      </button>
      <div className="color-display" style={{ backgroundColor: color }}></div>
      <div className="color-info">
        <div className="current-color">
          <p>Current Color:</p>
          <div className="color-box" style={{ backgroundColor: color }}></div>
        </div>
        <div className="color-history">
          <p>Color History:</p>
          <ul>
            {history.map((color, index) => (
              <li key={index} style={{ color: color }}>
                {color}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RandomColor;
