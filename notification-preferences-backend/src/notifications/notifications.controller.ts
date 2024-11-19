import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('/send')
  async sendNotification(@Body() sendNotificationDto: SendNotificationDto) {
    return this.notificationsService.sendNotification(sendNotificationDto);
  }

  @Get('/:userId/logs')
  async getUserNotificationLogs(@Param('userId') userId: string) {
    return this.notificationsService.getUserNotificationLogs(userId);
  }

  @Get('/stats')
  async getNotificationStats() {
    return this.notificationsService.getNotificationStats();
  }
}
