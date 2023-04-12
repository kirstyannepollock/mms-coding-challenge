import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { OrderStatus } from 'src/enums/OrderStatus';

export class OrderCreateDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  readonly status: OrderStatus;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsString()
  @IsNotEmpty()
  readonly productId: string;

  @IsString()
  @IsNotEmpty()
  readonly customerId: string;

  @IsString()
  @IsNotEmpty()
  readonly sellerId: string;
}
