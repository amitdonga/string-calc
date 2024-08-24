import React, { useState } from "react";
import "./App.css";

function App() {
  const [string, setString] = useState("");
  const [result, setResult] = useState<null | number>(null);
  const [error, setError] = useState("");

  const handleClick = (e: any) => {
    if (string.length === 0) {
      setResult(0);
      return 0;
    }
    let delimiter = /[\n,]/;
    let numbersString = string;

    if (string.startsWith("//")) {
      const delimiterLineEnd = numbersString.indexOf("\\n");
      const customDelimiter = string.slice(2, delimiterLineEnd);
      delimiter = new RegExp(customDelimiter, "g");
      numbersString = string
        .slice(delimiterLineEnd + 2)
        .replace(/\\n/g, customDelimiter);
    } else {
      numbersString = string.replace(/\\n/g, ",");
    }

    const splitNumbers = numbersString
      .split(delimiter)
      .map((num) => num.trim());

    const negatives: number[] = [];
    const sum = splitNumbers.reduce((acc, num) => {
      const value = parseInt(num, 10);
      if (isNaN(value)) {
        return acc;
      }
      if (value < 0) {
        negatives.push(value);
        return acc;
      }
      return acc + value;
    }, 0);

    if (negatives.length > 0) {
      setError(`negative numbers not allowed ${negatives.join(", ")}`);
    }

    setResult(sum);
  };

  return (
    <div className="App">
      <h1>String Calculator</h1>
      <input
        type="text"
        id="string"
        name="string"
        placeholder="Please enter string to calculate"
        onChange={(e) => setString(e.target.value)}
      />
      <button onClick={handleClick}>Calculate</button>
      {result !== null && (
        <div>
          <h3>{`Output: ${result}`}</h3>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
