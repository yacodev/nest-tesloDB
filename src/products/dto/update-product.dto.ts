//import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { PartialType } from '@nestjs/swagger';

// PartialType is a utility function provided by the @nestjs/swagger package that creates a new class with all the properties of the original class set to optional.
export class UpdateProductDto extends PartialType(CreateProductDto) {}
