import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Floor } from '../enums/floor.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: Floor })
  floor: Floor;

  @Column()
  problems: boolean;
}
