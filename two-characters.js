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
 * Complete the 'alternate' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function alternate(s) {
  let template = {};
  for (let i = 0; i < s.length; i++) {
    template[s[i]] ? template[s[i]]++ : (template[s[i]] = 1);
  }
  const sorted = Object.keys(template).sort(
    (a, b) => template[a] > template[b]
  );
  let evens = [];
  for (let i = 0; i < sorted.length; i++) {
    for (let x = i + 1; x < sorted.length; x++) {
      Math.abs(template[sorted[i]] - template[sorted[x]]) <= 1
        ? evens.push([sorted[i], sorted[x]])
        : null;
    }
  }
  let max = 0;
  evens.some((even) => {
    let isFirst = null;
    let count = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === even[0]) {
        if (isFirst == null || !isFirst) {
          isFirst = true;
          count++;
        } else {
          break;
        }
      } else if (s[i] === even[1]) {
        if (isFirst == null || isFirst) {
          isFirst = false;
          count++;
        } else {
          break;
        }
      }
      if (i === s.length - 1 && count > max) {
        max = count;
      }
    }
  });
  return max;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const l = parseInt(readLine().trim(), 10);

  const s = readLine();

  const result = alternate(s);

  ws.write(result + "\n");

  ws.end();
}
