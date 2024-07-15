import pkg from '@prisma/client';
import { Router } from 'express';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = Router();

// Add item to cart
router.post('/cart', async (req, res) => {
  const { userId, spaceId } = req.body;
  try {
    const existingCartItem = await prisma.cart.findFirst({
      where: { userId, spaceId },
    });

    if (existingCartItem) {
      return res.status(400).json({ error: 'Item already in cart' });
    }

    const cartItem = await prisma.cart.create({
      data: {
        userId,
        spaceId,
      },
    });
    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart', details: error.message });
  }
});

// Get cart items
router.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { space: true },
    });
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// Delete cart item
router.delete('/cart/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cart.delete({ where: { id: String(id) } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

export default router;
