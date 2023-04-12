import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatus } from 'src/enums/OrderStatus';
//import { Types } from 'mongoose';

@Schema()
export class Order {
  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.Created })
  status: OrderStatus;
  @Prop()
  price: number; // in cents to avoid floating point errors
  @Prop()
  quantity: number;
  @Prop()
  productId: string; // would be Types.ObjectId in reality
  @Prop()
  customerId: string; // would be Types.ObjectId in reality
  @Prop()
  sellerId: string; // would be Types.ObjectId in reality
}
export const OrderSchema = SchemaFactory.createForClass(Order);
