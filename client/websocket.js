import { drawStroke, redraw } from "./canvas.js";

export const socket = io();
export let operations = [];

socket.on("init", (data) => {
  operations = data.operations;
  redraw(operations);
});

socket.on("stroke:commit", (stroke) => {
  operations.push(stroke);
  drawStroke(stroke);
});

socket.on("canvas:sync", (ops) => {
  operations = ops;
  redraw(operations);
});
