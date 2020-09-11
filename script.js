const grid = document.querySelector(".grid");
const divArray = document.querySelectorAll(".piece");
const score = document.getElementById("score");
const status = document.getElementById("status");
let gameArray = [];

const initGame = () => {
  for (let i = 0; i < 16; i++) gameArray.push(0);
};

const generateRandom = () => {
  try {
    const randomNumber = Math.floor(Math.random() * divArray.length);
    if (gameArray[randomNumber] === 0)
      (gameArray[randomNumber] = 2), updateUI();
    else generateRandom();
  } catch (error) {
    status.innerHTML = "You Loose";
  }
};

const handleRow = (type, isFirst = true) => {
  for (let i = 0; i < 16; i += 4) {
    let one = gameArray[i];
    let two = gameArray[i + 1];
    let three = gameArray[i + 2];
    let four = gameArray[i + 3];
    const row = [one, two, three, four];
    let filteredRow = row.filter((num) => num);
    let missing = Array(4 - filteredRow.length).fill(0);

    let newRow = [];

    switch (type) {
      case "Right":
        newRow = missing.concat(filteredRow);
        break;
      case "Left":
        newRow = filteredRow.concat(missing);
        break;

      default:
        break;
    }

    gameArray[i] = newRow[0];
    gameArray[i + 1] = newRow[1];
    gameArray[i + 2] = newRow[2];
    gameArray[i + 3] = newRow[3];

    if (isFirst) combineNumbers([i, i + 1, i + 2, i + 3], type);
  }
};

const handleColumn = (type, isFirst) => {
  for (let i = 0; i < 4; i++) {
    let one = gameArray[i];
    let two = gameArray[i + 4 * 1];
    let three = gameArray[i + 4 * 2];
    let four = gameArray[i + 4 * 3];
    const column = [one, two, three, four];
    let filteredRow = column.filter((num) => num);
    let missing = Array(4 - filteredRow.length).fill(0);

    let newRow = [];

    switch (type) {
      case "Down":
        newRow = missing.concat(filteredRow);
        break;
      case "Up":
        newRow = filteredRow.concat(missing);
        break;

      default:
        break;
    }

    gameArray[i] = newRow[0];
    gameArray[i + 4 * 1] = newRow[1];
    gameArray[i + 4 * 2] = newRow[2];
    gameArray[i + 4 * 3] = newRow[3];

    if (isFirst) combineNumbers([i, i + 4 * 1, i + 4 * 2, i + 4 * 3], type);
  }
};

const combineNumbers = (arr, type) => {
  let x, y;
  switch (type) {
    case "Right":
    case "Down":
      x = 0;
      y = 1;

      for (let i = 3; i >= 0; i--) {
        if (
          gameArray[arr[i + x]] === gameArray[arr[i + y]] &&
          gameArray[arr[i + x]] !== 0
        ) {
          gameArray[arr[i + y]] = gameArray[arr[i + x]] + gameArray[arr[i + y]];
          score.innerHTML = parseInt(score.innerHTML) + gameArray[arr[i + x]];
          gameArray[arr[i + x]] = 0;
          if (type === "Right") handleRow(type, false);
          else handleColumn(type, false);
        }
      }
      break;
    case "Left":
    case "Up":
      x = 1;
      y = 0;
      for (let i = 0; i < 3; i++) {
        if (
          gameArray[arr[i + x]] === gameArray[arr[i + y]] &&
          gameArray[arr[i + x]] !== 0
        ) {
          gameArray[arr[i + y]] = gameArray[arr[i + x]] + gameArray[arr[i + y]];
          score.innerHTML = parseInt(score.innerHTML) + gameArray[arr[i + x]];
          gameArray[arr[i + x]] = 0;

          if (type === "Left") handleRow(type, false);
          else handleColumn(type, false);
        }
      }
      break;

    default:
      break;
  }
};

const updateUI = () => {
  for (let i = 0; i < 16; i++) {
    const element = document.getElementById(i);
    if (gameArray[i]) {
      element.innerHTML = gameArray[i];
      element.style.backgroundColor = pickColor(gameArray[i]);
    } else {
      element.style.removeProperty("background-color");
      element.innerHTML = "";
    }
  }
  if (gameArray.includes(2048)) {
    document.removeEventListener("keyup", handleKeyBoradEvent);
    status.innerHTML = "You Won";
  }
};
const pickColor = (num) => {
  switch (num) {
    case 2:
      return "white";
    case 4:
      return "coral";
    case 8:
      return "cyan";
    case 16:
      return "royalblue";
    case 32:
      return "slateblue";
    case 64:
      return "chocolate";
    case 128:
      return "maroon";
    case 256:
      return "mediumseagreen";
    case 512:
      return "springgreen";
    case 1024:
      return "darkorange";
    case 2048:
      return "hotpink";
    default:
      break;
  }
};

const handleKeyBoradEvent = (event) => {
  switch (event.key) {
    case "ArrowRight":
      handleRow("Right", true);
      generateRandom();
      break;
    case "ArrowLeft":
      handleRow("Left", true);
      generateRandom();
      break;
    case "ArrowDown":
      handleColumn("Down", true);
      generateRandom();
      break;
    case "ArrowUp":
      handleColumn("Up", true);
      generateRandom();
      break;
    default:
      break;
  }
};

document.addEventListener("keyup", handleKeyBoradEvent);

initGame();
generateRandom();
generateRandom();
