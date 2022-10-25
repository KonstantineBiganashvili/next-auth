import NextAuth from 'next-auth/next';
import Providers from 'next-auth/providers';
import { verifyPasswords } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authroize(credentials) {
        const client = connectToDatabase();

        const usersCollection = client.db().collecttion('users');

        const user = await usersCollection.find({ email: credentials.email });

        if (!user) {
          throw new Error('User Could Not Be Found!');
        }

        const isValid = await verifyPasswords(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Invalid Credentials!');
        }

        return {
          email: user.email,
        };

        client.close();
      },
    }),
  ],
});
