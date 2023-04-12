import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderCreateDto } from 'src/dto/order.create.dto';
import { OrderUpdateDto } from 'src/dto/order.update.dto';
import { OrderDocument } from 'src/interfaces/order.interface';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private OrderModel: Model<OrderDocument>) {}

  async createOrder(orderCreateDto: OrderCreateDto): Promise<OrderDocument> {
    const newOrder = await new this.OrderModel(orderCreateDto);
    return newOrder.save();
  }

  async updateOrder(
    _id: string,
    orderUpdateDto: OrderUpdateDto,
  ): Promise<OrderDocument> {
    const existingOrder = await this.OrderModel.findByIdAndUpdate(
      _id,
      orderUpdateDto,
      { new: true },
    );
    if (!existingOrder) {
      throw new NotFoundException(`Order #${_id} not found`);
    }
    return existingOrder;
  }

  async getAllOrders(): Promise<OrderDocument[]> {
    const orderData = await this.OrderModel.find();
    if (!orderData || orderData.length == 0) {
      throw new NotFoundException('Orders data not found!');
    }
    return orderData;
  }

  async getOrder(OrderId: string): Promise<OrderDocument> {
    const existingOrder = await this.OrderModel.findById(OrderId).exec();
    if (!existingOrder) {
      throw new NotFoundException(`Order #${OrderId} not found`);
    }
    return existingOrder;
  }

  async deleteOrder(OrderId: string): Promise<OrderDocument> {
    const deletedOrder = await this.OrderModel.findByIdAndDelete(OrderId);
    if (!deletedOrder) {
      throw new NotFoundException(`Order #${OrderId} not found`);
    }
    return deletedOrder;
  }
}
