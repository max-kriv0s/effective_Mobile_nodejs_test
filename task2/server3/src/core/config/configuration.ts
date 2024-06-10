import { ValidateNested, validateSync } from 'class-validator';
import { DatabaseSettings } from './settings/database.settings';
import { EnvironmentSettings } from './settings/environment.settings';
import { AppSettings } from './settings/app.settings';

export type EnvironmentVariable = { [key: string]: string };
export type ConfigurationType = Configuration;
export type AppSettingsType = ConfigurationType['appSettings'];
export type DatabaseSettingsType = ConfigurationType['databaseSettings'];
export type EnvironmentSettingsType = ConfigurationType['environmentSettings'];

class Configuration {
  @ValidateNested()
  appSettings: AppSettings;

  @ValidateNested()
  databaseSettings: DatabaseSettings;

  @ValidateNested()
  environmentSettings: EnvironmentSettings;

  constructor(configuration: Configuration) {
    Object.assign(this, configuration);
  }
  static createConfig(
    environmentVariables: EnvironmentVariable,
  ): Configuration {
    return new this({
      appSettings: new AppSettings(environmentVariables),
      databaseSettings: new DatabaseSettings(environmentVariables),
      environmentSettings: new EnvironmentSettings(environmentVariables),
    });
  }
}

export function validate(environmentVariables: Record<string, string>) {
  console.log('process.env.NODE_ENV = ', environmentVariables.NODE_ENV);
  const config = Configuration.createConfig(environmentVariables);
  const errors = validateSync(config, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
}

export default () => {
  const environmentVariables = process.env as EnvironmentVariable;
  console.log('process.env.NODE_ENV = ', environmentVariables.NODE_ENV);
  return Configuration.createConfig(environmentVariables);
};
