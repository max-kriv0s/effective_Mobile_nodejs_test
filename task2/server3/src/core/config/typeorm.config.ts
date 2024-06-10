import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigurationType } from './configuration';

@Injectable()
export class TypeOrmServiceConfiguration implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService<ConfigurationType, true>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const databaseSettings = this.configService.get('databaseSettings', {
      infer: true,
    });
    const environmentSettings = this.configService.get('environmentSettings', {
      infer: true,
    });

    const settings = {
      type: databaseSettings.TYPE,
      host: databaseSettings.HOST,
      port: databaseSettings.PORT,
      username: databaseSettings.USERNAME,
      password: databaseSettings.PASSWORD,
      database: databaseSettings.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    };

    if (environmentSettings.isDevelopment) {
      settings['logging'] = ['error'];
    }

    return settings;
  }
}
