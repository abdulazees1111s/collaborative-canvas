import { canvas, ctx } from "./canvas.js";
import { socket } from "./websocket.js";

let drawing = false;
let currentStroke = null;

canvas.addEventListener("pointerdown", (e) => {
  drawing = true;
  currentStroke = {
    id: crypto.randomUUID(),
    color: document.getElementById("color").value,
    width: +document.getElementById("width").value,
    points: [{ x: e.clientX, y: e.clientY, t: Date.now() }]
  };
});

canvas.addEventListener("pointermove", (e) => {
  if (!drawing) return;

  const p = { x: e.clientX, y: e.clientY, t: Date.now() };
  const pts = currentStroke.points;
  pts.push(p);

  ctx.strokeStyle = currentStroke.color;
  ctx.lineWidth = currentStroke.width;

  ctx.beginPath();
  ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
});

canvas.addEventListener("pointerup", () => {
  drawing = false;
  socket.emit("stroke:commit", currentStroke);
});

document.getElementById("undo").onclick = () => socket.emit("undo");
document.getElementById("redo").onclick = () => socket.emit("redo");
