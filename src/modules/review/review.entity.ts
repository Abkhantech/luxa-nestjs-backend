import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from '../task/task.entity';
import { ReviewStatus } from '../utils/constants';

@Entity('Review')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ nullable: true })
  title: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  file: string;

  @IsOptional()
  @IsString()
  @Column({ default: ReviewStatus.Closed })
  reviewStatus: ReviewStatus;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  description: string;

  @IsNotEmpty()
  @Column({ nullable: true })
  dueDate: Date;

  @ManyToOne(() => Task, (task) => task.reviews)
  @JoinColumn()
  task: Task;

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
