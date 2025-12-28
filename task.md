# OnlyDevs - Fake REST & GraphQL API

> "Exclusive content for developers" 😏

## Project Overview
A free fake REST & GraphQL API for testing and prototyping. Like JSONPlaceholder but with GraphQL support.

**Live URL:** `https://onlydevs.api` (TBD)

---

## Tech Stack
- **Runtime:** Node.js
- **REST:** Express.js
- **GraphQL:** Apollo Server
- **Database:** MongoDB + Mongoose
- **Validation:** Joi / Zod
- **Docs:** Landing page with examples

---

## Data Models (Same as JSONPlaceholder)

### Users (10 records)
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": { "lat": "-37.3159", "lng": "81.1496" }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

### Posts (100 records)
```json
{
  "id": 1,
  "userId": 1,
  "title": "Post title here",
  "body": "Post body content here"
}
```

### Comments (500 records)
```json
{
  "id": 1,
  "postId": 1,
  "name": "Comment name",
  "email": "commenter@email.com",
  "body": "Comment body here"
}
```

### Albums (100 records)
```json
{
  "id": 1,
  "userId": 1,
  "title": "Album title"
}
```

### Photos (5000 records)
```json
{
  "id": 1,
  "albumId": 1,
  "title": "Photo title",
  "url": "https://via.placeholder.com/600/92c952",
  "thumbnailUrl": "https://via.placeholder.com/150/92c952"
}
```

### Todos (200 records)
```json
{
  "id": 1,
  "userId": 1,
  "title": "Todo title",
  "completed": false
}
```

---

## API Endpoints

### REST Endpoints

#### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | Get all users |
| GET | /users/:id | Get user by ID |
| POST | /users | Create user |
| PUT | /users/:id | Update user |
| PATCH | /users/:id | Partial update |
| DELETE | /users/:id | Delete user |
| GET | /users/:id/posts | Get user's posts |
| GET | /users/:id/albums | Get user's albums |
| GET | /users/:id/todos | Get user's todos |

#### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /posts | Get all posts |
| GET | /posts/:id | Get post by ID |
| POST | /posts | Create post |
| PUT | /posts/:id | Update post |
| PATCH | /posts/:id | Partial update |
| DELETE | /posts/:id | Delete post |
| GET | /posts/:id/comments | Get post's comments |

#### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /comments | Get all comments |
| GET | /comments/:id | Get comment by ID |
| POST | /comments | Create comment |
| PUT | /comments/:id | Update comment |
| DELETE | /comments/:id | Delete comment |

#### Albums
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /albums | Get all albums |
| GET | /albums/:id | Get album by ID |
| POST | /albums | Create album |
| PUT | /albums/:id | Update album |
| DELETE | /albums/:id | Delete album |
| GET | /albums/:id/photos | Get album's photos |

#### Photos
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /photos | Get all photos |
| GET | /photos/:id | Get photo by ID |
| POST | /photos | Create photo |
| PUT | /photos/:id | Update photo |
| DELETE | /photos/:id | Delete photo |

#### Todos
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /todos | Get all todos |
| GET | /todos/:id | Get todo by ID |
| POST | /todos | Create todo |
| PUT | /todos/:id | Update todo |
| DELETE | /todos/:id | Delete todo |

### Query Parameters
- `?_page=1&_limit=10` - Pagination
- `?_sort=id&_order=desc` - Sorting
- `?userId=1` - Filtering
- `?q=search` - Full text search

### GraphQL Endpoint
- POST `/graphql` - GraphQL playground & queries

---

## Project Structure
```
OnlyDevs/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Comment.js
│   │   ├── Album.js
│   │   ├── Photo.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── posts.js
│   │   ├── comments.js
│   │   ├── albums.js
│   │   ├── photos.js
│   │   └── todos.js
│   ├── graphql/
│   │   ├── schema.js
│   │   └── resolvers.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── queryHelper.js
│   └── app.js
├── seeds/
│   └── seed.js
├── public/
│   ├── index.html
│   └── styles.css
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Tasks

- [ ] Initialize Node.js project
- [ ] Setup Express + Apollo Server
- [ ] Connect MongoDB
- [ ] Create Mongoose models
- [ ] Build REST routes with CRUD
- [ ] Build GraphQL schema & resolvers
- [ ] Add query params (filter, sort, paginate)
- [ ] Create seed script with dummy data
- [ ] Build landing page
- [ ] Deploy to Vercel/Railway

---

## Author
Made with ❤️ by **Sayed Abdul Karim**
