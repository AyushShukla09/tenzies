import Die from "./Die";
import { useState } from "react";

export default function App() {
  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.index === id
          ? { value: die.value, isHeld: !die.isHeld, index: die.index }
          : die
      )
    );
  }

  const [dice, setDice] = useState(generateAllNewDice());

  const diceElements = dice.map((num) => (
    <Die
      value={num.value}
      key={num.index}
      isHeld={num.isHeld}
      hold={hold}
      id={num.index}
    />
  ));
  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={handleDiceRoll}>
        Roll
      </button>
    </main>
  );
  function handleDiceRoll() {
    setDice(generateAllNewDice());
  }
}

function generateAllNewDice() {
  const arr = [];
  let val = 0;
  for (let i = 0; arr.length < 10; i++) {
    val = Math.ceil(Math.random() * 6);
    if (val == 0) {
      continue;
    }
    arr.push({ value: val, isHeld: false, index: i });
  }
  return arr;
}
