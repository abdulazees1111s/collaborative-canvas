export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineCap = "round";
ctx.lineJoin = "round";

export function drawStroke(stroke) {
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.width;

  ctx.beginPath();
  stroke.points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
}

export function redraw(ops) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ops.forEach(drawStroke);
}
