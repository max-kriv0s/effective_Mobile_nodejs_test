import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { EnvironmentVariable } from '../configuration';

export class DatabaseSettings {
  constructor(private environmentVariables: EnvironmentVariable) {}

  @IsString()
  TYPE = 'postgres' as const;

  @IsString()
  HOST = this.environmentVariables.DB_HOST;

  @IsNumber()
  PORT = Number.parseInt(this.environmentVariables.DB_PORT);

  @IsString()
  USERNAME = this.environmentVariables.DB_USER;

  @IsString()
  PASSWORD = this.environmentVariables.DB_PASSWORD;

  @IsString()
  DATABASE = this.environmentVariables.DB_NAME;

  @IsBoolean()
  SSL = this.environmentVariables.PG_TYPE_SERVER !== 'local';
}
