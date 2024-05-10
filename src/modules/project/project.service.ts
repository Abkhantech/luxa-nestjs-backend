import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project-dto';
import { User } from '../user/user.entity';
import { ProjectUser } from '../project-user/project-user.entity';
import { ProjectLocation } from '../project-location/project-location.entity';
import { UpdateProjectDto } from './dto/update-project-dto';
import { AssignProjectDto } from './dto/assign-project.dto';
import { ProjectRatingSystemDto } from './dto/project-rating-system.dto';
import { RatingSystem } from '../rating-system/rating-system.entity';
import { Task } from '../task/task.entity';
import { MailerService } from '../utils/mailer/mailer.service';
import { Notification } from '../notification/notification.entity';
import { Notification_Status } from '../utils/constants';
import { GatewayService } from '../gateway/gateway.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(ProjectUser)
    private projectUserRepository: Repository<ProjectUser>,
    @InjectRepository(ProjectLocation)
    private projectLocationRepository: Repository<ProjectLocation>,
    @InjectRepository(RatingSystem)
    private ratingSystemRepository: Repository<RatingSystem>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private mailService: MailerService,
    private gatewayService: GatewayService,
  ) {}
  async create(body: CreateProjectDto, user: User): Promise<Project> {
    const project = await this.projectRepository
      .save(
        this.projectRepository.create({
          project_name: body.project_name,
          company: user.company,
          estimated_end_date: body.estimated_end_date,
          project_start_date: body.project_start_date,
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
    await this.projectLocationRepository
      .save(
        this.projectLocationRepository.create({
          city: body.locations.city,
          state: body.locations.state,
          address: body.locations.address,
          project: project,
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

    await this.projectUserRepository
      .save(
        this.projectUserRepository.create({
          user: user,
          project: project,
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

    const task1Title = 'Confirmation of Agent Authority Form for LEED.';
    const task1Description =
      'The agent submitting the LEED certification on behalf of the owner shall fill out the attached Confirmation of Agent’s Authority Form. This will allow the agent to register the project, sign the certification agreement, and submit the certification.';
    const task1File =
      'https://luxa-staging.s3.amazonaws.com/Confirmation-of-Agents-Authority.pdf';

    const task2Title = 'Conduct LEED Project Charrette.';
    const task2Description =
      'Before inputting credits into Luxa, hold a meeting(s) with the owner, design, engineering, and construction team to determine what rating system and credits will be achieved on the project. This is best conducted during the schematic design phase.';
    const task2File = null;

    const task3Title =
      'Register in LEED Online and Confirm Minimum Program Requirements for the LEED Project.';
    const task3Description =
      'The company managing the certification is to register and submit payment for the project in LEED Online. They should also confirm the desired certification meets the Minimum Program Requirements.';
    const task3File = null;

    const task4Title = 'Apply for Certification Review in LEED Online.';
    const task4Description =
      'Using files compiled in Luxa, the company managing the certification is to complete the certification application and submit the review fee.';
    const task4File = null;

    const updatedProject = await this.findOne(project.id);
    const adminUsers = updatedProject?.company.users?.filter((user) =>
      user.roles?.some((role) => role.role_name === 'Admin'),
    );
    await this.taskRepository
      .save(
        this.taskRepository.create({
          file: task1File,
          title: task1Title,
          description: task1Description,
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

    await this.taskRepository
      .save(
        this.taskRepository.create({
          file: task2File,
          title: task2Title,
          description: task2Description,
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

    await this.taskRepository
      .save(
        this.taskRepository.create({
          file: task3File,
          title: task3Title,
          description: task3Description,
          task_credit: 'Not Applicable',
          task_option: 'Not Applicable',
          dueDate: project.estimated_end_date,
          project: project,
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
    await this.taskRepository
      .save(
        this.taskRepository.create({
          file: task4File,
          title: task4Title,
          description: task4Description,
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
    return project;
  }

  hasDesiredRoles(rolesArray: any) {
    return rolesArray.some(
      (role: { role_name: string }) =>
        role.role_name === 'Project Manager' ||
        role.role_name === 'Sustainability Manager',
    );
  }
  async findProjectById(id: number): Promise<Project> {
    try {
      return this.projectRepository.findOne({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async getAllProjects(): Promise<Project[]> {
    try {
      return this.projectRepository.find({ relations: ['company'] });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async getProjectAgainestCompany(id: number): Promise<Project[]> {
    try {
      return this.projectRepository.find({
        where: { company: { id: id } },
        relations: ['company', 'users.user'],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: number): Promise<Project> {
    try {
      return this.projectRepository.findOne({
        where: { id: id },
        relations: [
          'certification',
          'company',
          'company.users',
          'company.users.roles',
          'rating_system',
          'projectDetails',
        ],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(id: number, body: UpdateProjectDto): Promise<Project> {
    try {
      const project = await this.findProjectById(id);
      this.projectRepository.merge(project, body);
      return this.projectRepository.save(project);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async assignProject(body: AssignProjectDto): Promise<ProjectUser> {
    try {
      let project_user;
      const project = await this.projectRepository.findOne({
        where: { id: body.project_id },
        relations: ['users'],
      });
      const previousUser = await this.userRepository.findOne({
        where: { canonical_id: body.previous_user_id },
      });
      const assign_to = await this.userRepository.findOne({
        where: { id: body.user_id },
      });
      project_user = await this.projectUserRepository.findOne({
        where: { project: { id: body.project_id }, user: { id: body.user_id } },
      });
      if (!project_user) {
        project_user = await this.projectUserRepository
          .save(
            this.projectUserRepository.create({
              user: assign_to,
              project: project,
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
        const notification = await this.notificationRepository
          .save(
            this.notificationRepository.create({
              description: `Project ${project.project_name} is assigned to you by ${previousUser.full_name}.`,
              sender: previousUser,
              receiver: assign_to,
              type: Notification_Status.Project,
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
        this.gatewayService.sendNotification(notification);
        this.gatewayService.sendProjectAssignment(project_user);
        this.mailService.sendMail(
          assign_to.email,
          `<div>
            <p>Welcome to LUXA! You are assigned by ${previousUser.full_name} email: ${previousUser.email} on ${project.project_name} project, Go to your Luxa dashboard to see it.</p>
          </div>`,
        );

        return project_user;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async attachRatingSystem(body: ProjectRatingSystemDto): Promise<Project> {
    try {
      const project = await this.findOne(body.project_id);
      const rating_system = await this.ratingSystemRepository.findOne({
        where: {
          rating_system: body.rating_system,
        },
      });

      if (!rating_system) {
        throw new Error('Rating system not found');
      }
      project.rating_system = [];
      project.rating_system.push(rating_system);

      return this.projectRepository.save(project);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
