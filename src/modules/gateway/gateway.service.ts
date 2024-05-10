import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Notification } from '../notification/notification.entity';
import { Project } from '../project/project.entity';
import { ProjectUser } from '../project-user/project-user.entity';
import { Task } from '../task/task.entity';

@WebSocketGateway({ cors: '*' })
export class GatewayService {
  @WebSocketServer()
  server: Server;
  sendNotification(requestData: Notification) {
    this.server.emit('newNotification', requestData);
  }
  sendProjectAssignment(requestData: ProjectUser) {
    this.server.emit('sendProjectAssignment', requestData);
  }
  sendTaskAssignment(requestData: Task) {
    this.server.emit('sendTaskAssignment', requestData);
  }
}
