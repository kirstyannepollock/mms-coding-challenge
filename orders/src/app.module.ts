import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { OrdersService } from './services/orders/orders.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018', {
      dbName: 'mms-challenge',
    }),
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService, OrdersService],
})
export class AppModule {}
