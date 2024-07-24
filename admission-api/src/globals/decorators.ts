import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export function Required (config: ApiPropertyOptions = {}) {
  return applyDecorators(ApiProperty(config), IsNotEmpty());
}

export function Optional (config: ApiPropertyOptions = {}) {
  return applyDecorators(
    ApiPropertyOptional({
      nullable: true,
      ...config,
    }),
    IsOptional(),
  );
}
