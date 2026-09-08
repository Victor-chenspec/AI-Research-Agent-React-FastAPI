# AI Research Agent

An AI-powered research website that automatically plans, researches, analyzes, critiques, and writes a research report from a single research question.

## Overview

The system uses **LangGraph** to orchestrate multiple AI research stages:

```text
User
 ↓
React Frontend
 ↓
FastAPI
 ↓
LangGraph
 ├── Planner
 ├── Researcher → Tavily
 ├── Analyzer
 ├── Critic
 │     ├── FAIL → Researcher
 │     └── PASS → Writer
 └── Writer
 ↓
Final Report
```

The Critic can send the workflow back to the Researcher when the available evidence is insufficient, creating a simple iterative research loop.

## Features

- AI research planning
- Web research with Tavily
- Source analysis
- Research quality evaluation
- Conditional research loop
- AI-generated research report
- Source URLs included in the final report
- Dockerized frontend and backend
- Docker Compose support
- GitHub Actions CI

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Python
- FastAPI
- LangChain
- LangGraph
- Gemini
- Tavily

### DevOps

- Docker
- Docker Compose
- GitHub Actions

````

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd research-agent
````

### 2. Configure environment variables

Create:

```text
backend/.env
```

```env
GOOGLE_API_KEY=your_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key
```

### 3. Run with Docker Compose

```bash
docker compose up --build
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8000
```

API health endpoint:

```text
http://localhost:8000/health
```

## CI

This project uses **GitHub Actions** to automatically build both Docker images on pushes and pull requests to `main`.

```text
GitHub Push / Pull Request
          ↓
      Checkout
          ↓
   Build Backend Image
          ↓
   Build Frontend Image
          ↓
        CI PASS
```

## Environment Variables

The following environment variables are required:

| Variable         | Description    |
| ---------------- | -------------- |
| `GOOGLE_API_KEY` | Gemini API key |
| `TAVILY_API_KEY` | Tavily API key |

> Never commit `.env` files or API keys to the repository.

## License

This project is licensed under the **MIT License**.
