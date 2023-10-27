import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ description: 'Unique ID of the patient' })
  id: string;

  @ApiProperty({ description: 'Email of the patient' })
  email: string;

  @ApiProperty({ description: 'Password of the patient' })
  password: string;

  @ApiProperty({ description: 'Name of the patient' })
  name: string;

  @ApiProperty({ description: 'Image URL of the patient' })
  imageURL: string;
}

export class LoginPatient {
  @ApiProperty({ description: 'Email to login' })
  email: string;

  @ApiProperty({ description: 'Password to login' })
  password: string;
}
