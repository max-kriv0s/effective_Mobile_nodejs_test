import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateRowsResponse } from '../responses/generateRows.response';
import { UsersRepository } from '../repositories/users.repository';

export class GenerateRowsCommand {}

@CommandHandler(GenerateRowsCommand)
export class GenerateRowsUseCase
  implements ICommandHandler<GenerateRowsCommand>
{
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute(command: GenerateRowsCommand): Promise<GenerateRowsResponse> {
    try {
      await this.usersRepo.generateRows();
      return { isSuccess: true, errorMessage: '' };
    } catch (error) {
      return { isSuccess: false, errorMessage: error.message };
    }
  }
}
