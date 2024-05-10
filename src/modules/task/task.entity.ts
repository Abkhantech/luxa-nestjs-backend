import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';
import { TaskStatus } from '../utils/constants';
import { Taskfile } from '../taskfile/taskfile.entity';
import { Review } from '../review/review.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ nullable: true })
  title: string;

  @IsNumber()
  @Column({ default: 0 })
  task_count: number;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  file: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  description: string;

  @IsString()
  @Column({ nullable: true })
  task_credit: string;

  @IsString()
  @Column({ nullable: true })
  task_option: string;

  @IsOptional()
  @IsString()
  @Column({ default: TaskStatus.Pendding })
  status: TaskStatus;

  @IsNotEmpty()
  @Column()
  dueDate: Date;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => User, (user) => user.assigned_tasks)
  @JoinColumn()
  assigned_user: User;

  @ManyToOne(() => User, (user) => user.created_tasks)
  @JoinColumn()
  created_by_user: User;

  @OneToMany(() => Taskfile, (taskfile) => taskfile.task)
  taskFiles: Taskfile[];

  @OneToMany(() => Review, (review) => review.task)
  reviews: Review[];

  @IsString()
  @Column({ nullable: true })
  canonical_id: string;

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
