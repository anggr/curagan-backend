import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { Appointment } from './entities/appointment.entity';
import { AuthGuard, RoleGuard, Roles } from '../doctor/doctor.guard';
import { RejectionReason } from './appointment.enums';

@Controller('appointments')
@ApiTags('appointments')
export class AppointmentsController {
  constructor(private readonly AppointmentsService: AppointmentsService) {}

  @ApiBody({ type: CreateAppointmentDto })
  @ApiCreatedResponse({
    description: 'Appointment successfully created.',
    type: Appointment,
  })
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  create(@Body() CreateAppointmentDto: CreateAppointmentDto) {
    return this.AppointmentsService.create(CreateAppointmentDto);
  }

  @ApiOkResponse({
    description: 'List of appointments for a given ID',
    type: [Appointment],
  })
  @Get('/my-appointments/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  findAppointments(@Param('id') id: string) {
    return this.AppointmentsService.findAppointments(id);
  }

  @ApiOkResponse({
    description: 'Detail of an appointment',
    type: Appointment,
  })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.AppointmentsService.findOne(id);
  }

  @ApiBody({ type: UpdateAppointmentDto })
  @ApiOkResponse({
    description: 'Appointment successfully updated.',
    type: Appointment,
  })
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @Roles('doctor')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.AppointmentsService.update(id, updateAppointmentDto);
  }

  @ApiOkResponse({
    description: 'List of appointments within a date range',
    type: [Appointment],
  })
  @Get('/history/:doctorId/')
  @UseGuards(AuthGuard)
  getHistory(
    @Query('start') start: string,
    @Query('end') end: string,
    @Param('doctorId') id: string,
  ) {
    return this.AppointmentsService.getHistory(start, end, id);
  }

  @ApiOkResponse({
    description: 'Appointment successfully accepted.',
    type: Appointment,
  })
  @Post('/:id/accept')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async acceptAppointment(@Param('id') id: string) {
    return this.AppointmentsService.acceptAppointment(id);
  }

  @ApiBody({
    description: 'Reason for rejecting an appointment',
    schema: {
      type: 'object',
      properties: {
        reason: {
          type: 'string',
          enum: Object.values(RejectionReason),
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Appointment successfully rejected.',
    type: Appointment,
  })
  @Post('/:id/reject')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async rejectAppointment(
    @Param('id') id: string,
    @Body('reason') reason: string,
  ) {
    const reasonEnum = RejectionReason[reason as keyof typeof RejectionReason];
    return this.AppointmentsService.rejectAppointment(id, reasonEnum);
  }
}
