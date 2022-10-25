import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://kbiganashvili:FZsn1CbGcJvOWWdm@cluster0.s1lrivz.mongodb.net/auth-demo?retryWrites=true&w=majority'
  );

  return client;
};
