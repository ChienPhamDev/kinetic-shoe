import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  region: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  display_label: string;
}
