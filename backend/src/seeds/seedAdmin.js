require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/academia';

const run = async () => {
  try {
    await connectDB(MONGO_URI);
    const email = process.env.ADMIN_EMAIL || 'admin@academia.com';
    const senha = process.env.ADMIN_PASSWORD || 'admin123';

    let admin = await User.findOne({ email });
    if (admin) {
      console.log('Admin já existe:', email);
      process.exit(0);
    }

    admin = new User({ nome: 'Admin', email, senha, role: 'admin' });
    await admin.save();
    console.log('Admin criado:', email);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
