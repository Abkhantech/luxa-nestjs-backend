import { Repository } from 'typeorm';
import { AuthService } from '../utils/auth/auth.service';
import { MailerService } from '../utils/mailer/mailer.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SuperAdmin } from './super_admin.entity';
import { CreateSuperAdminDto } from './dto/create-super_admin.dto';
import { AddAdminDto } from './dto/add-admin.dto';
import { User } from '../user/user.entity';
import { Company } from '../company/company.entity';
import { Role } from '../role/role.entity';
import { VerifyPasswordDto } from '../utils/verify-password.dto';
import { Roles } from '../utils/constants';
import * as crypto from 'crypto';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectRepository(SuperAdmin)
    private superAdminRepository: Repository<SuperAdmin>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private authService: AuthService,
    private mailerService: MailerService,
  ) {}

  async addAdmin(body: AddAdminDto): Promise<User> {
    try {
      const company = await this.companyRepository
        .save(
          this.companyRepository.create({
            name: body.company.name,
            business_phone_number: body.company.business_phone_number,
            address: body.company.address,
            industry_type: body.company.industry_type,
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
      const user = await this.userRepository
        .save(
          this.userRepository.create({
            email: body.email,
            company: company,
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
      const role = await this.roleRepository
        .save(
          this.roleRepository.create({
            role_name: Roles.Admin,
            user: user,
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
         this.mailerService.sendMail(
          body.email,
          `<div>
          <p>Welcome to LUXA! Click on the following link to register : ${link}</p>
          </div>`,
        );
      return user;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async register(body: CreateSuperAdminDto): Promise<SuperAdmin> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const superAdmin = await this.superAdminRepository
      .save(
        this.superAdminRepository.create({
          email: body.email,
          full_name: body.full_name,
          mobile_number: body.mobile_number,
          password: hashedPassword,
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
    hash.update(superAdmin.id.toString());
    const canonicalID = hash.digest('hex');
    superAdmin.canonical_id = canonicalID;
    await this.superAdminRepository.save(superAdmin);
    return superAdmin;
  }

  async login(body: VerifyPasswordDto): Promise<any> {
    const superAdmin = await this.findUserByEmail(body.email);
    if (
      superAdmin &&
      (await bcrypt.compare(body.password, superAdmin.password))
    ) {
      const jwt = this.authService.generateToken({
        id: superAdmin.id,
        phonenumber: superAdmin.mobile_number,
        email: superAdmin.email,
        canonical_id: superAdmin.canonical_id,
      });

      return { jwt: jwt, superAdmin: superAdmin };
    }
    throw new UnauthorizedException('Invalid Email or Password');
  }

  async findUserByEmail(email: string): Promise<SuperAdmin> {
    try {
      return this.superAdminRepository.findOne({
        where: {
          email: email,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findUserById(id: number): Promise<SuperAdmin> {
    try {
      return this.superAdminRepository.findOne({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findUserByCid(id: string): Promise<SuperAdmin> {
    try {
      return this.superAdminRepository.findOne({
        where: {
          canonical_id: id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
