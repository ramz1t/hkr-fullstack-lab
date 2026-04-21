# hkr-fullstack-lab

View live: [link](https://event-planner-ramz1.vercel.app)

## Requirements

- Node.js 18+
- MongoDB instance

## Environment setup

The backend requires a `.env` file with a MongoDB connection string.

### mac / linux

```sh
cp backend/.env.example backend/.env
```

### win (cmd)

```cmd
copy backend\.env.example backend\.env
```

Open `backend/.env` and replace the `MONGO_URI` value with your own connection string from [MongoDB Atlas](https://cloud.mongodb.com)

## How to run (dev)

### mac / linux

```sh
# only install
sh entrypoint.sh -i

# only run
sh entrypoint.sh -r

# or both
sh entrypoint.sh -ir
```

### win

```sh
# Terminal 1
cd backend
npm i
npm run start

# Terminal 2
cd frontend
npm i
npm run dev
```
