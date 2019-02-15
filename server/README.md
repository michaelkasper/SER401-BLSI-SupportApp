# BLSI API ALGORITHM SERVICE

## Startup

### `npm run start-server~
Starts the server only

### `npm start`
Starts server and client

## Interfacing

### `http://localhost:3001/`
This is the general host information

### `http://localhost:3001/algorithm`
GET_ALL: `http://localhost:3001/algorithm`
GET: `http://localhost:3001/algorithm/{id}`
POST: `http://localhost:3001/algorithm`
PUT: `http://localhost:3001/algorithm/{id}`
DELETE: `http://localhost:3001/algorithm/{id}`
DELETE_ALL: `http://localhost:3001/algorithm`

### `http://localhost:3001/question`
GET_ALL: `http://localhost:3001/question?algorithm_id={algorithm_id}`
GET: `http://localhost:3001/question/{id}`
POST: `http://localhost:3001/question`
PUT: `http://localhost:3001/question/{id}`
DELETE: `http://localhost:3001/question/{id}`
DELETE_ALL: `http://localhost:3001/question?algorithm_id={algorithm_id}`

### `http://localhost:3001/recommendation`
GET_ALL: `http://localhost:3001/recommendation?algorithm_id={algorithm_id}`
GET: `http://localhost:3001/recommendation/{id}`
POST: `http://localhost:3001/recommendation`
PUT: `http://localhost:3001/recommendation/{id}`
DELETE: `http://localhost:3001/recommendation/{id}`
DELETE_ALL: `http://localhost:3001/recommendation?algorithm_id={algorithm_id}`

### `http://localhost:3001/state`
GET_ALL: `http://localhost:3001/state?algorithm_id={algorithm_id}`
GET: `http://localhost:3001/state/{id}`
POST: `http://localhost:3001/state`
PUT: `http://localhost:3001/state/{id}`
DELETE: `http://localhost:3001/state/{id}`
DELETE_ALL: `http://localhost:3001/state?algorithm_id={algorithm_id}`

### `http://localhost:3001/release`
GET_ALL: `http://localhost:3001/release`
GET: `http://localhost:3001/release/{id}`
POST: `http://localhost:3001/release` *needs algorithm_id to be sent in body
DELETE: `http://localhost:3001/release/{id}`

### `http://localhost:3001/dump`
POST: `http://localhost:3001/dump` *no data is needed in body