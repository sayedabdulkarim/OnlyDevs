const typeDefs = `#graphql
  type Geo {
    lat: String
    lng: String
  }

  type Address {
    street: String
    suite: String
    city: String
    zipcode: String
    geo: Geo
  }

  type Company {
    name: String
    catchPhrase: String
    bs: String
  }

  type User {
    id: Int!
    name: String!
    username: String!
    email: String!
    address: Address
    phone: String
    website: String
    company: Company
    posts: [Post]
    albums: [Album]
    todos: [Todo]
  }

  type Post {
    id: Int!
    userId: Int!
    title: String!
    body: String!
    user: User
    comments: [Comment]
  }

  type Comment {
    id: Int!
    postId: Int!
    name: String!
    email: String!
    body: String!
    post: Post
  }

  type Album {
    id: Int!
    userId: Int!
    title: String!
    user: User
    photos: [Photo]
  }

  type Photo {
    id: Int!
    albumId: Int!
    title: String!
    url: String!
    thumbnailUrl: String!
    album: Album
  }

  type Todo {
    id: Int!
    userId: Int!
    title: String!
    completed: Boolean!
    user: User
  }

  type Query {
    # Users
    users(limit: Int, page: Int): [User]
    user(id: Int!): User

    # Posts
    posts(userId: Int, limit: Int, page: Int): [Post]
    post(id: Int!): Post

    # Comments
    comments(postId: Int, limit: Int, page: Int): [Comment]
    comment(id: Int!): Comment

    # Albums
    albums(userId: Int, limit: Int, page: Int): [Album]
    album(id: Int!): Album

    # Photos
    photos(albumId: Int, limit: Int, page: Int): [Photo]
    photo(id: Int!): Photo

    # Todos
    todos(userId: Int, completed: Boolean, limit: Int, page: Int): [Todo]
    todo(id: Int!): Todo
  }

  type Mutation {
    # Posts
    createPost(userId: Int!, title: String!, body: String!): Post
    updatePost(id: Int!, title: String, body: String): Post
    deletePost(id: Int!): Post

    # Comments
    createComment(postId: Int!, name: String!, email: String!, body: String!): Comment
    updateComment(id: Int!, name: String, email: String, body: String): Comment
    deleteComment(id: Int!): Comment

    # Albums
    createAlbum(userId: Int!, title: String!): Album
    updateAlbum(id: Int!, title: String): Album
    deleteAlbum(id: Int!): Album

    # Photos
    createPhoto(albumId: Int!, title: String!, url: String!, thumbnailUrl: String!): Photo
    updatePhoto(id: Int!, title: String, url: String, thumbnailUrl: String): Photo
    deletePhoto(id: Int!): Photo

    # Todos
    createTodo(userId: Int!, title: String!, completed: Boolean): Todo
    updateTodo(id: Int!, title: String, completed: Boolean): Todo
    deleteTodo(id: Int!): Todo
  }
`;

module.exports = typeDefs;
