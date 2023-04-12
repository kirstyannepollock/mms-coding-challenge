import { Document } from 'mongoose';
import { OrderStatus } from 'src/enums/OrderStatus';

export interface OrderDocument extends Document {
  readonly status: OrderStatus;
  readonly price: number; // in cents to avoid floating point errors
  readonly quantity: number;
  readonly productId: string; // would be Types.ObjectId in reality
  readonly customerId: string; // would be Types.ObjectId in reality
  readonly sellerId: string; // would be Types.ObjectId in reality
}
