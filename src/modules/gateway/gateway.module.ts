import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../notification/notification.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Notification])],
  providers: [GatewayService],
  exports:[GatewayService]
})
export class GatewayModule {}
