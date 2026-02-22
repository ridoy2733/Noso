import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'database.sqlite');

const db = new Database(dbPath);

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    handle TEXT NOT NULL UNIQUE,
    avatar TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    thumbnail TEXT,
    views INTEGER DEFAULT 0,
    user_id TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Seed Data if empty
const userCount = db.prepare('SELECT count(*) as count FROM users').get() as { count: number };

if (userCount.count === 0) {
  console.log('Seeding database...');
  
  const user1Id = 'user_1';
  const user2Id = 'user_2';

  const insertUser = db.prepare('INSERT INTO users (id, name, handle, avatar) VALUES (?, ?, ?, ?)');
  insertUser.run(user1Id, 'Islamic Guidance', '@islamic_guidance', 'https://api.dicebear.com/7.x/initials/svg?seed=IG');
  insertUser.run(user2Id, 'Quran Recitations', '@quran_recitations', 'https://api.dicebear.com/7.x/initials/svg?seed=QR');

  const insertVideo = db.prepare('INSERT INTO videos (id, title, description, url, thumbnail, user_id, category, views) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  
  insertVideo.run(
    'vid_1', 
    'Beautiful Quran Recitation - Surah Al-Fatiha', 
    'A soothing recitation of Surah Al-Fatiha.', 
    'https://www.youtube.com/watch?v=F7ghLCk7fsg', 
    'https://img.youtube.com/vi/F7ghLCk7fsg/maxresdefault.jpg', 
    user2Id, 
    'Quran',
    12500
  );

  insertVideo.run(
    'vid_2', 
    'History of The Prophet\'s Mosque', 
    'Documentary about Al-Masjid an-Nabawi.', 
    'https://www.youtube.com/watch?v=J988n238n1c', 
    'https://img.youtube.com/vi/J988n238n1c/maxresdefault.jpg', 
    user1Id, 
    'History',
    8300
  );

  insertVideo.run(
    'vid_3', 
    'Understanding Ramadan', 
    'The spiritual significance of fasting.', 
    'https://www.youtube.com/watch?v=s73i-13r-b4', 
    'https://img.youtube.com/vi/s73i-13r-b4/maxresdefault.jpg', 
    user1Id, 
    'Education',
    5400
  );
  
  insertVideo.run(
    'vid_4', 
    'Call to Prayer (Adhan) - Makkah', 
    'Beautiful Adhan from Masjid Al-Haram.', 
    'https://www.youtube.com/watch?v=mUqK_fV2e_0', 
    'https://img.youtube.com/vi/mUqK_fV2e_0/maxresdefault.jpg', 
    user2Id, 
    'Adhan',
    45000
  );
}

export default db;
