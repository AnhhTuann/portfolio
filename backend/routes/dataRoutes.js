import express from 'express';
import { Profile, Project, Artwork, Message } from '../models/index.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// ---------------- PROJECTS ----------------
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/projects', authMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json({ success: true, id: project._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/projects/:id', authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/projects/:id', authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ---------------- ARTWORKS ----------------
router.get('/artworks', async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/artworks', authMiddleware, async (req, res) => {
  try {
    const artwork = new Artwork(req.body);
    await artwork.save();
    res.json({ success: true, id: artwork._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/artworks/:id', authMiddleware, async (req, res) => {
  try {
    await Artwork.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/artworks/:id', authMiddleware, async (req, res) => {
  try {
    await Artwork.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ---------------- MESSAGES ----------------
router.get('/messages', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.json({ success: true, id: message._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/messages/:id', authMiddleware, async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, { read: req.body.read });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/messages/:id', authMiddleware, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ---------------- PROFILE ----------------
router.get('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
      await profile.save();
    } else {
      await Profile.findByIdAndUpdate(profile._id, req.body);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
