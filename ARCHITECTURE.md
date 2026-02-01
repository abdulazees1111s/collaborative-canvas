# Architecture Overview

This document explains the system design and technical decisions.

---

## Data Flow Diagram

User Pointer Event
?
Client Canvas (Optimistic Rendering)
?
WebSocket Event (stroke:commit)
?
Server (Authoritative State)
?
Broadcast to Clients
?
Canvas Redraw

---

## WebSocket Protocol

### Client ? Server
- stroke:commit
- undo
- redo

### Server ? Client
- init
- stroke:commit
- canvas:sync

---

## Undo / Redo Strategy

- Server stores an ordered list of stroke operations
- Undo removes the last global stroke
- Redo restores the last undone stroke
- Canvas is re-rendered from operations

---

## Performance Decisions

- Raw Canvas API for maximum performance
- Optimistic local rendering to avoid latency
- Operation-based synchronization instead of pixel syncing

---

## Conflict Resolution

- No locking mechanism
- Multiple users can draw simultaneously
- Server commit order determines final render
- Overlapping strokes are allowed

---

## Summary

The architecture prioritizes deterministic state, simplicity, and real-time correctness.
