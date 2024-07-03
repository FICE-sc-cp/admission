import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  admissionEmail: process.env.ADMISSION_EMAIL,
});
