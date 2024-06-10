import { IsNumber } from 'class-validator';
import { EnvironmentVariable } from '../configuration';

export class AppSettings {
  constructor(private environmentVariables: EnvironmentVariable) {}

  @IsNumber()
  PORT: number = Number.parseInt(this.environmentVariables.PORT);
}
