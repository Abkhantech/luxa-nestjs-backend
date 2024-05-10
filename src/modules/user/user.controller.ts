import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from './user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { VerifyPasswordDto } from '../utils/verify-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddNewUserDto } from './dto/new-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOperation({
    description: 'A successful hit can return user object',
    summary: 'Register User',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created user.',
    type: User,
  })
  @Post('/register')
  async register(@Body() body: RegisterUserDto): Promise<User> {
    try {
      return this.userService.register(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return user object',
    summary: 'Add New User',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created user.',
    type: User,
  })
  @Post('/newUser')
  async addNewUser(@Body() body: AddNewUserDto): Promise<User> {
    try {
      return this.userService.newUser(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return all user',
    summary: 'Get All User',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully Get all user.',
    type: User,
  })
  @Get(':id/allUsers')
  async getAllUser(@Param('id') id: string): Promise<User[]> {
    try {
      return this.userService.findAllUser(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return all user',
    summary: 'Get All User',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully Get all user.',
    type: User,
  })
  @Get('allUsers')
  async getAll(): Promise<User[]> {
    try {
      return this.userService.findAll();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @ApiOperation({
    description: 'A successful hit can return Jwt token',
    summary: 'Login user',
  })
  @ApiResponse({ status: 200, description: 'Login successfuly' })
  @Post('/login')
  async login(@Body() body: VerifyPasswordDto): Promise<any> {
    try {
      return this.userService.login(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return user against id',
    summary: 'Update User Against Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully update user against id.',
    type: User,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    try {
      return this.userService.update(id, body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return user against id',
    summary: 'Get User Against Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully Get user against id.',
    type: User,
  })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    try {
      return this.userService.findUserByCid(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
