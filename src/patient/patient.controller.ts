import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto, LoginPatient } from './dto/create-patient.dto';
import { ChangePassword, UpdatePatientDto } from './dto/update-patient.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { Patient } from './entities/patient.entity';
import { AuthGuard, AuthorGuard } from '../doctor/doctor.guard';
import { Request } from 'express';

@Controller('patient')
@ApiTags('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiBody({
    description: 'Register a new patient',
    type: CreatePatientDto,
  })
  @ApiCreatedResponse({
    description: 'Patient successfully registered.',
    type: Patient,
  })
  @Post('/auth/register')
  register(@Body() registerDto: CreatePatientDto) {
    return this.patientService.register(registerDto);
  }

  @ApiBody({
    description: 'Patient login credentials',
    type: LoginPatient,
  })
  @ApiCreatedResponse({
    description: 'Patient successfully logged in.',
    type: Patient,
  })
  @Post('/auth/login')
  @ApiBearerAuth()
  login(@Body() loginDto: LoginPatient) {
    return this.patientService.login(loginDto);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Patient })
  getAllPatients() {
    return this.patientService.getAllPatients();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Patient })
  getPatientById(@Param('id') id: string) {
    return this.patientService.getPatientById(id);
  }

  @ApiBody({
    description: 'Update patient details',
    type: UpdatePatientDto,
  })
  @ApiOkResponse({
    description: 'Patient details successfully updated.',
    type: Patient,
  })
  @Put('/:id')
  @UseGuards(AuthorGuard)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  updatePatient(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientService.updatePatient(id, updatePatientDto);
  }

  @Delete('/:id')
  @UseGuards(AuthorGuard)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Patient })
  deletePatient(@Param('id') id: string) {
    return this.patientService.deletePatient(id);
  }

  @Patch('/change-password/:id')
  @UseGuards(AuthorGuard)
  @UseGuards(AuthGuard)
  changePassword(
    @Param('id') id: string,
    @Body() data: ChangePassword,
    @Req() req: Request,
  ) {
    return this.patientService.changePassword(id, data, req);
  }
}
