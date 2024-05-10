import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ProjectDetail } from './project-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDetailDto } from './dto/create-project-detail.dto';
import { Project } from '../project/project.entity';
import { RatingType } from '../utils/constants';
import { Certification } from '../certification/certification.entity';
import { CreditOptionDto } from './dto/credit-option.dto';
import { Task } from '../task/task.entity';
import { Credit } from '../credit/credit.entity';
import { Option } from '../option/option.entity';

@Injectable()
export class ProjectDetailService {
  constructor(
    @InjectRepository(ProjectDetail)
    private projectDetailRepository: Repository<ProjectDetail>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async create(body: CreateProjectDetailDto): Promise<ProjectDetail> {
    const previousProjectDetail = await this.findProjectDetails(
      body.project_id,
      body.option_id,
      body.rating_system_id,
      body.credit_id,
    );
    let projectDetail;
    let sum = 0;
    const project = await this.projectRepository.findOne({
      where: { id: body.project_id },
      relations: ['company', 'company.users', 'company.users.roles'],
    });
    if (!previousProjectDetail) {
      projectDetail = await this.projectDetailRepository
        .save(
          this.projectDetailRepository.create({
            project: { id: body.project_id },
            credit: { id: body.credit_id },
            option: { id: body.option_id },
            rating_system: { id: body.rating_system_id },
            points: body.point,
          }),
        )
        .catch((err: any) => {
          console.log(err);
          throw new HttpException(
            {
              message: `${err}`,
            },
            HttpStatus.CONFLICT,
          );
        });
      const adminUsers = project?.company.users?.filter((user) =>
        user.roles?.some((role) => role.role_name === 'Admin'),
      );
      const credit = await this.creditRepository.findOne({
        where: { id: body.credit_id },
      });
      const option = await this.optionRepository.findOne({
        where: { id: body.option_id },
      });
      await this.taskRepository
        .save(
          this.taskRepository.create({
            file: null,
            title: `Submit Required Documentation for ${credit.creditType} (Credit), ${option.option}(Option)  Credit.`,
            description:
              'Submit required documentation for this credit. The required documentation can be found by using LUXA AI, following the steps at https://leedonline-api.usgbc.org/Credit/sampleForm, or LEED Online.',
            task_credit: 'Not Applicable',
            task_option: 'Not Applicable',
            project: project,
            dueDate: project.estimated_end_date,
            created_by_user: adminUsers[0],
          }),
        )
        .catch((err: any) => {
          console.log(err);
          throw new HttpException(
            {
              message: `${err}`,
            },
            HttpStatus.CONFLICT,
          );
        });
    } else {
      previousProjectDetail.points = body.point;

      projectDetail = await this.projectDetailRepository.save(
        previousProjectDetail,
      );
    }
    const projectDetails = await this.findAll(body.project_id);
    sum = projectDetails.reduce(
      (total, projectDetail) => total + projectDetail.points,
      0,
    );

    project.total_points = sum;
    const certification_name = this.CheckCertification(sum);
    const certification = await this.findCertification(certification_name);
    project.certification = certification;
    await this.projectRepository.save(project);

    return projectDetail;
  }

  CheckCertification(points: number): RatingType {
    if (points >= 40 && points <= 49) {
      return RatingType.Certified;
    } else if (points >= 50 && points <= 59) {
      return RatingType.Silver;
    } else if (points >= 60 && points <= 69) {
      return RatingType.Gold;
    } else if (points >= 70) {
      return RatingType.Platinum;
    }
  }

  async findAll(project_id: number): Promise<ProjectDetail[]> {
    try {
      return this.projectDetailRepository.find({
        where: {
          project: { id: project_id },
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async projectDetailWithOption(body: CreditOptionDto) {
    try {
      const projectDetail = await this.projectDetailRepository.find({
        where: {
          project: { id: body.project_id },
          credit: { creditType: body.creditType },
        },
        relations: ['option'],
      });
      const newArray = projectDetail.map((item) => item.option);
      return newArray;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findProjectDetails(
    project_id: number,
    option_id: number,
    rating_system_id: number,
    credit_id: number,
  ): Promise<ProjectDetail> {
    try {
      return this.projectDetailRepository.findOne({
        where: {
          project: { id: project_id },
          option: { id: option_id },
          credit: { id: credit_id },
          rating_system: { id: rating_system_id },
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findCertification(name: RatingType): Promise<Certification> {
    try {
      if (!!name) {
        return this.certificationRepository.findOne({
          where: {
            certificationType: name,
          },
        });
      } else {
        return null;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async optionProjectDetails(
    project_id: number,
    rating_system_id: number,
    credit_id: number,
  ): Promise<ProjectDetail[]> {
    try {
      return this.projectDetailRepository.find({
        where: {
          project: { id: project_id },
          credit: { id: credit_id },
          rating_system: { id: rating_system_id },
        },
        relations: ['option', 'credit'],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async projectDetails(id: any): Promise<ProjectDetail[]> {
    try {
      return this.projectDetailRepository.find({
        where: {
          project: { id: id },
        },
        relations: [
          'option',
          'credit',
          'rating_system',
          'credit.creditCategory',
          'credit.options',
        ],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
