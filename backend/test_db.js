import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const DB_URL = process.env.DB_URL;

async function testConnection() {
  if (!DB_URL) {
    console.error('DB_URL not found in current directory .env');
    process.exit(1);
  }

  console.log('Connecting to:', DB_URL.split('@')[1] || DB_URL); // Log host for safety

  try {
    await mongoose.connect(DB_URL);
    console.log('✅ Successfully connected to MongoDB');

    const admin = mongoose.connection.db.admin();
    const dbs = await admin.listDatabases();
    
    console.log('\n--- Available Databases ---');
    dbs.databases.forEach(db => console.log(`- ${db.name}`));

    // Check specific databases
    const targetDbs = ['devstream', 'test', 'DevStream'];
    
    for (const dbName of targetDbs) {
      const db = mongoose.connection.useDb(dbName);
      const collections = await db.db.listCollections().toArray();
      const hasUsers = collections.find(c => c.name === 'users');
      
      if (hasUsers) {
        const count = await db.collection('users').countDocuments();
        console.log(`\n🔍 Database [${dbName}] -> Found 'users' collection with ${count} documents`);
        if (count > 0) {
          const docs = await db.collection('users').find({}).limit(1).toArray();
          console.log(`   Sample User: ${docs[0].name} (${docs[0].email})`);
        }
      } else {
         console.log(`\n❌ Database [${dbName}] -> No 'users' collection found.`);
      }
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

testConnection();
