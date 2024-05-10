import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@Entity("super_admin")
export class SuperAdmin extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: true })
  full_name: string;

  @IsString()
  @IsOptional()
  @Column({ default: null, unique: true })
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: true })
  password: string;

  @IsString()
  @IsNotEmpty()
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
