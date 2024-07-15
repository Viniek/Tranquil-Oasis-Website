import pkg from '@prisma/client';
import { Router } from 'express';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = Router();

router.get('/apartments', async (req, res) => {
  try {
    const apartments = await prisma.spaces.findMany(); // Ensure this matches your Prisma model name
    console.log('Fetched apartments:', apartments);
    res.json(apartments);
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
