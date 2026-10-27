import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config';
import { HealthController } from './health.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }), UsersModule],
  controllers: [HealthController],
})
export class AppModule {}
