import { Credit } from 'src/modules/credit/credit.entity';
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
import { ProjectDetail } from '../project-detail/project-detail.entity';

@Entity('option')
export class Option extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  option: string;

  @ManyToOne(() => Credit, (credit) => credit.options)
  credit: Credit;

  @OneToMany(() => ProjectDetail, (projectDetail) => projectDetail.option)
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