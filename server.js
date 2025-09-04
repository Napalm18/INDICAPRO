import express from 'express';
import cors from 'cors';
import databaseService from './src/componets/lib/databaseService.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await databaseService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await databaseService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await databaseService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await databaseService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/indicacoes/:userId', async (req, res) => {
  try {
    const indicacoes = await databaseService.getIndicacoesByUserId(req.params.userId);
    res.json(indicacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/indicacoes', async (req, res) => {
  try {
    const indicacao = await databaseService.createIndicacao(req.body);
    res.status(201).json(indicacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/indicacoes/:id', async (req, res) => {
  try {
    const indicacao = await databaseService.updateIndicacao(req.params.id, req.body);
    res.json(indicacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/indicacoes', async (req, res) => {
  try {
    const indicacoes = await databaseService.getAllIndicacoes();
    res.json(indicacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/metas', async (req, res) => {
  try {
    const metas = await databaseService.getMetas();
    res.json(metas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/metas', async (req, res) => {
  try {
    const metas = await databaseService.updateMetas(req.body);
    res.json(metas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/comissoes', async (req, res) => {
  try {
    const comissoes = await databaseService.getComissoes();
    res.json(comissoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/comissoes', async (req, res) => {
  try {
    const comissoes = await databaseService.updateComissoes(req.body);
    res.json(comissoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/notifications/:userId', async (req, res) => {
  try {
    const notifications = await databaseService.getNotificationsByUserId(req.params.userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/notifications', async (req, res) => {
  try {
    const notification = await databaseService.createNotification(req.body);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/notifications/:userId', async (req, res) => {
  try {
    await databaseService.deleteNotificationsByUserId(req.params.userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/notifications/:id/read', async (req, res) => {
  try {
    await databaseService.markNotificationRead(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: SQLite (local)`);
  console.log(`💾 Database file: ./data/app.db`);
});
