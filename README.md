# Multi-User Drawing Application

A real-time collaborative drawing canvas built using the raw HTML Canvas API, Node.js, and WebSockets (Socket.io).

---

## Setup Instructions

### Prerequisites
- Node.js v18 or higher
- npm (included with Node.js)

### Install & Run

npm install
npm start

The application will be available at:
http://localhost:3000

---

## How to Test with Multiple Users

1. Open http://localhost:3000 in two or more browsers
2. Example: Chrome + Firefox or normal + incognito
3. Draw in one window
4. Changes appear instantly in all other windows
5. Undo / Redo works globally across all users

---

## Known Limitations / Bugs

- No persistent storage (canvas resets on server restart)
- Single room only
- No authentication
- Limited drawing tools (brush only)
- No remote cursor indicators

---

## Time Spent on the Project

Approximately 12–15 hours including:
- System design
- Canvas rendering
- WebSocket protocol
- Undo/Redo logic
- Deployment and documentation
