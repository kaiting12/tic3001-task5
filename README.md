# TIC3001 Task 5
## Steps to test:
### 1. Start mongodb server and open mongoDB Compass to start connection
- mongod --dbpath ~/data/db

### 2. Start Redis server
- brew services start redis

### 3. Run app
- npm start

### 5. Check if any key-value stored in redis
- Open another terminal and enter redis-cli
- Enter KEYS * (will retrun all keys)
- DEL games (DEL key along with its value)

### 4. Call api
- http://localhost:8082/games
- Take note of the first response time

### 5. Check if key value stored
- Open another terminal and enter redis-cli
- Enter KEYS * (Return all keys)
- GET games (Show value of key) [Value shld be stored by now]

### 6. Call api again
- Response should be faster thsn the first respomse time






