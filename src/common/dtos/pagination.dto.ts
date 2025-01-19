import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'Amount of items per page',
  })
  @IsOptional()
  @IsPositive()
  // type decorator is used to transform the value to a number
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'Amount of items to skip',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  offset?: number;
}
