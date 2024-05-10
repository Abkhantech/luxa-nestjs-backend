import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SuperAdminService } from './super_admin.service';
import { SuperAdmin } from './super_admin.entity';
import { CreateSuperAdminDto } from './dto/create-super_admin.dto';
import { User } from '../user/user.entity';
import { AddAdminDto } from './dto/add-admin.dto';
import { VerifyPasswordDto } from '../utils/verify-password.dto';

@ApiTags('Super Admin')
@Controller('super_admin')
export class SuperAdminController {
  constructor(
    private superAdminService: SuperAdminService
  ) {}
  @ApiOperation({
    description: 'A successful hit can return super admin object',
    summary: 'Register super admin',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created super admin.',
    type: SuperAdmin,
  })
  @Post('/register')
  async register(@Body() body: CreateSuperAdminDto): Promise<SuperAdmin> {
    try {
      return this.superAdminService.register(body);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }
  @ApiOperation({
    description: 'A successful hit can return Jwt token',
    summary: 'Login super admin',
  })
  @ApiResponse({ status: 200, description: 'Login successfuly' })
  @Post('/login')
  async login(@Body() body: VerifyPasswordDto): Promise<any> {
    try {
      return this.superAdminService.login(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'Add admins',
    summary: 'Add Admin',
  })
  @ApiResponse({ status: 200, description: 'Added successfuly' })
  @Post('/addAdmin')
  async addAdmin(@Body() body: AddAdminDto): Promise<User> {
    try {
      return this.superAdminService.addAdmin(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'Get Super Admin By Id',
    summary: 'Get Admin By ID',
  })
  @ApiResponse({ status: 200, description: 'Added successfuly' })
  @Get(':id')
  async getSuperAdmin(@Param('id') id: string): Promise<SuperAdmin> {
    try {
      return this.superAdminService.findUserByCid(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
