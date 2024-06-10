import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SetProblemsFalseResponse } from '../responses/setProblemsFalse.response';
import { UsersRepository } from '../repositories/users.repository';

export class SetProblemsFalseCommand {}

@CommandHandler(SetProblemsFalseCommand)
export class SetProblemsFalseUseCase
  implements ICommandHandler<SetProblemsFalseCommand>
{
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute(
    command: SetProblemsFalseCommand,
  ): Promise<SetProblemsFalseResponse> {
    const result = await this.usersRepo.setProblemFalse();
    return { count: result.affected };
  }
}
