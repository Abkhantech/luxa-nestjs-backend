import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Option } from '../option/option.entity';
import { CreditCategory } from '../credit-category/credit-category.entity';
import { ProjectDetail } from '../project-detail/project-detail.entity';
import { RatingSystem } from '../rating-system/rating-system.entity';

@Entity('credit')
export class Credit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CreditCategory, (creditCategory) => creditCategory.credits)
  creditCategory: CreditCategory;

  @ManyToOne(() => RatingSystem, (ratingSystem) => ratingSystem.credits)
  rating_system: RatingSystem;

  @Column({ default: null, nullable: true })
  creditType: string;

  @OneToMany(() => Option, (option) => option.credit)
  options: Option[];

  @OneToMany(() => ProjectDetail, (projectDetail) => projectDetail.credit)
  projectDetails: ProjectDetail[];
  

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