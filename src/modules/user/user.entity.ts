import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectUser } from '../project-user/project-user.entity';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { Role } from '../role/role.entity';
import { Company } from '../company/company.entity';
import { Task } from '../task/task.entity';
import { Notification } from '../notification/notification.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsString()
  @Column({ nullable: true })
  full_name: string;

  @IsString()
  @IsOptional()
  @Column({ default: null, unique: true })
  mobile_number: string;

  @IsString()
  @IsOptional()
  @Column({ default: null })
  username: string;

  @IsString()
  @Column({ nullable: true })
  password: string;

  @IsString()
  @Column({ nullable: true })
  trade_type: string;

  @IsString()
  @Column({ nullable: true })
  credentials: string;

  @IsString()
  @Column({ nullable: true })
  canonical_id: string;

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.user)
  projects: ProjectUser[];

  @OneToMany(() => Notification, (notification) => notification.sender)
  sender_notifications: Notification[];

  @OneToMany(() => Notification, (notification) => notification.receiver)
  reciver_notifications: Notification[];

  @OneToMany(() => Task, (task) => task.assigned_user)
  assigned_tasks: Task[];

  @OneToMany(() => Task, (task) => task.created_by_user)
  created_tasks: Task[];

  @OneToMany(() => Role, (role) => role.user)
  roles: Role[];

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn()
  company: Company;

  @IsBoolean()
  @Column({ default: false })
  is_on_boarded: boolean;

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
