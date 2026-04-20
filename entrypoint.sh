#!/usr/bin/env bash

if [[ "$OSTYPE" != "darwin"* && "$OSTYPE" != "linux-gnu"* ]]; then
  echo "ERROR: This script only supports Mac and Linux." >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

DO_INSTALL=0
DO_RUN=0

usage() {
  echo "Usage: $0 [-i] [-r]"
  echo "  -i  Install dependencies"
  echo "  -r  Run the app"
  echo "At least one flag is required."
  exit 1
}

while getopts "ir" opt; do
  case $opt in
    i) DO_INSTALL=1 ;;
    r) DO_RUN=1 ;;
    *) usage ;;
  esac
done

if [ "$DO_INSTALL" -eq 0 ] && [ "$DO_RUN" -eq 0 ]; then
  usage
fi

LOG_DIR="$ROOT_DIR/.logs"
mkdir -p "$LOG_DIR"

if [ "$DO_INSTALL" -eq 1 ]; then
  echo ""
  echo "-i: Installing"
  echo "    backend"
  cd "$ROOT_DIR/backend"
  if ! npm install > /dev/null 2>&1; then
    echo "ERROR: Backend dependency install failed." >&2
    exit 1
  fi

  echo "    frontend"
  cd "$ROOT_DIR/frontend"
  if ! npm install > /dev/null 2>&1; then
    echo "ERROR: Frontend dependency install failed." >&2
    exit 1
  fi
fi

if [ "$DO_RUN" -eq 1 ]; then
  echo ""
  echo "-r: Running"
  echo "    backend"
  cd "$ROOT_DIR/backend"
  npm run dev > "$LOG_DIR/backend.log" 2>&1 &
  BACKEND_PID=$!

  echo "    frontend"
  cd "$ROOT_DIR/frontend"
  npm run dev > "$LOG_DIR/frontend.log" 2>&1 &
  FRONTEND_PID=$!

  # Give processes a moment to fail or stabilise
  sleep 3

  FAILED=0

  if ! kill -0 "$BACKEND_PID" 2>/dev/null; then
    echo "\nERROR: Backend failed to start. Check .logs/backend.log for details." >&2
    FAILED=1
  fi

  if ! kill -0 "$FRONTEND_PID" 2>/dev/null; then
    echo "\nERROR: Frontend failed to start. Check .logs/frontend.log for details." >&2
    FAILED=1
  fi

  if [ "$FAILED" -eq 1 ]; then
    kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null
    exit 1
  fi

  FRONTEND_PORT=${VITE_PORT:-5173}
  BACKEND_PORT=${PORT:-5000}

  echo ""
  echo "UI:   http://localhost:$FRONTEND_PORT"
  echo "API:  http://localhost:$BACKEND_PORT"
  echo ""
  echo "Press Ctrl+C to stop all processes."

  trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT TERM

  wait $BACKEND_PID $FRONTEND_PID
fi
