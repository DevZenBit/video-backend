import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity('movies')
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'The Lord of the Rings' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ example: 2001 })
  @Column({ type: 'int', name: 'publishingYear' })
  publishingYear: number;

  @ApiProperty({ example: 'https://pasth-to-your-poster.com' })
  @Column({ type: 'varchar', length: 255, name: 'poster' })
  poster: string;

  @ManyToOne(() => User, (user) => user.movies)
  @JoinColumn({ name: 'userId' })
  user: User;
}
