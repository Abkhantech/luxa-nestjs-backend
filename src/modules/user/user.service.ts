import { Repository } from 'typeorm';
import { AuthService } from '../utils/auth/auth.service';
import { MailerService } from '../utils/mailer/mailer.service';
import { User } from './user.entity';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateRoleDto } from '../role/dto/create-role.dto';
import { Role } from '../role/role.entity';
import { VerifyPasswordDto } from '../utils/verify-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as crypto from 'crypto';
import { AddNewUserDto } from './dto/new-user.dto';
import { Project } from '../project/project.entity';
import { ProjectUser } from '../project-user/project-user.entity';
import { Task } from '../task/task.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(ProjectUser)
    private projectUserRepository: Repository<ProjectUser>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private authService: AuthService,
    private mailService: MailerService,
  ) {}
  async register(body: RegisterUserDto): Promise<User> {
    const previousUser = await this.findUserByCid(body.admin_id);

    const user = await this.userRepository
      .save(
        this.userRepository.create({
          email: body.email,
          company: previousUser.company,
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
    hash.update(user.id.toString());
    const canonicalID = hash.digest('hex');
    user.canonical_id = canonicalID;
    await this.userRepository.save(user);
    const link = `http://staging-luxa-web-env.eba-32fhjigh.us-east-1.elasticbeanstalk.com/landing-onboard-page/${user.canonical_id}`;
    if (body.roles) {
      body.roles.map(async (role: CreateRoleDto) => {
        await this.roleRepository.save(
          this.roleRepository.create({
            role_name: role.role_name,
            user: user,
          }),
        );
      });
    }
    const email = this.mailService.sendMail(
      body.email,
      `<div>
      <p>Welcome to LUXA! Click on the following link to register : ${link}</p>
    </div>`,
    );
    return user;
  }

  async newUser(body: AddNewUserDto): Promise<User> {
    const previousUser = await this.findUserByCid(body.user_id);

    const user = await this.userRepository
      .save(
        this.userRepository.create({
          email: body.email,
          company: previousUser.company,
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
    hash.update(user.id.toString());
    const canonicalID = hash.digest('hex');
    user.canonical_id = canonicalID;
    await this.userRepository.save(user);
    const project = await this.projectRepository.findOne({
      where: { id: body.project_id },
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
    const link = `http://staging-luxa-web-env.eba-32fhjigh.us-east-1.elasticbeanstalk.com/landing-onboard-page/${user.canonical_id}`;
    if (body.roles) {
      body.roles.map(async (role: CreateRoleDto) => {
        await this.roleRepository.save(
          this.roleRepository.create({
            role_name: role.role_name,
            user: user,
          }),
        );
      });
    }

    if (!!body.task_id) {
      const task = await this.taskRepository.findOne({
        where: { id: body.task_id },
      });
      task.assigned_user = user;
      await this.taskRepository.save(task);

      this.mailService.sendMail(
        body.email,
        `<div>
          <p>Welcome to LUXA! You are invited by ${previousUser.full_name} email: ${previousUser.email} on ${project.project_name} project with task ${task.title} , Click on the following link to register : ${link}</p>
        </div>`,
      );
    }

    this.mailService.sendMail(
      body.email,
      `<div>
      <p>Welcome to LUXA! You are invited by ${previousUser.full_name} email: ${previousUser.email} on ${project.project_name} project, Click on the following link to register : ${link}</p>
    </div>`,
    );
    return user;
  }

  async login(body: VerifyPasswordDto): Promise<any> {
    const user = await this.findUserByEmail(body.email);
    if (user && user.password) {
      if (await bcrypt.compare(body.password, user.password)) {
        const jwt = this.authService.generateToken({
          id: user.id,
          phonenumber: user.mobile_number,
          email: user.email,
          canonical_id: user.canonical_id,
        });
        return { jwt: jwt, user: user };
      }
      throw new UnauthorizedException('Invalid Email or Password');
    }
    throw new UnauthorizedException('Invalid Email or Password');
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: {
          email: email,
        },
        relations: ['company', 'roles'],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findUserById(id: number): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: ['company', 'roles'],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findUserByCid(id: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: {
          canonical_id: id,
        },
        relations: ['company', 'roles'],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findAllUser(id: string): Promise<User[]> {
    try {
      const user = await this.findUserByCid(id);
      return this.userRepository.find({
        where: { company: { id: user.company.id } },
        relations: ['roles', 'company', 'projects.project'],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userRepository.find({
        relations: ['roles', 'company', 'projects.project'],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  
  async update(id: string, body: UpdateUserDto): Promise<User> {
    try {
      let user = await this.findUserByCid(id);
      if (body.password && body.confirm_password) {
        if (body.password !== body.confirm_password) {
          throw new UnauthorizedException(
            'Password and confirm password should be same',
          );
        }
        body.password = await bcrypt.hash(body.password, 10);
      }
      this.userRepository.merge(user, { ...body, is_on_boarded: true });
      return this.userRepository.save(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
