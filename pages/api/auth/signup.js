import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const { email, password } = data;

    if (!email || !email.includes('@') || !password || !password.trim()) {
      res.status(422).json({ message: 'Invalid Input' });
      return;
    }

    const client = await connectToDatabase();

    console.log('CLIENT', client);

    const db = client.db();

    const hashedPassword = hashPassword(password);

    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Created User!' });
  }
};

export default handler;
