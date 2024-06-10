import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppSettingsType, ConfigurationType } from './configuration';

@Injectable()
export class AppConfig {
  private appSettings: AppSettingsType;
  constructor(
    private readonly configService: ConfigService<ConfigurationType, true>,
  ) {
    this.appSettings = configService.get('appSettings', {
      infer: true,
    });
  }

  getPort(): number {
    return this.appSettings.PORT;
  }
}
