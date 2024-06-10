import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './core/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfig);
  const port = appConfig.getPort();
  await app.listen(port, () => console.log(`Server started on port ${port}`));
}
bootstrap();
