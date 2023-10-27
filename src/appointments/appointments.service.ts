import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from './events.gateway';
import { RejectionReason } from './appointment.enums';

@Injectable()
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { patientID, doctorID, datetime, status } = createAppointmentDto;

    return this.prisma.appointmentPatientDoctor.create({
      data: {
        patient: { connect: { id: patientID } },
        doctor: { connect: { id: doctorID } },
        datetime,
        status,
      },
    });
  }

  async findAppointments(id: string) {
    return await this.prisma.appointmentPatientDoctor.findMany({
      where: {
        OR: [
          {
            doctorID: id,
          },
          {
            patientID: id,
          },
        ],
      },
    });
  }

  async findOne(appointmentId: string) {
    const appointment = await this.prisma.appointmentPatientDoctor.findUnique({
      where: { appointmentId },
    });

    if (!appointment) {
      throw new NotFoundException(
        `Appointment with ID ${appointmentId} not found`,
      );
    }

    return appointment;
  }

  async update(
    appointmentId: string,
    UpdateAppointmentDto: UpdateAppointmentDto,
  ) {
    const appointment = await this.prisma.appointmentPatientDoctor.findUnique({
      where: { appointmentId },
    });

    if (!appointment) {
      throw new NotFoundException(
        `No appointment was found with the specified ID: ${appointmentId}.`,
      );
    }

    const updatedAppointment =
      await this.prisma.appointmentPatientDoctor.update({
        where: { appointmentId },
        data: {
          status: UpdateAppointmentDto.status,
        },
      });

    return updatedAppointment;
  }

  async getHistory(startDate: string, endDate: string, id: string) {
    const response = await this.prisma.appointmentPatientDoctor.findMany({
      where: {
        doctorID: id,
        datetime: {
          lte: new Date(endDate),
          gte: new Date(startDate),
        },
      },
    });
    return response;
  }
  async acceptAppointment(id: string) {
    const result = await this.prisma.appointmentPatientDoctor.update({
      where: { appointmentId: id },
      data: { status: 'Accepted' },
    });
    this.eventsGateway.server
      .to(`patient-${result.patientID}`)
      .emit('appointmentStatus', {
        id,
        status: 'Accepted',
      });
    return result;
  }

  async rejectAppointment(id: string, reason: string) {
    const result = await this.prisma.appointmentPatientDoctor.update({
      where: { appointmentId: id },
      data: { status: 'Rejected', rejectionReason: reason as any },
    });
    console.log(result.patientID);
    this.eventsGateway.server
      .to(`patient-${result.patientID}`)
      .emit('appointmentStatus', {
        id,
        status: 'Rejected',
        reason,
      });
    return result;
  }
}
