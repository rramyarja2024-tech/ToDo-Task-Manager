FROM node:22

WORKDIR /app

COPY todo-task-manager/backend/package*.json ./backend/
RUN cd backend && npm install

COPY todo-task-manager/frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY todo-task-manager/backend ./backend
COPY todo-task-manager/frontend ./frontend

RUN cd frontend && npm run build

EXPOSE 5000

CMD ["node", "backend/server.js"]