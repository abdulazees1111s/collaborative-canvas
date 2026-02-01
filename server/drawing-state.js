class DrawingState {
  constructor() {
    this.operations = [];
    this.undone = [];
  }

  addOperation(op) {
    this.operations.push(op);
    this.undone = [];
  }

  undo() {
    if (!this.operations.length) return;
    this.undone.push(this.operations.pop());
  }

  redo() {
    if (!this.undone.length) return;
    this.operations.push(this.undone.pop());
  }
}

module.exports = { DrawingState };
