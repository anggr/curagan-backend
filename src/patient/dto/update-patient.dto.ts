import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @ApiProperty({ description: 'Unique ID of the patient', required: false })
  id?: string;

  @ApiProperty({ description: 'Email of the patient', required: false })
  email?: string;

  @ApiProperty({ description: 'Password of the patient', required: false })
  password?: string;

  @ApiProperty({ description: 'Name of the patient', required: false })
  name?: string;

  @ApiProperty({ description: 'Image URL of the patient', required: false })
  imageURL?: string;
}

export class ChangePassword {
  @ApiProperty({ description: 'Old password' })
  oldPassword: string;

  @ApiProperty({ description: 'New password' })
  newPassword: string;
}
