# Asing-Capstone-API

**ENDPOINT**: <https://asing-api-m73lmtgayq-et.a.run.app>

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

## Update Profile

- URL

  - Profile: `/profile`

- Method

  - POST

- Headers

  - `Authorization`:`Bearer <token>`

- Request Body

  - `fullName` as `String`
  - `weightKg` as `Float`
  - `ageYears` as `Integer`
  - `armCircumferenceCm` as `Float`

- Response

```json
{
  "status": "success",
  "result": {
    "fullName": "Onana Onana",
    "ageYears": 19,
    "weightKg": 70.69,
    "armCircumferenceCm": 13.5
  }
}
```

## Check Token

- URL

  - check: `/check-token`

- Method

  - GET

- Response

```json
{
    "status": "success",
    "message": "Token is valid",
    "decoded": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJJZC0xZTlhMTY2Ni0wOGYxLTQzMWYtOGJmZS05ZjM1NDQ3ZTc0ZDkiLCJlbWFpbCI6ImxhbmFuZ2tzbWExMEBtYWlsLmNvbSIsImlhdCI6MTcxNzkzNzU4MX0.kNz0fbM0Ejeow41iZJEVMrSDQGoi7DGIlPDORejqkVA",
        "decoded": {
            "header": {
                "alg": "HS256",
                "typ": "JWT"
            },
            "payload": {
                "id": "userId-1e9a1666-08f1-431f-8bfe-9f35447e74d9",
                "email": "lanangksma10@mail.com",
                "iat": 1717937581
            },
            "signature": "kNz0fbM0Ejeow41iZJEVMrSDQGoi7DGIlPDORejqkVA"
        },
        "raw": {
            "header": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
            "payload": "eyJpZCI6InVzZXJJZC0xZTlhMTY2Ni0wOGYxLTQzMWYtOGJmZS05ZjM1NDQ3ZTc0ZDkiLCJlbWFpbCI6ImxhbmFuZ2tzbWExMEBtYWlsLmNvbSIsImlhdCI6MTcxNzkzNzU4MX0",
            "signature": "kNz0fbM0Ejeow41iZJEVMrSDQGoi7DGIlPDORejqkVA"
        }
    }
}
```

## Progress

- URL

  - progress: `/progress`

- Method

  - For update `POST`
  - `GET` to get data

- Request Body

  - `progress` as `String`

- Response

```json
{
    "status": "success",
    "result": [
        {
            "id": "progress_20240609",
            "progress": "311 kkal",
            "timestamp": {
                "date": "20240609",
                "time": "20:3:19"
            }
        }
    ]
}
```

## Get Food Nutrition

### Get Food By Name

- URL

  - Food: `/food?name=ayam goreng`

- Method

  - GET

- Headers

  - `Authorization`:`Bearer <token>`

- Response

```json
{
    "status": "success",
    "data": {
        "proteins": 27,
        "name": "ayam goreng",
        "fat": 14,
        "id": "1",
        "calories": 246,
        "carbohydrate": 0
    }
}
```

### Get Food By id

- URL

  - Food: `/food/id/{id}`

- Method

  - GET

- Headers

  - `Authorization`:`Bearer <token>`

- Response

```json
{
    "status": "success",
    "data": {
        "proteins": 27,
        "name": "ayam goreng",
        "fat": 14,
        "id": "1",
        "calories": 246,
        "carbohydrate": 0
    }
}
```  

## Get Tips

- URL

  - Tips: `/tips/{id}`

- Method

  - GET

- Headers

  - `Authorization` : `Bearer <token>`

- Response

```json
{
    "status": "success",
    "data": {
        "description": "Makanan olahan dan tinggi gula tambahan dapat memberikan kalori kosong tanpa nutrisi yang dibutuhkan. Gantilah dengan makanan segar seperti buah-buahan, sayuran, biji-bijian utuh, dan protein tanpa lemak. Hindari makanan cepat saji, minuman manis, dan camilan kemasan yang tinggi gula.",
        "id": "5",
        "title": "Hindari Makanan Olahan dan Gula Tambahan",
        "image": "https://images.unsplash.com/photo-1610219171722-87b3f4170557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjAxMzB8MHwxfHNlYXJjaHwxfHxzdWdhcnxlbnwwfHx8fDE3MTc5Mzk4ODB8MA&ixlib=rb-4.0.3&q=80&w=200"
    }
}
```

## Get All Tips

- URL

  - Tips: `/tips`

- Method

  - GET

