import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ProjectLocation } from '../project-location/project-location.entity';
import { Company } from '../company/company.entity';
import { ProjectUser } from '../project-user/project-user.entity';
import { Certification } from '../certification/certification.entity';
import { ProjectDetail } from '../project-detail/project-detail.entity';
import { RatingSystem } from '../rating-system/rating-system.entity';
import { Task } from '../task/task.entity';


@Entity('project')
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ nullable: false })
  project_name: string;

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.project)
  users: ProjectUser[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @OneToMany(
    () => ProjectLocation,
    (projectLocation) => projectLocation.project,
  )
  locations: ProjectLocation[];

  @ManyToOne(() => Company, (company) => company.projects)
  company: Company;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  project_type: string;

  @IsOptional()
  @Column({ nullable: true })
  project_size: number;

  @IsOptional()
  @Column({ nullable: true })
  total_points: number;

  @IsOptional()
  @Column({ nullable: true })
  budget: number;

  @IsOptional()
  @Column({ nullable: true })
  no_of_floors: number;

  @IsNotEmpty()
  @Column()
  project_start_date: Date;

  @IsNotEmpty()
  @Column()
  estimated_end_date: Date;

  @IsOptional()
  @Column({ nullable: true })
  substantial_complete_date: Date;

  @OneToMany(() => ProjectDetail, (projectDetail) => projectDetail.project)
  projectDetails: ProjectDetail[];

  @ManyToOne(() => Certification, { nullable: true })
  @JoinColumn()
  certification: Certification;

  @ManyToMany(() => RatingSystem)
  @JoinTable()
  rating_system: RatingSystem[];

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
