import { List } from 'src/list/entities/list.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => List, (list) => list.user)
  @JoinColumn({ name: 'itemList' })
  list: List[];
}
