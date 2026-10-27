import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

// Shared by main.ts and the tests so both run with identical global behaviour.
export function setupApp(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableShutdownHooks();
}
