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
  import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Project } from '../project/project.entity';
  
  @Entity('project-location')
  export class ProjectLocation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column({nullable:true})
    city: string;

    @IsString()
    @IsNotEmpty()
    @Column({nullable: true})
    state: string;
  
    @IsString()
    @IsOptional()
    @Column({nullable:true})
    address: string;

    @ManyToOne(()=> Project, project => project.locations)
    @JoinColumn()
    project: Project
  
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
  