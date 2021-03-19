import env from 'dotenv';
env.config();

export default {
  uri: process.env.MONGO_URL!
};
