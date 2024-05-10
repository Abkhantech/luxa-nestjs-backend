import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // @Post()
  // create(@Body() createNotificationDto: any) {
  //   return this.notificationService.create(createNotificationDto);
  // }

  @Get(':user_id')
  findAll(@Param('user_id') user_id: string) {
    return this.notificationService.findAll(user_id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notificationService.findOne(+id);
  // }

  @Patch('/mark-all-viewed/:userId')
  async markAllNotificationsAsViewed(@Param('userId') userId: string) {
    return this.notificationService.markAllAsViewed(userId);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notificationService.remove(+id);
  // }
}
