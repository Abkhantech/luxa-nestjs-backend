import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rating_System } from '../utils/constants';
import { CreditCategory } from '../credit-category/credit-category.entity';
import { ProjectDetail } from '../project-detail/project-detail.entity';
import { Credit } from '../credit/credit.entity';

@Entity('rating_system')
export class RatingSystem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  rating_system: Rating_System;

  @ManyToMany(() => CreditCategory)
  @JoinTable()
  creditCategories: CreditCategory[];

  @OneToMany(() => ProjectDetail, (projectDetail) => projectDetail.rating_system)
  projectDetails: ProjectDetail[];


  @OneToMany(() => Credit, (credit) => credit.rating_system)
  credits: Credit[];

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
