import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GenerateRowsUseCase } from './usecases/generateRows.usecase';
import { UsersRepository } from './repositories/users.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { SetProblemsFalseUseCase } from './usecases/setProblemsFalse.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UsersController],
  providers: [GenerateRowsUseCase, UsersRepository, SetProblemsFalseUseCase],
})
export class UsersModule {}
