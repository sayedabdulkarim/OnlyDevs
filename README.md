# OnlyDevs 😏

> Free fake REST & GraphQL API for testing and prototyping

**Exclusive content for developers!**

## Features

- **REST API** - Full CRUD operations on all resources
- **GraphQL API** - Query and mutate data with GraphQL
- **Filtering** - Filter by any field
- **Pagination** - Paginate results with `_page` and `_limit`
- **Sorting** - Sort by any field with `_sort` and `_order`
- **Search** - Full text search with `q` parameter
- **CORS enabled** - Use from any origin
- **No authentication** - Just start using it!

## Resources

| Resource | Count | Endpoint |
|----------|-------|----------|
| Posts | 100 | `/posts` |
| Comments | 500 | `/comments` |
| Albums | 100 | `/albums` |
| Photos | 5000 | `/photos` |
| Todos | 200 | `/todos` |
| Users | 10 | `/users` |

## Usage

### REST API

```javascript
// Get all posts
fetch('https://onlydevs.onrender.com/posts')
  .then(res => res.json())
  .then(console.log)

// Get post by ID
fetch('https://onlydevs.onrender.com/posts/1')

// Get posts by user
fetch('https://onlydevs.onrender.com/posts?userId=1')

// Pagination
fetch('https://onlydevs.onrender.com/posts?_page=1&_limit=10')

// Create post
fetch('https://onlydevs.onrender.com/posts', {
  method: 'POST',
  body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
  headers: { 'Content-type': 'application/json' }
})
```

### GraphQL

```graphql
# Query
query {
  users(limit: 5) {
    id
    name
    email
    posts {
      title
    }
  }
}

# Mutation
mutation {
  createPost(userId: 1, title: "Hello", body: "World") {
    id
    title
  }
}
```

## Local Development

1. Clone the repository
```bash
git clone https://github.com/sayedabdulkarim/onlydevs.git
cd onlydevs
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/onlydevs
```

4. Seed the database
```bash
npm run seed
```

5. Start the server
```bash
npm run dev
```

6. Open http://localhost:3000

## Tech Stack

- **Express.js** - REST API
- **Apollo Server** - GraphQL
- **MongoDB** - Database
- **Mongoose** - ODM

## Deployment

Deployed on Render at: https://onlydevs.onrender.com

## Author

Made with ❤️ by **Sayed Abdul Karim**

## License

MIT
