import express from 'express';
import { pool } from '../db.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Snake_case -> camelCase row mapper
const mapRow = (row) => {
  if (!row) return row;
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    const camel = k.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    out[camel] = v;
  }
  return out;
};

const mapRows = (rows) => rows.map(mapRow);

// ---------------- PROJECTS ----------------
router.get('/projects', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(mapRows(rows));
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/projects', authMiddleware, async (req, res) => {
  try {
    const { name, painPoint, techStack = [], imageUrl = '', liveLink = '', sourceCode = '' } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO projects (name, pain_point, tech_stack, image_url, live_link, source_code)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [name, painPoint, JSON.stringify(techStack), imageUrl, liveLink, sourceCode]
    );
    res.json({ success: true, id: rows[0].id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/projects/:id', authMiddleware, async (req, res) => {
  try {
    const { name, painPoint, techStack, imageUrl, liveLink, sourceCode } = req.body;
    await pool.query(
      `UPDATE projects SET
        name = COALESCE($2, name),
        pain_point = COALESCE($3, pain_point),
        tech_stack = COALESCE($4, tech_stack),
        image_url = COALESCE($5, image_url),
        live_link = COALESCE($6, live_link),
        source_code = COALESCE($7, source_code)
       WHERE id = $1`,
      [req.params.id, name, painPoint, techStack !== undefined ? JSON.stringify(techStack) : null, imageUrl, liveLink, sourceCode]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/projects/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ---------------- ARTWORKS ----------------
router.get('/artworks', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM artworks ORDER BY created_at DESC');
    res.json(mapRows(rows));
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/artworks', authMiddleware, async (req, res) => {
  try {
    const { title, imageUrl, description = '' } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO artworks (title, image_url, description) VALUES ($1, $2, $3) RETURNING id`,
      [title, imageUrl, description]
    );
    res.json({ success: true, id: rows[0].id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/artworks/:id', authMiddleware, async (req, res) => {
  try {
    const { title, imageUrl, description } = req.body;
    await pool.query(
      `UPDATE artworks SET
        title = COALESCE($2, title),
        image_url = COALESCE($3, image_url),
        description = COALESCE($4, description)
       WHERE id = $1`,
      [req.params.id, title, imageUrl, description]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/artworks/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM artworks WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ---------------- MESSAGES ----------------
router.get('/messages', authMiddleware, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(mapRows(rows));
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING id`,
      [name, email, message]
    );
    res.json({ success: true, id: rows[0].id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/messages/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('UPDATE messages SET read = $2 WHERE id = $1', [req.params.id, req.body.read]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/messages/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM messages WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ---------------- PROFILE ----------------
router.get('/profile', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM profile WHERE id = 1');
    res.json(mapRow(rows[0] || { name: '', avatarUrl: '', description: '', role: [] }));
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, avatarUrl, description, role = [] } = req.body;
    await pool.query(
      `INSERT INTO profile (id, name, avatar_url, description, role)
       VALUES (1, $1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         avatar_url = EXCLUDED.avatar_url,
         description = EXCLUDED.description,
         role = EXCLUDED.role`,
      [name ?? '', avatarUrl ?? '', description ?? '', JSON.stringify(role)]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
