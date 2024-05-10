import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CertificationService } from './certification.service';
import { Certification } from './certification.entity';
import { CreateCertificationDto } from './dto/create_certification.dto';

@ApiTags('Certification')
@Controller('certification')
export class CertificationController {
  constructor(private certificationService: CertificationService) {}
  @ApiOperation({
    description: 'A successful hit can create Certification',
    summary: 'Create Certification',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created Certification.',
    type: Certification,
  })
  @Post()
  async create(@Body() body: CreateCertificationDto): Promise<Certification> {
    try {
      return this.certificationService.createCertification(body);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can Get All Certifications',
    summary: 'Get All Certifications',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully Get All Certifications.',
    type: Certification,
  })
  @Get()
  async getAllCertification(): Promise<Certification[]> {
    try {
      return this.certificationService.getCertification();
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }
}
