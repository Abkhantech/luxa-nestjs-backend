import {
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Project } from '../project/project.entity';
import { Certification } from '../certification/certification.entity';
import { IsNumber, IsOptional } from 'class-validator';
import { RatingSystem } from '../rating-system/rating-system.entity';
import { Credit } from '../credit/credit.entity';
import { Option } from '../option/option.entity';

@Entity('project_detail')
export class ProjectDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.projectDetails)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => RatingSystem, (ratingSystem) => ratingSystem.projectDetails)
  @JoinColumn()
  rating_system: RatingSystem;

  @ManyToOne(() => Credit, (credit) => credit.projectDetails)
  @JoinColumn()
  credit: Credit;

  @ManyToOne(() => Option, (option) => option.projectDetails)
  @JoinColumn()
  option: Option;

  @IsOptional()
  @IsNumber()
  @Column({ nullable: true })
  points: number;

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