require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true, unique: true },
    email: { type: String },
    name: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/users', async (req, res) => {
  try {
    const { userId, email, name } = req.body || {};
    if (!userId) {
      return res.status(400).json({ ok: false, error: 'userId is required' });
    }

    const update = { email, name };
    const result = await User.findOneAndUpdate(
      { userId },
      { $set: update },
      { upsert: true, new: true }
    );
    return res.json({ ok: true, user: { id: result._id, userId: result.userId, email: result.email, name: result.name } });
  } catch (err) {
    console.error('POST /users error', err);
    return res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



