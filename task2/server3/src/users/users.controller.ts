import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GenerateRowsResponse } from './responses/generateRows.response';
import { GenerateRowsCommand } from './usecases/generateRows.usecase';
import { SetProblemsFalseCommand } from './usecases/setProblemsFalse.usecase';
import { SetProblemsFalseResponse } from './responses/setProblemsFalse.response';

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/generate-rows')
  async generateRows(): Promise<GenerateRowsResponse> {
    return this.commandBus.execute(new GenerateRowsCommand());
  }

  @Post('set-problems-false')
  async setProblemsFalse(): Promise<SetProblemsFalseResponse> {
    return this.commandBus.execute(new SetProblemsFalseCommand());
  }
}
