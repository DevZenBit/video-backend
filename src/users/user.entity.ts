import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movies/movie.entity';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({ example: 'John', description: 'First name' })
  @Column({ type: 'varchar', name: 'firstName', nullable: true })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @Column({ type: 'varchar', name: 'lastName', nullable: true })
  lastName: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'Email' })
  @Column({ type: 'varchar', name: 'email', unique: true })
  email: string;

  @Column({ type: 'varchar', name: 'password', select: false })
  password: string;

  @ApiProperty({ example: '2023-09-07 12:21:17.451435 +00:00' })
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @ApiProperty({ example: '2023-09-07 12:21:17.451435 +00:00' })
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @OneToMany(() => Movie, (movie) => movie.user)
  movies: Movie[];
}
