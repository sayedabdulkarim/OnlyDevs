const { User, Post, Comment, Album, Photo, Todo } = require('../models');

const resolvers = {
  Query: {
    // Users
    users: async (_, { limit, page }) => {
      let query = User.find().select('-_id -__v');
      if (limit) {
        const skip = page ? (page - 1) * limit : 0;
        query = query.skip(skip).limit(limit);
      }
      return query;
    },
    user: async (_, { id }) => User.findOne({ id }).select('-_id -__v'),

    // Posts
    posts: async (_, { userId, limit, page }) => {
      const filter = userId ? { userId } : {};
      let query = Post.find(filter).select('-_id -__v');
      if (limit) {
        const skip = page ? (page - 1) * limit : 0;
        query = query.skip(skip).limit(limit);
      }
      return query;
    },
    post: async (_, { id }) => Post.findOne({ id }).select('-_id -__v'),

    // Comments
    comments: async (_, { postId, limit, page }) => {
      const filter = postId ? { postId } : {};
      let query = Comment.find(filter).select('-_id -__v');
      if (limit) {
        const skip = page ? (page - 1) * limit : 0;
        query = query.skip(skip).limit(limit);
      }
      return query;
    },
    comment: async (_, { id }) => Comment.findOne({ id }).select('-_id -__v'),

    // Albums
    albums: async (_, { userId, limit, page }) => {
      const filter = userId ? { userId } : {};
      let query = Album.find(filter).select('-_id -__v');
      if (limit) {
        const skip = page ? (page - 1) * limit : 0;
        query = query.skip(skip).limit(limit);
      }
      return query;
    },
    album: async (_, { id }) => Album.findOne({ id }).select('-_id -__v'),

    // Photos
    photos: async (_, { albumId, limit, page }) => {
      const filter = albumId ? { albumId } : {};
      let query = Photo.find(filter).select('-_id -__v');
      if (limit) {
        const skip = page ? (page - 1) * limit : 0;
        query = query.skip(skip).limit(limit);
      }
      return query;
    },
    photo: async (_, { id }) => Photo.findOne({ id }).select('-_id -__v'),

    // Todos
    todos: async (_, { userId, completed, limit, page }) => {
      const filter = {};
      if (userId) filter.userId = userId;
      if (completed !== undefined) filter.completed = completed;
      let query = Todo.find(filter).select('-_id -__v');
      if (limit) {
        const skip = page ? (page - 1) * limit : 0;
        query = query.skip(skip).limit(limit);
      }
      return query;
    },
    todo: async (_, { id }) => Todo.findOne({ id }).select('-_id -__v'),
  },

  Mutation: {
    // Posts
    createPost: async (_, args) => {
      const lastPost = await Post.findOne().sort({ id: -1 });
      const newId = lastPost ? lastPost.id + 1 : 1;
      return { id: newId, ...args };
    },
    updatePost: async (_, { id, ...args }) => {
      const post = await Post.findOne({ id }).select('-_id -__v').lean();
      return { ...post, ...args };
    },
    deletePost: async (_, { id }) => {
      const post = await Post.findOne({ id }).select('-_id -__v');
      return post;
    },

    // Comments
    createComment: async (_, args) => {
      const lastComment = await Comment.findOne().sort({ id: -1 });
      const newId = lastComment ? lastComment.id + 1 : 1;
      return { id: newId, ...args };
    },
    updateComment: async (_, { id, ...args }) => {
      const comment = await Comment.findOne({ id }).select('-_id -__v').lean();
      return { ...comment, ...args };
    },
    deleteComment: async (_, { id }) => {
      const comment = await Comment.findOne({ id }).select('-_id -__v');
      return comment;
    },

    // Albums
    createAlbum: async (_, args) => {
      const lastAlbum = await Album.findOne().sort({ id: -1 });
      const newId = lastAlbum ? lastAlbum.id + 1 : 1;
      return { id: newId, ...args };
    },
    updateAlbum: async (_, { id, ...args }) => {
      const album = await Album.findOne({ id }).select('-_id -__v').lean();
      return { ...album, ...args };
    },
    deleteAlbum: async (_, { id }) => {
      const album = await Album.findOne({ id }).select('-_id -__v');
      return album;
    },

    // Photos
    createPhoto: async (_, args) => {
      const lastPhoto = await Photo.findOne().sort({ id: -1 });
      const newId = lastPhoto ? lastPhoto.id + 1 : 1;
      return { id: newId, ...args };
    },
    updatePhoto: async (_, { id, ...args }) => {
      const photo = await Photo.findOne({ id }).select('-_id -__v').lean();
      return { ...photo, ...args };
    },
    deletePhoto: async (_, { id }) => {
      const photo = await Photo.findOne({ id }).select('-_id -__v');
      return photo;
    },

    // Todos
    createTodo: async (_, args) => {
      const lastTodo = await Todo.findOne().sort({ id: -1 });
      const newId = lastTodo ? lastTodo.id + 1 : 1;
      return { id: newId, completed: false, ...args };
    },
    updateTodo: async (_, { id, ...args }) => {
      const todo = await Todo.findOne({ id }).select('-_id -__v').lean();
      return { ...todo, ...args };
    },
    deleteTodo: async (_, { id }) => {
      const todo = await Todo.findOne({ id }).select('-_id -__v');
      return todo;
    },
  },

  // Field resolvers for nested data
  User: {
    posts: async (user) => Post.find({ userId: user.id }).select('-_id -__v'),
    albums: async (user) => Album.find({ userId: user.id }).select('-_id -__v'),
    todos: async (user) => Todo.find({ userId: user.id }).select('-_id -__v'),
  },

  Post: {
    user: async (post) => User.findOne({ id: post.userId }).select('-_id -__v'),
    comments: async (post) => Comment.find({ postId: post.id }).select('-_id -__v'),
  },

  Comment: {
    post: async (comment) => Post.findOne({ id: comment.postId }).select('-_id -__v'),
  },

  Album: {
    user: async (album) => User.findOne({ id: album.userId }).select('-_id -__v'),
    photos: async (album) => Photo.find({ albumId: album.id }).select('-_id -__v'),
  },

  Photo: {
    album: async (photo) => Album.findOne({ id: photo.albumId }).select('-_id -__v'),
  },

  Todo: {
    user: async (todo) => User.findOne({ id: todo.userId }).select('-_id -__v'),
  },
};

module.exports = resolvers;
