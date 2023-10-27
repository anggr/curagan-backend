import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Specialization {
  Umum = 'Umum',
  Jantung = 'Jantung',
  Kulit = 'Kulit',
  Lambung = 'Lambung',
  Darah = 'Darah',
  Penyakit_Menular = 'Penyakit_Menular',
  Ginjal = 'Ginjal',
  Saraf = 'Saraf',
  Kandungan = 'Kandungan',
  Kanker = 'Kanker',
  Mata = 'Mata',
  Tulang = 'Tulang',
  THT = 'THT',
  Anak = 'Anak',
  Jiwa = 'Jiwa',
  Paru_Paru = 'Paru_Paru',
  Radiologi = 'Radiologi',
  Rematologi = 'Rematologi',
  Urologi = 'Urologi',
  Bedah_Umum = 'Bedah_Umum',
}
export class Schedule {
  @ApiProperty({
    description: 'Day of the week',
    example: 'Monday',
  })
  @IsString()
  days: string;

  @ApiProperty({
    description: 'Available time slots',
    example: [9, 10, 11],
  })
  @IsArray()
  time: number[];
}

export class CreateDoctorDto {
  @ApiProperty({
    description: 'Unique ID of the doctor',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Email of the doctor',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the doctor',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Name of the doctor',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Image URL of the doctor',
  })
  @IsString()
  imageURL: string;

  @ApiProperty({
    description: 'Location where the doctor practices',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Hospital where the doctor works',
  })
  @IsString()
  hospital: string;

  @ApiProperty({
    description: 'Schedule of the doctor',
    type: [Schedule],
  })
  @IsArray()
  schedule: Schedule[];
}

export class LoginDto {
  @ApiProperty({
    description: 'Doctor email for login',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for login',
  })
  @IsString()
  password: string;
}

export class SearchDoctor {
  @ApiProperty({
    description: 'Name of the doctor to search',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Location to search',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Hospital to search',
  })
  @IsString()
  hospital: string;
}

export class DoctorDto {
  @ApiProperty({
    description: 'Doctor ID',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Doctor Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Doctor Password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Doctor Name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Doctor Image URL',
  })
  @IsString()
  imageURL: string;

  @ApiProperty({
    description: 'Doctor Location',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Doctor Hospital',
  })
  @IsString()
  hospital: string;

  @ApiProperty({
    description: 'Doctor Schedule',
  })
  @IsString()
  schedule: string;
}
