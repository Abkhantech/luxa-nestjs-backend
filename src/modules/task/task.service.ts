import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';
import { AssignTaskDto } from './dto/assign-task.dto';
import { ProjectUser } from '../project-user/project-user.entity';

import * as crypto from 'crypto';
import { S3Service } from '../utils/s3/s3.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Notification_Status, TaskStatus } from '../utils/constants';
import { MailerService } from '../utils/mailer/mailer.service';
import { Notification } from '../notification/notification.entity';
import { GatewayService } from '../gateway/gateway.service';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ProjectUser)
    private projectUserRepository: Repository<ProjectUser>,
    private readonly s3Service: S3Service,
    private mailService: MailerService,
    private gatewayService: GatewayService,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}
  async createTask(files: any, body: CreateTaskDto) {
    try {
      const project = await this.projectRepository.findOne({
        where: { id: body.project_id },
      });
      const user = await this.userRepository.findOne({
        where: { canonical_id: body.user_id },
      });

      const task = await this.taskRepository
        .save(
          this.taskRepository.create({
            ...body,
            project: project,
            created_by_user: user,
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
      const hash = crypto.createHash('sha256');
      hash.update(task.id.toString());
      const canonicalID = hash.digest('hex');
      const link = await this.s3Service.uploadFile(
        files['input_file'][0],
        `${canonicalID}Luxa_File`,
      );
      task.file = link.Location;
      task.canonical_id = canonicalID;
      await this.taskRepository.save(task);
      return task;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async findAll(id: number) {
    try {
      return this.taskRepository.find({
        where: { project: { id: id } },
        relations: [
          'created_by_user',
          'created_by_user.roles',
          'assigned_user.roles',
          'assigned_user',
          'taskFiles',
          'reviews',
        ],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: number) {
    return this.taskRepository.findOne({
      where: { id },
      relations: [
        'taskFiles',
        'assigned_user',
        'assigned_user.roles',
        'created_by_user.roles',
        'created_by_user',
        'project',
        'reviews',
      ],
    });
  }
  async findOneWithCid(id: string) {
    return this.taskRepository.findOne({
      where: { canonical_id: id },
      relations: [
        'taskFiles',
        'assigned_user',
        'assigned_user.roles',
        'created_by_user',
        'reviews',
        'created_by_user.roles',
      ],
    });
  }
  async assignTask(body: AssignTaskDto) {
    try {
      let task: Task;
      const project = await this.projectRepository.findOne({
        where: { id: body.project_id },
      });
      task = await this.findOne(body.task_id);
      task.assigned_user = body.assigned_user;
      const project_User = await this.projectUserRepository.findOne({
        where: {
          project: { id: body.project_id },
          user: { id: body.assigned_user.id },
        },
      });

      if (!project_User) {
        const project_user = await this.projectUserRepository
          .save(
            this.projectUserRepository.create({
              project: project,
              user: body.assigned_user,
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
        this.gatewayService.sendProjectAssignment(project_user);
      }
      const notification = await this.notificationRepository
        .save(
          this.notificationRepository.create({
            description: `A new task ${task.title} has been assigned to you by ${task.created_by_user.full_name} on Project - ${project.project_name}.`,
            sender: task.created_by_user,
            receiver: body.assigned_user,
            type: Notification_Status.Task,
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
      this.gatewayService.sendTaskAssignment(task);

      this.mailService.sendMail(
        body.assigned_user?.email,
        `<div>
        <p>Following Task has been assigned to you by ${task.created_by_user.full_name} on Project  ${project.project_name}<br/>Task Name: ${task.title}<br/>Please go to your LUXA Dashboard in order to view it.</p>
      </div>`,
      );

      return this.taskRepository.save(task);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async updateStatus(id: number, body: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.status = body.status;
    const notification = await this.notificationRepository
      .save(
        this.notificationRepository.create({
          description: `Task ${task.title} has been marked as completed by ${task.assigned_user?.full_name} on Project - ${task.project?.project_name}. Please review it.`,
          sender: task.assigned_user,
          receiver: task.created_by_user,
          type: Notification_Status.Task,
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
    this.gatewayService.sendTaskAssignment(task);
    this.mailService.sendMail(
      task.created_by_user?.email,
      `<div>
      <p>Following Task has been Completed by ${task.assigned_user?.full_name} on Project  ${task.project?.project_name}<br/>Task Name: ${task.title}<br/>Please go to your LUXA Dashboard in order to review it.</p>
    </div>`,
    );
    return this.taskRepository.save(task);
  }
  async updateTaskStatus(id: string, body: UpdateTaskDto): Promise<Task> {
    const task = await this.findOneWithCid(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.status = body.status;
    return this.taskRepository.save(task);
  }
}
