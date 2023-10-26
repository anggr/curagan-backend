import { PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator'; 
import { CreateAppointmentDto } from './create-appointment.dto';
import { RejectionReason } from '../appointment.enums'; 

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsEnum(RejectionReason, { each: true })
  rejectionReason?: RejectionReason;
}
