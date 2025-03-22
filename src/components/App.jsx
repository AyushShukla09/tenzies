import Die from "./Die";
import { useState } from "react";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  let gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value)
      ? true
      : false;

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.index === id
          ? { value: die.value, isHeld: !die.isHeld, index: die.index }
          : die
      )
    );
  }

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
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={handleDiceRoll}>
        {!gameWon ? "Roll" : "New Game"}
      </button>
    </main>
  );
  function handleDiceRoll() {
    if (!gameWon) {
      setDice((dice) =>
        dice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateAllNewDice())
    }
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
