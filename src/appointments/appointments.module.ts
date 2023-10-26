import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { EventsGateway } from './events.gateway';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, EventsGateway],
  imports: [PrismaModule, JwtModule],
})
export class AppointmentsModule {}
