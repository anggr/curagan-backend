import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Put,
  Patch,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, LoginDto } from './dto/create-doctor.dto';
import { ChangePassword, UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard, AuthorGuard, RoleGuard, Roles } from './doctor.guard';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { Doctor } from './entities/doctor.entity';
import { Request } from 'express';

@Controller('doctor')
@ApiTags('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiBody({
    description: 'Doctor login credentials',
    type: LoginDto,
  })
  @ApiCreatedResponse({
    description: 'Doctor successfully logged in.',
    type: Doctor,
  })
  @Post('/auth/login')
  @ApiBearerAuth()
  login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return this.doctorService.login(loginDto, req);
  }

  @ApiBody({
    description: 'Create a new doctor',
    type: CreateDoctorDto,
  })
  @ApiCreatedResponse({
    description: 'Doctor successfully registered.',
    type: Doctor,
  })
  @Post('/auth/register')
  register(@Body() registerDto: CreateDoctorDto) {
    return this.doctorService.register(registerDto);
  }

  // FILTER DOCTOR BY NAME, LOCATION AND HOSPITAL
  @ApiQuery({
    name: 'name',
    description: 'Name of the doctor to search',
    required: false,
    type: String,
  })
  @ApiOkResponse({
    description: 'Doctors that match the query',
    type: Doctor,
    isArray: true,
  })
  @Get('/query')
  searchDoctor(@Query('name') name: string) {
    return this.doctorService.searchDoctor(name);
  }

  @Get('/')
  @ApiOkResponse({ type: Doctor, isArray: true })
  @ApiQuery({
    name: 'q',
    description: 'search all doctors',
    required: false,
    type: String,
  })
  getAll() {
    return this.doctorService.getAllDoctor();
  }

  @Get('/:id')
  @ApiOkResponse({ type: Doctor })
  getDoctorById(@Param('id') id: string) {
    return this.doctorService.getDoctorById(id);
  }

  @ApiBody({
    description: 'Update doctor details',
    type: UpdateDoctorDto,
  })
  @ApiOkResponse({
    description: 'Doctor details successfully updated.',
    type: Doctor,
  })
  @Put('/:id')
  @UseGuards(AuthorGuard)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  updateDoctor(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return this.doctorService.updateDoctor(id, updateDoctorDto);
  }

  @Delete('/:id')
  @UseGuards(AuthorGuard)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Doctor })
  deleteDoctor(@Param('id') id: string, @Req() req: Request) {
    return this.doctorService.deleteDoctor(id, req);
  }

  @Patch('/change-password/:id')
  @UseGuards(AuthorGuard)
  @UseGuards(AuthGuard)
  changePassword(
    @Param('id') id: string,
    @Body() data: ChangePassword,
    @Req() req: Request,
  ) {
    return this.doctorService.changePassword(id, data, req);
  }
}
