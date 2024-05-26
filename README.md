# Asing-Capstone-API

**ENDPOINT**: https://asing-api-m73lmtgayq-et.a.run.app

## REGISTER

- URL

  - Register: `/register`

- Method

  - POST

- Request Body

  - `email` as `String`, unique
  - `password` as `String`, >= `8 CHAR`
  - `fullName` as `String`
  - `heightCm` as `Float`
  - `weightKg` as `Float`
  - `ageYears` as `Integer`
  - `armCircumferenceCm` as `Float`

- Response

```json
{
  "status": "success",
  "Message": "User created successfully",
  "data": {}
}
```

## LOGIN

### VIA Email n Password

- URL

  - Login: `/login`

- Method

  - POST

- Request Body

  - `email` as `String`
  - `password` as `String`

- Response

```json
{
  "status": "success",
  "message": "login successfully",
  "loginResult": {
    "userId": "userId-cde53432-48b5-4e9e-8b86-f974a88a3440",
    "email": "test4@mail.com",
    "photoUrl": "source.boringavatars.com/beam/120/test4@mail.com?colors=b6d8c0,dadabd,fedcba",
    "fullName": "Onana Onana",
    "heightCm": 189.69,
    "weightKg": 69.69,
    "ageYears": 19,
    "armCircumferenceCm": 13.1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJJZC1jZGU1MzQzMi00OGI1LTRlOWUtOGI4Ni1mOTc0YTg4YTM0NDAiLCJlbWFpbCI6InRlc3Q0QG1haWwuY29tIiwiaWF0IjoxNzE2NzY0ODA0fQ.ml16VN8nmu8jlPU-y0EftJa01pBaaiYwHpMSix2an8A"
  }
}
```

### VIA GOOGLE

- URL

  - Login: `/auth/google`

**Note**: I dunno how to run it on postman, but it works on browser

## LOGOUT

- URL

  - Logout: `/logout`

- Method

  - POST

- Headers

  - `Authorization`:`Bearer <token>`

- Request Body

  - `email` as `String`
  - `password` as `String`

- Response

```json
{
  "message": "Logged out successfully"
}
```

**Note**: If Above didn't work try this:

```bash
curl -X POST -H "Authorization: Bearer <token>" https://asing-api-m73lmtgayq-et.a.run.app/logout
```

## Profile

- URL

  - Profile: `/profile`

- Method

  - GET

- Headers

  - `Authorization`:`Bearer <token>`

**Note**: Currently it just for check the detail user login, if didn't work on Postman try this:

```bash
curl -H "Authorization: Bearer <token>" https://asing-api-m73lmtgayq-et.a.run.app/profile
```
