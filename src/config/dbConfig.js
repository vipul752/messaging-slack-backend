import mongoose from 'mongoose';
import { NODE_ENV, DEV_DB_URL, PROD_DB_URL } from './serverConfig.js';

export default async function connectDB() {
  try {
    if (NODE_ENV === 'development') {
      await mongoose.connect(DEV_DB_URL);
    } else if (NODE_ENV === 'production') {
      await mongoose.connect(PROD_DB_URL);
    }

    console.log('connected to mongodb database', NODE_ENV);
  } catch (error) {
    console.log(error);
  }
}
