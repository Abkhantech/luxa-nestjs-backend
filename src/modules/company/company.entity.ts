import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';

@Entity('company')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  industry_type: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: true })
  address: string;

  @IsString()
  @IsOptional()
  @Column({ default: null, unique: true })
  business_phone_number: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Project, (project) => project.company)
  projects: Project[];

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
