import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto, Schedule } from './create-doctor.dto';
import { IsString, IsArray, IsOptional, IsEmail } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @ApiPropertyOptional({
    description: 'Unique ID of the doctor',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({
    description: 'Email of the doctor',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Name of the doctor',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Image URL of the doctor',
  })
  @IsOptional()
  @IsString()
  imageURL?: string;

  @ApiPropertyOptional({
    description: 'Location where the doctor practices',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Hospital where the doctor works',
  })
  @IsOptional()
  @IsString()
  hospital?: string;

  @ApiPropertyOptional({
    description: 'Schedule of the doctor',
    type: [Schedule],
  })
  @IsOptional()
  @IsArray()
  schedule?: Schedule[];
}

export class ChangePassword {
  @ApiPropertyOptional({
    description: 'Old password',
  })
  @IsString()
  oldPassword: string;

  @ApiPropertyOptional({
    description: 'New password',
  })
  @IsString()
  newPassword: string;
}
