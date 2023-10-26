import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { StatusModule } from './status/status.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PrismaModule } from './prisma/prisma.module';
import { EventsGateway } from './appointments/events.gateway';

@Module({
  imports: [
    DoctorModule,
    PatientModule,
    StatusModule,
    AppointmentsModule,
    PrismaModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}