- Headers

  - `Authorization` : `Bearer <token>`

- Response

```json
{
    "status": "success",
    "data": [
        {
            "description": "Protein sangat penting untuk perkembangan bayi dan menjaga kesehatan ibu. Sumber protein berkualitas tinggi meliputi daging tanpa lemak, ikan, telur, kacang-kacangan, dan produk susu rendah lemak. Protein membantu membangun jaringan baru dan mendukung pertumbuhan janin.",
            "id": "2",
            "title": "Konsumsi Protein Berkualitas Tinggi",
            "image": "https://images.unsplash.com/photo-1535473895227-bdecb20fb157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjAxMzB8MHwxfHNlYXJjaHwxfHxwcm90ZWlufGVufDB8fHx8MTcxNzkzOTExMXww&ixlib=rb-4.0.3&q=80&w=200"
        },
        {
            "description": "Asam folat penting untuk mencegah cacat tabung saraf pada bayi. Makanan kaya asam folat meliputi sayuran hijau, buah jeruk, kacang-kacangan, dan biji-bijian yang diperkaya. Pastikan untuk mendapatkan cukup asam folat dari makanan dan pertimbangkan suplemen jika diperlukan.",
            "id": "4",
            "title": "Perbanyak Asupan Asam Folat",
            "image": "https://images.unsplash.com/photo-1546548970-71785318a17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjAxMzB8MHwxfHNlYXJjaHwxfHxmb2xpYyUyMGFjaWR8ZW58MHx8fHwxNzE3OTM5MjMzfDA&ixlib=rb-4.0.3&q=80&w=200"
        },
    ]
}
```

## Prediction

- URL

  - Predict: `/predict`

- Method

  - POST

- Headers

  - `Authorization`:`Bearer <token>`

- Request Body

  - `multipart/form-data` as `image`

- Response

```json
{
  "status": "success",
  "data": {
    "predictedClassName": "ayam goreng",
    "recommendation": "DIREKOMENDASIKAN",
    "confidenceScore": 99.99977350234985,
    "userId": "userId-1e9a1666-08f1-431f-8bfe-9f35447e74d9",
    "userEmail": "lanangksma10@mail.com",
    "userFullName": "Lanang Ksma",
    "createdAt": "2024-06-06T04:46:11.481Z"
  }
}
```

## Histories

- URL

  - Predict: `/history`

- Method

  - GET

- Headers

  - `Authorization`:`Bearer <token>`

- Response

```json
{
    "data": [
        {
            "predictId": "predict_KdvbREyy",
            "history": {
                "createdAt": "2024-06-20T16:26:32.814Z",
                "confidenceScore": 99.21621680259705,
                "imageUrl": "https://storage.googleapis.com/predict-history-asing/predict_KdvbREyy.jpg",
                "userFullName": "Lanang Ksma",
                "recommendation": "DIREKOMENDASIKAN",
                "predictedClassName": "ayam goreng",
                "userEmail": "lanangksma10@mail.com",
                "id": "predict_KdvbREyy",
                "userId": "userId-1e9a1666-08f1-431f-8bfe-9f35447e74d9"
            }
        },
        {
            "predictId": "predict_T4c9ibEc",
            "history": {
                "createdAt": "2024-06-20T16:22:07.062Z",
                "confidenceScore": 99.21621680259705,
                "imageUrl": "https://storage.googleapis.com/predict-history-asing/predict_T4c9ibEc.jpg",
                "userFullName": "Lanang Ksma",
                "recommendation": "DIREKOMENDASIKAN",
                "predictedClassName": "ayam goreng",
                "userEmail": "lanangksma10@mail.com",
                "id": "predict_T4c9ibEc",
                "userId": "userId-1e9a1666-08f1-431f-8bfe-9f35447e74d9"
            }
        },
        {
            "predictId": "predict_dXI2dtCR",
            "history": {
                "createdAt": "2024-06-20T16:21:43.578Z",
                "confidenceScore": 99.96113181114197,
                "imageUrl": "https://storage.googleapis.com/predict-history-asing/predict_dXI2dtCR.jpg",
                "userFullName": "Lanang Ksma",
                "recommendation": "DIREKOMENDASIKAN",
                "predictedClassName": "ayam goreng",
                "userEmail": "lanangksma10@mail.com",
                "id": "predict_dXI2dtCR",
                "userId": "userId-1e9a1666-08f1-431f-8bfe-9f35447e74d9"
            }
        }
    ]
}
```
