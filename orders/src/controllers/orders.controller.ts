import {
  Post,
  Res,
  Body,
  HttpStatus,
  Put,
  Param,
  Get,
  Delete,
  Controller,
} from '@nestjs/common';
import { OrderCreateDto } from 'src/dto/order.create.dto';
import { OrderUpdateDto } from 'src/dto/order.update.dto';
import { OrdersService } from 'src/services/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post()
  async createOrder(@Res() response, @Body() createOrderDto: OrderCreateDto) {
    try {
      const newOrder = await this.ordersService.createOrder(createOrderDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Order has been created successfully',
        newOrder,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Order not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateOrder(
    @Res() response,
    @Param('id') orderId: string,
    @Body() updateOrderDto: OrderUpdateDto,
  ) {
    try {
      const existingOrder = await this.ordersService.updateOrder(
        orderId,
        updateOrderDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Order has been successfully updated',
        existingOrder,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getOrders(@Res() response) {
    try {
      const orderData = await this.ordersService.getAllOrders();
      return response.status(HttpStatus.OK).json({
        message: 'All orders data found successfully',
        orderData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getOrder(@Res() response, @Param('id') orderId: string) {
    try {
      const existingOrder = await this.ordersService.getOrder(orderId);
      return response.status(HttpStatus.OK).json({
        message: 'Order found successfully',
        existingOrder,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteOrder(@Res() response, @Param('id') orderId: string) {
    try {
      const deletedOrder = await this.ordersService.deleteOrder(orderId);
      return response.status(HttpStatus.OK).json({
        message: 'Order deleted successfully',
        deletedOrder,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
