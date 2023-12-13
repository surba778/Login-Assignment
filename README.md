# Login-Assignment



## Installation

1. Clone the repository

2. Install the required packages using the following command
```bash
npm install
```
3. Empty users.json and generate mock data using the following command
```bash
npm run generate
```
4. To start the server
```bash
npm start
```
5. Go to http://localhost:3000/

## API Endpoints
1. POST /login
2. POST /register
3. GET /profile (Token required)

## API Reference

#### Register

```http
  GET /register
```

| Parameter | Type     | 
| :-------- | :------- |
| `name` | `string` |
| `username` | `string` | 
| `password` | `string` | 
| `email` | `string` |

#### Register

```http
  GET /login
```

| Parameter | Type     | 
| :-------- | :------- |
| `username` | `string` | 
| `password` | `string` | 

#### Register

```http
  GET /profile
```
| Parameter | Header     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `Authorization` | **Required** |


