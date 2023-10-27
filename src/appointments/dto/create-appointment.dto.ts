import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsEnum } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'ID of the patient',
    type: String,
  })
  @IsString()
  patientID: string;

  @ApiProperty({
    description: 'ID of the doctor',
    type: String,
  })
  @IsString()
  doctorID: string;

  @ApiProperty({
    description: 'Date and time of the appointment',
    type: Date,
  })
  @IsDate()
  datetime: Date;

  @ApiProperty({
    description: 'Status of the appointment',
    enum: ['Pending', 'Submitted', 'Accepted', 'Rejected', 'Done'],
  })
  @IsEnum(['Pending', 'Submitted', 'Accepted', 'Rejected', 'Done'])
  status: 'Pending' | 'Submitted' | 'Accepted' | 'Rejected' | 'Done';
}
