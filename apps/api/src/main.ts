import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from '@arena/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(CONFIG.API_PORT);
  console.log(`Backend running on: http://localhost:${CONFIG.API_PORT}`);
}
bootstrap();
