"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'abbreviation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function isLowerCase(string) {
  return string == string.toLowerCase() && string != string.toUpperCase();
}

function isUpperCase(value) {
  for (let i = 0; i < value.length; i++) {
    if (!isLowerCase(value.substr(i, 1))) {
      return true;
    }
  }
  return false;
}

function abbreviation(a, b) {
  let isValid = true;
  b.split("").forEach((value) => {
    let index = a.indexOf(value);
    if (index == -1) {
      index = a.indexOf(value.toLowerCase());
    }
    if (index == -1) {
      isValid = false;
    }
    if (isUpperCase(a.substr(0, index))) {
      isValid = false;
    }
    a = a.substr(index + 1);
  });

  if (isUpperCase(a)) {
    isValid = false;
  }

  if (isValid) {
    return "YES";
  } else {
    return "NO";
  }
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const a = readLine();

    const b = readLine();

    const result = abbreviation(a, b);

    ws.write(result + "\n");
  }

  ws.end();
}
