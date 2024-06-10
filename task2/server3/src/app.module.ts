import { Module } from '@nestjs/common';
import { AppConfig } from './core/config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import configuration, { validate } from './core/config/configuration';
import { TypeOrmServiceConfiguration } from './core/config/typeorm.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.development.local', '.env.development'],
      validate,
    }),
    CqrsModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmServiceConfiguration }),
    UsersModule,
  ],
  controllers: [],
  providers: [AppConfig],
})
export class AppModule {}
