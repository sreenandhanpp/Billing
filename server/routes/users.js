import express from 'express';
import User from '../models/User.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new user (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ ...user.toObject(), password: undefined });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, select: '-password' }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;