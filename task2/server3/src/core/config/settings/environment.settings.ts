import { IsEnum } from 'class-validator';
import { EnvironmentVariable } from '../configuration';

export enum Environments {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test',
}

export class EnvironmentSettings {
  constructor(private environmentVariables: EnvironmentVariable) {}

  @IsEnum(Environments)
  private NODE_ENV = this.environmentVariables.NODE_ENV;

  get currentEnv() {
    return this.NODE_ENV;
  }

  get isProduction() {
    return this.NODE_ENV === Environments.PRODUCTION;
  }

  get isStaging() {
    return this.NODE_ENV === Environments.STAGING;
  }
  get isTesting() {
    return this.NODE_ENV === Environments.TEST;
  }
  get isDevelopment() {
    return this.NODE_ENV === Environments.DEVELOPMENT;
  }
  get isNonProduction() {
    return (
      this.NODE_ENV === Environments.STAGING ||
      this.NODE_ENV === Environments.TEST ||
      this.NODE_ENV === Environments.DEVELOPMENT
    );
  }
  get isNonTesting() {
    return (
      this.NODE_ENV === Environments.STAGING ||
      this.NODE_ENV === Environments.PRODUCTION ||
      this.NODE_ENV === Environments.DEVELOPMENT
    );
  }
}
