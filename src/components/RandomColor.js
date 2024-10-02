import React, { useState, useEffect, useRef } from "react";

function RandomColor() {
  const colors = [
    { name: "Blue", code: "#0000FF" },
    { name: "Red", code: "#FF0000" },
    { name: "Purple", code: "#800080" },
    { name: "Yellow", code: "#FFFF00" },
    { name: "Pink", code: "#FFC0CB" },
  ]; // Định nghĩa 5 màu với tên và mã
  const [color, setColor] = useState("");
  const [colorName, setColorName] = useState(""); // Thêm state cho tên màu
  const [history, setHistory] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const historyRef = useRef([]);

  const changeColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length); // Chọn chỉ số ngẫu nhiên từ 0 đến 4
    const newColor = colors[randomIndex]; // Lấy màu từ mảng
    setColor(newColor.code);
    setColorName(newColor.name); // Cập nhật tên màu
    historyRef.current = [...historyRef.current, newColor.name]; // Lưu tên màu vào lịch sử
    setHistory([...historyRef.current]);
  };

  const undoColor = () => {
    if (historyRef.current.length > 0) {
      const newHistory = [...historyRef.current];
      newHistory.pop(); // Xóa màu gần nhất
      historyRef.current = newHistory;
      setHistory(newHistory);
      const lastColorName = newHistory[newHistory.length - 1] || "";
      setColor(
        colors.find((color) => color.name === lastColorName)?.code || ""
      ); // Đặt lại màu
      setColorName(lastColorName); // Đặt lại tên màu
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
      <div
        className="color-display"
        style={{
          backgroundColor: color,
          width: "100px",
          height: "100px",
          margin: "20px auto",
          border: "1px solid black",
        }}
      ></div>
      <div className="color-info">
        <div className="color-history">
          <p>Color History:</p>
          <ul>
            {history.map((name, index) => (
              <li
                key={index}
                style={{
                  color: colors.find((color) => color.name === name)?.code,
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RandomColor;
