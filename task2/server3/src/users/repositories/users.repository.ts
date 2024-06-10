import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async generateRows() {
    return this.usersRepo.query(`
        INSERT INTO users(firstname, lastname, age, "floor", problems)
        SELECT 
            format('firstname %s', k), 
            format('lastname %s', k), 
            random()*(70-14)+14, 
            (array['male'::users_floor_enum, 'female'::users_floor_enum])[floor(random() * 2 + 1)], 
            (array [true, false])[floor(random() * 2 + 1)]
        FROM generate_series(1, 1000000) AS k
        `);
  }

  async setProblemFalse(): Promise<UpdateResult> {
    return this.usersRepo
      .createQueryBuilder()
      .update(User)
      .set({ problems: false })
      .where({ problems: true })
      .execute();
  }
}
