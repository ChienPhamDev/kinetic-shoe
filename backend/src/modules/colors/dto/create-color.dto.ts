import { IsHexColor, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  @IsHexColor()
  @IsNotEmpty()
  hex_code: string;
}
