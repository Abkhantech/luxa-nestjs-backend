import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsString, IsBoolean } from 'class-validator';
import { Notification_Status } from '../utils/constants';
import { User } from '../user/user.entity';

@Entity('notification')
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  description: string;

  @IsBoolean()
  @Column({ default: false })
  is_viewed: boolean;

  @IsString()
  @Column()
  type: Notification_Status;

  @ManyToOne(() => User, (sender) => sender.sender_notifications)
  @JoinColumn()
  sender: User;

  @ManyToOne(() => User, (reciver) => reciver.reciver_notifications)
  @JoinColumn()
  receiver: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
