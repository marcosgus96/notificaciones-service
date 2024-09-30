import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificacionesController } from './notificaciones.controller';
import { EmailService } from './email.service';

@Module({
  imports: [],
  controllers: [AppController, NotificacionesController],
  providers: [AppService, EmailService],
})
export class AppModule {}
