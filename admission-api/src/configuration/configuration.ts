import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  frontendUrl: process.env.FRONTEND_URL,
  nodeEnv: process.env.NODE_ENV,
  smtp: {
    host: process.env.SMTP_HOST,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
  botToken: process.env.ADMISSION_BOT_TOKEN,
  botApi: process.env.ADMISSION_BOT_API,
});
