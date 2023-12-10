# Auth Routes
Base URL `/auth`

| HTTP Method | URL Path  | Description       |
|-------------|-----------|-------------------|
| POST        | `/signup` | Signup user       |
| POST        | `/login`  | Login user        |
| GET         | `/verify` | Verify Auth token |

# User routes
Base URL `/user`

| HTTP Method | URL Path           | Description               |
|-------------|--------------------|---------------------------|
| GET         | `/:user_id`        | Get user by id            |
| PUT         | `/edit/:user_id`   | Get user and edit by id   |
| DELETE      | `/delete/:user_id` | Get user by id and delete |

# Class routes
Base URL `/class`

| HTTP Method | URL Path            | Description                      |
|-------------|---------------------|----------------------------------|
| GET         | `/all`              | Get all classes                  |
| GET         | `/:class_id`        | Get class by id                  |
| POST        | `/create`           | Create a class                   |
| POST        | `/join`             | Update class with joined members |
| PUT         | `/edit/:class_id`   | Get class and edit by id         |
| DELETE      | `/delete/:class_id` | Get class by id and delete       |


Hay que hacer tanto populate en la class_id de usuarios como en el user_id de clases.

Class
.populate('User')

User
.populate('class')

Ambos en un Promise.all se pushean en dos arrays distintos en el join.