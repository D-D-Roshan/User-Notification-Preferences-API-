import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog, NotificationLogDocument } from './notifications.schema';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationLog.name) private notificationLogModel: Model<NotificationLogDocument>,
  ) {}

  async sendNotification(sendNotificationDto: SendNotificationDto): Promise<any> {
    const { userId, type, channel } = sendNotificationDto;

    const log = new this.notificationLogModel({
      userId,
      type,
      channel,
      status: 'pending',
      metadata: {},
    });

    try {
      // Simulate sending notification
      console.log(`Sending ${type} notification via ${channel} to user ${userId}`);

      log.status = 'sent';
      log.sentAt = new Date();
    } catch (error) {
      log.status = 'failed';
      log.failureReason = error.message;
    }

    await log.save();
    return log;
  }

  async getUserNotificationLogs(userId: string) {
    return this.notificationLogModel.find({ userId });
  }

  async getNotificationStats() {
    const sentCount = await this.notificationLogModel.countDocuments({ status: 'sent' });
    const failedCount = await this.notificationLogModel.countDocuments({ status: 'failed' });
    return { sent: sentCount, failed: failedCount };
  }
}
