require('dotenv').config();
const mongoose = require('mongoose');
const { User, Post, Comment, Album, Photo, Todo } = require('../models');

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';

async function fetchData(endpoint) {
  const response = await fetch(`${JSONPLACEHOLDER_URL}/${endpoint}`);
  return response.json();
}

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
      Album.deleteMany({}),
      Photo.deleteMany({}),
      Todo.deleteMany({})
    ]);

    // Fetch data from JSONPlaceholder
    console.log('Fetching data from JSONPlaceholder...');
    const [users, posts, comments, albums, photos, todos] = await Promise.all([
      fetchData('users'),
      fetchData('posts'),
      fetchData('comments'),
      fetchData('albums'),
      fetchData('photos'),
      fetchData('todos')
    ]);

    // Insert data
    console.log('Inserting users...');
    await User.insertMany(users);
    console.log(`✓ Inserted ${users.length} users`);

    console.log('Inserting posts...');
    await Post.insertMany(posts);
    console.log(`✓ Inserted ${posts.length} posts`);

    console.log('Inserting comments...');
    await Comment.insertMany(comments);
    console.log(`✓ Inserted ${comments.length} comments`);

    console.log('Inserting albums...');
    await Album.insertMany(albums);
    console.log(`✓ Inserted ${albums.length} albums`);

    console.log('Inserting photos...');
    await Photo.insertMany(photos);
    console.log(`✓ Inserted ${photos.length} photos`);

    console.log('Inserting todos...');
    await Todo.insertMany(todos);
    console.log(`✓ Inserted ${todos.length} todos`);

    console.log('\n✅ Database seeded successfully!');
    console.log(`
Summary:
- Users: ${users.length}
- Posts: ${posts.length}
- Comments: ${comments.length}
- Albums: ${albums.length}
- Photos: ${photos.length}
- Todos: ${todos.length}
    `);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

seedDatabase();
