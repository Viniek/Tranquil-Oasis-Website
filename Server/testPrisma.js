import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const prisma = new PrismaClient();

async function main() {
  try {
    // Fetch users from the user table
    const users = await prisma.user.findMany();
    console.log('Fetched users:', users);

    // Fetch spaces from the spaces table
    const apartments = await prisma.spaces.findMany();
    console.log('Fetched apartments:', apartments);

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();