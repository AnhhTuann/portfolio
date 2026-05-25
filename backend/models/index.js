import mongoose from 'mongoose';

// User Schema (Admin)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // hashed
});

// Profile Schema
const profileSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  role: { type: [String], default: [] }
});

// Project Schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  painPoint: { type: String, default: '' },
  techStack: { type: [String], default: [] },
  imageUrl: { type: String, default: '' },
  liveLink: { type: String, default: '' },
  sourceCode: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Artwork Schema
const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Message Schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
export const Profile = mongoose.model('Profile', profileSchema);
export const Project = mongoose.model('Project', projectSchema);
export const Artwork = mongoose.model('Artwork', artworkSchema);
export const Message = mongoose.model('Message', messageSchema);
