import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

// Inicializamos Prisma y Express
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json()); // Para poder leer req.body en formato JSON

// Endpoint de prueba
app.get('/api/ping', (req, res) => {
  res.send('¡El backend está vivo, pong!');
});

// Endpoint real: Traer todos los negocios (Stores)
app.get('/api/stores', async (req, res) => {
  try {
    const stores = await prisma.store.findMany();
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al buscar los negocios' });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});