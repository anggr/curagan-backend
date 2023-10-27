import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { RejectionReason } from '../appointment.enums';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @ApiProperty({
    description: 'Reason for rejecting the appointment',
    enum: RejectionReason,
    required: false,
  })
  @IsEnum(RejectionReason)
  rejectionReason?: RejectionReason;
}
