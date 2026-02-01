const { DrawingState } = require("./drawing-state");

class Room {
  constructor(id) {
    this.id = id;
    this.state = new DrawingState();
    this.users = {};
  }

  addUser(userId) {
    this.users[userId] = {
      id: userId,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`
    };
  }

  removeUser(userId) {
    delete this.users[userId];
  }

  commitStroke(stroke) {
    this.state.addOperation(stroke);
  }
}

class RoomManager {
  constructor() {
    this.rooms = {};
  }

  getRoom(id) {
    if (!this.rooms[id]) {
      this.rooms[id] = new Room(id);
    }
    return this.rooms[id];
  }
}

module.exports = { RoomManager };
