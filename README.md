# DevStream

> **Code Together, Learn Together** — A real-time collaborative coding interview platform with live video, code execution, and session recording.

---

## Overview

DevStream is a full-stack web application designed for technical interviews and pair programming. Interviewers (hosts) can create password-protected sessions, invite candidates by email, and collaborate in real-time through a shared code editor, live video call, and instant messaging — all in one place.

---

## Features

- **HD Video Calls** — Powered by Stream Video SDK for low-latency, real-time communication
- **Live Chat** — In-session messaging via Stream Chat
- **Collaborative Code Editor** — Monaco Editor with syntax highlighting for JavaScript, Python, and Java
- **Code Execution** — Run code directly in the browser via the Judge0 API
- **Secure Sessions** — Password-protected rooms with email-restricted access for candidates
- **Session Recording** — Hosts can record, stop, and download video call recordings
- **Kick & Ban** — Hosts can remove and permanently block misbehaving participants
- **Fullscreen Mode** — Automatically enters fullscreen for candidates to minimize distractions
- **Dashboard** — View active sessions, past sessions, and quick stats at a glance

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework and build tool |
| Tailwind CSS v4 + DaisyUI | Styling and component library |
| Monaco Editor | Code editor (same as VS Code) |
| Stream Video React SDK | Video calling |
| Stream Chat React | Real-time messaging |
| Clerk (React) | Authentication UI |
| TanStack Query | Server state management |
| React Router v7 | Client-side routing |
| Axios | HTTP client |
| canvas-confetti | Celebration animations on test pass |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database and ODM |
| Clerk (Express) | JWT authentication middleware |
| Stream Chat (Node SDK) | Chat channel management |
| Stream Video (Node SDK) | Video call and recording management |
| Inngest | Background job processing (user sync/delete) |
| bcryptjs | Password hashing |

### External Services
- **Clerk** — User authentication and identity management
- **Stream** — Video calling and chat infrastructure
- **Judge0 (ce.judge0.com)** — Remote code execution engine
- **MongoDB Atlas** — Cloud database
- **Inngest** — Event-driven background functions
- **Vercel** — Deployment platform

---

## Project Structure

```
dev-stream/
├── frontend/               # React + Vite app
│   └── src/
│       ├── pages/          # Route-level components
│       ├── components/     # Reusable UI components
│       ├── hooks/          # Custom React hooks
│       ├── api/            # Axios API calls
│       ├── lib/            # Utility libraries (Stream, Piston, Axios)
│       └── data/           # Problem definitions and language config
│
└── backend/                # Express API server
    └── src/
        ├── controllers/    # Route handlers (sessions, chat, users)
        ├── models/         # Mongoose schemas (User, Session)
        ├── routes/         # Express routers
        ├── middleware/     # Clerk auth middleware
        └── lib/            # DB, Stream, Inngest, env config
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Accounts for: [Clerk](https://clerk.com), [Stream](https://getstream.io), [Inngest](https://inngest.com)

### Environment Variables

**Backend** — create `backend/.env`:
```env
PORT=5001
NODE_ENV=development
DB_URL=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173

# Clerk
CLERK_SECRET_KEY=sk_...

# Stream
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

**Frontend** — create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5001/api
VITE_CLERK_PUBLISHABLE_KEY=pk_...
VITE_STREAM_API_KEY=your_stream_api_key
```

### Installation & Running Locally

```bash
# Install all dependencies
npm install --prefix backend
npm install --prefix frontend

# Run backend (from project root)
npm run start --prefix backend

# Run frontend (in a separate terminal)
npm run dev --prefix frontend
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5001`.

---

## How It Works

### For Interviewers (Hosts)
1. Sign in and navigate to the Dashboard
2. Click **Create Session** and fill in the session name, a password, the candidate's email, and a problem
3. Share the session link and password with your candidate
4. The candidate joins the session — you both get a shared code editor and live video call
5. Use **Record** to capture the session, **Kick & Ban** to remove a bad actor, or **End Session** to wrap up
6. Access recordings from the **Recordings** button in the video panel

### For Candidates
1. Open the session link provided by the interviewer
2. Enter the session password to join
3. The browser enters fullscreen mode automatically
4. Solve the coding problem in the shared editor while on a video call with the interviewer

---

## Deployment

The project is configured for **Vercel** deployment.

```bash
# Build frontend and install all dependencies
npm run build   # from project root
```

The `vercel.json` in the backend routes all requests through `src/server.js`. In production, Express also serves the compiled frontend static files from `frontend/dist`.

---

## License

ISC
