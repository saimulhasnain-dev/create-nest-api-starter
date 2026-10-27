import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupApp } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApp(app);
  const port = app.get(ConfigService).get<number>('PORT', 3000);
  await app.listen(port);
  console.log(`listening on :${port}`);
}
bootstrap();
