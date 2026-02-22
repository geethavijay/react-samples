import { app } from './app.js';
import { env } from './config/env.js';
import { connectMongo } from './lib/mongo.js';

async function bootstrap() {
  await connectMongo();
  app.listen(env.PORT, () => {
    console.log(`Backend listening on http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start backend', err);
  process.exit(1);
});
