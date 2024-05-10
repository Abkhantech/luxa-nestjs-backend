import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class VerifyPasswordDto {
  @ApiProperty({
    description: 'Email',
    example: 'wahab.arshad@projectluxa.org',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'MWahab786',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
