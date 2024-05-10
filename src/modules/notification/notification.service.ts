import { Injectable } from '@nestjs/common';
import { Notification } from './notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}
  // create(createNotificationDto: any) {
  //   return 'This action adds a new notification';
  // }

  async findAll(id: string) {
    return this.notificationRepository.find({
      where: {
        receiver: { canonical_id: id },
      },
      order: {
        created_at: 'DESC', // This orders the notifications by the `created_at` field in descending order
      },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} notification`;
  // }

  async markAllAsViewed(userId: string) {
    const  nots = await this.notificationRepository.find({
      where:{
        receiver:{
          canonical_id: userId
        }
      }
    })

    nots.map(async(notification:Notification)=>{
        notification.is_viewed = true;
        await this.notificationRepository.save(notification)
    })
    return nots
  }

  // remove(id: number) {
  //   return `This action removes a #${id} notification`;
  // }
}
